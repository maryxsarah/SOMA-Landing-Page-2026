# Waitlist mode (pre-launch)

The site ships the FULL landing + spokes before the product is live — SEO
compounds during the wait — but every CTA collects an email instead of routing
to signup. One env switches modes at build time.

## Mode switch

```ts
// src/lib/launch.ts
export const LAUNCH_MODE = (process.env.NEXT_PUBLIC_LAUNCH_MODE ?? 'waitlist') as 'waitlist' | 'live';
export const CTA_HREF = LAUNCH_MODE === 'live' ? '/auth' : '#waitlist';
```

- All spoke-def CTAs and section CTAs use `CTA_HREF` (or accept it as the
  default) — flipping to `live` later is one env change + redeploy, zero copy
  edits.
- In waitlist mode the CTA label changes register: "Join the waitlist" /
  "Get early access" — never "Start free" for a product that can't be started.
- Hero CTA scrolls to the `#waitlist` section (a `WaitlistBand` replaces the
  ReadyBand at the bottom; optionally an inline form directly in the hero —
  hero-inline converts best, keep both).

## WaitlistForm component

Single email field + submit. Requirements:

- **Client validation**: basic email regex, disable-while-submitting, error
  state with retry, success state swaps the form for a confirmation line
  ("You're on the list — watch your inbox"). Optionally show position
  ("You're #142") if the API returns a count — cheap social proof.
- **Anti-bot without CAPTCHA**: (a) honeypot — a visually hidden text input
  (`aria-hidden`, `tabIndex={-1}`, positioned off-screen — NOT
  `display:none`, some bots skip those); server rejects if filled; (b) time
  gate — stamp `mountedAt` on render, reject submissions faster than ~2s.
  Both checks server-side; the client just carries the data.
- **Attribution is the point**: submit the stored first-touch UTM snapshot
  (`readOriginalAttribution()`) and the current `path` with the email — every
  waitlist row records WHICH spoke/campaign brought the signup. This is the
  measurement that justifies the satellite build.
- **Analytics**: `track('waitlist_submit', { path })` on attempt,
  `track('waitlist_success', { path })` on 200 — the funnel becomes
  page_view → landing_cta_click → waitlist_submit → waitlist_success.
- A11y: `<label>` (visually hidden ok), `aria-describedby` for the error,
  focus moves to the confirmation on success.

## API route — `src/app/api/waitlist/route.ts`

```ts
export async function POST(req: Request) {
  const { email, hp, elapsedMs, utm, path } = await req.json();
  if (hp || (elapsedMs ?? 0) < 2000) return NextResponse.json({ ok: true });   // silently swallow bots
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email ?? '')) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }
  // rate-limit by IP (in-memory LRU is fine at waitlist scale)
  await store({ email: email.toLowerCase().trim(), utm, path, ts: Date.now() }); // idempotent upsert — resubmit is success, not "already exists"
  return NextResponse.json({ ok: true });
}
```

Rules: dedupe by lowercased email as an **upsert that still returns success**
(never leak "already registered" — it's both hostile UX and an email oracle);
swallow bot submissions with a fake 200; keep the handler total-failure-proof
(a storage error should queue/log, not 500 the visitor if avoidable).

## Storage options (pick by what the project already has)

1. **Email-marketing provider as the store** (Resend Audiences, Loops,
   MailerLite…): one API call, list is already where the launch email will be
   sent from, double-opt-in available. Default choice when there is no
   backend. Put UTM fields into subscriber custom fields.
2. **Own DB** (Supabase/Postgres/KV): when the product repo already has one —
   full ownership, easy `count()` for "You're #N". Export to the email tool at
   launch.
3. **Not** a Google Sheet / third-party embed form (Tally etc.) for the
   primary CTA: embeds break the design system, add third-party JS, and lose
   the UTM wiring. Acceptable only as a temporary stopgap.

GDPR note: email + UTM is personal data — add one consent line under the form
("We'll email you about the launch — nothing else"), link the privacy policy,
and honor deletion requests from day one.

## What waitlist mode does NOT change

- Spokes still ship, sitemap/llms.txt/robots still ship — pre-launch is when
  domain age and indexing accrue.
- Docs/FAQ claims must be phrased for a product that isn't public yet
  ("at launch", "early access") — run them through the guardrail tests as
  usual; add `'available now'`-style phrases to FORBIDDEN_CLAIMS while in
  waitlist mode if drift is a risk.
- Analytics/attribution wiring is identical — which is exactly why the
  waitlist rows end up campaign-attributed for free.

## Launch flip checklist

1. `NEXT_PUBLIC_LAUNCH_MODE=live` → CTAs route to `/auth`.
2. Replace WaitlistBand with ReadyBand (or keep the form as a newsletter box).
3. Sweep copy for "waitlist"/"early access"/"at launch" wording.
4. Send the launch email to the list; UTM-tag its links (`utm_source=waitlist`)
   so launch-cohort conversion is measurable against the spoke cohorts.
