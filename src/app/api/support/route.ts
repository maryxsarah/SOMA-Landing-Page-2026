import nodemailer from 'nodemailer';

// Needs real TCP sockets for SMTP — can't run on the edge runtime.
export const runtime = 'nodejs';

// `+support` is Gmail's plus-addressing: still delivers to team@soma4health.com,
// but lets a Gmail filter on "To: team+support@soma4health.com" auto-label
// these without touching anything else landing in the shared inbox.
const SUPPORT_TO = 'team+support@soma4health.com';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_LEN = { name: 200, email: 200, message: 5000 };

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

export async function POST(request: Request) {
  const transport = getTransport();
  if (!transport) {
    return Response.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_body' }, { status: 400 });
  }

  const name = (body.name ?? '').trim().slice(0, MAX_LEN.name);
  const email = (body.email ?? '').trim().slice(0, MAX_LEN.email);
  const message = (body.message ?? '').trim().slice(0, MAX_LEN.message);

  // Honeypot: bots fill every field, including this hidden one. Pretend
  // success without ever sending mail.
  if (body.company) {
    return Response.json({ ok: true });
  }

  if (!EMAIL_RE.test(email) || !message) {
    return Response.json({ error: 'invalid_input' }, { status: 400 });
  }

  try {
    await transport.sendMail({
      from: `SOMA Support Form <${process.env.SMTP_USER}>`,
      to: SUPPORT_TO,
      replyTo: email,
      subject: `Support request from ${name || email}`,
      text: `Name: ${name || '(not provided)'}\nEmail: ${email}\n\n${message}`,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }
}
