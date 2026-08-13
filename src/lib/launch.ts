/**
 * Launch-mode switch. Flipping waitlist → live is one env change + redeploy:
 * every CTA in sections and spoke defs routes through CTA_HREF.
 *
 * Deliberately zero framework imports (no `next-intl`) — `registry.ts` (a
 * plain data module, imported by the Jest-run `spokes.test.ts` outside any
 * Next.js/React runtime) imports `CTA_HREF`/`CTA_LABEL` from here. The
 * locale-aware `useCtaLabel()` hook lives in `useCtaLabel.ts` instead, kept
 * out of this file so nothing that only needs the plain constants below
 * ever transitively pulls in next-intl.
 */
export const LAUNCH_MODE = (process.env.NEXT_PUBLIC_LAUNCH_MODE ?? 'waitlist') as
  | 'waitlist'
  | 'live';

export const CTA_HREF = LAUNCH_MODE === 'live' ? '/auth' : '#waitlist';

/**
 * English-only fallback for non-React contexts that need a plain string at
 * module scope (registry.ts's `SpokeDef.hero.cta.label` is a required
 * field) — always overridden with the real locale's translation by
 * `localizeSpoke()` before a spoke is ever rendered, so this value itself
 * is never actually shown to a user. Components should use `useCtaLabel()`
 * (in `useCtaLabel.ts`) instead.
 */
export const CTA_LABEL = LAUNCH_MODE === 'live' ? 'Get started' : 'Join the waitlist';
