import { NextResponse } from 'next/server';
import type { Attribution } from '@/lib/attribution';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Naive in-memory IP rate limit — fine at waitlist scale, resets on deploy. */
const hits = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

interface WaitlistRow {
  email: string;
  utm: Attribution | null;
  path: string;
  ts: number;
}

/**
 * TODO(storage): wire a real store. Options by preference:
 *  1. Email-marketing provider (Resend Audiences / Loops / MailerLite) — the
 *     list lives where the launch email is sent from; UTM into custom fields.
 *  2. Own DB (Supabase/Postgres/KV) — full ownership, count() for "You're #N".
 * Must be an idempotent upsert by lowercased email — resubmit is success,
 * never "already registered" (hostile UX + an email oracle).
 */
async function store(row: WaitlistRow): Promise<void> {
  console.log('[waitlist]', JSON.stringify(row));
}

export async function POST(req: Request) {
  let body: { email?: string; hp?: string; elapsedMs?: number; utm?: Attribution; path?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const { email, hp, elapsedMs, utm, path } = body;

  // Silently swallow bots: honeypot filled or submitted faster than a human.
  if (hp || (elapsedMs ?? 0) < 2000) return NextResponse.json({ ok: true });

  if (!EMAIL_RE.test(email ?? '')) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ ok: true }); // don't advertise the limit

  try {
    await store({
      email: email!.toLowerCase().trim(),
      utm: utm ?? null,
      path: path ?? '/',
      ts: Date.now(),
    });
  } catch (err) {
    // A storage error should log, not 500 the visitor.
    console.error('[waitlist] store failed', err);
  }

  return NextResponse.json({ ok: true });
}
