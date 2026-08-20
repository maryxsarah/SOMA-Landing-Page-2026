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
 * Same CTA target, addressed from a page that is NOT the landing page.
 * `#waitlist` is a bare fragment: the form only exists inside KineticStart
 * on `/`, so on a spoke or legal page it resolves against a document with no
 * such element and the click silently does nothing. Prefixing `/` turns it
 * into a real cross-page jump. StickyNav already does this inline for its
 * own links; spoke hero CTAs come from `registry.ts`, which has no request
 * context, so they need the pre-resolved constant.
 */
export const CTA_HREF_OFF_LANDING = CTA_HREF.startsWith('#') ? `/${CTA_HREF}` : CTA_HREF;

/**
 * Public App Store listing. Empty until the app is actually downloadable.
 *
 * This gates every "Download on the App Store" badge and the "available now"
 * laurel. The site used to render both while the badges linked to
 * `#waitlist`: a visitor clicked an official Apple badge expecting the store
 * and got scrolled to an email field. That is a broken promise at the exact
 * moment of highest intent, and using Apple's badge without a live listing
 * also breaks their identity guidelines.
 *
 * At launch this is one environment variable — set it (and flip
 * NEXT_PUBLIC_LAUNCH_MODE to 'live') and every badge starts pointing at the
 * real listing with no copy edits.
 */
export const APPSTORE_URL = process.env.NEXT_PUBLIC_APPSTORE_URL ?? '';

/** True only when there is a real listing to send people to. */
export const APP_IS_LIVE = APPSTORE_URL.length > 0;

/**
 * English-only fallback for non-React contexts that need a plain string at
 * module scope (registry.ts's `SpokeDef.hero.cta.label` is a required
 * field) — always overridden with the real locale's translation by
 * `localizeSpoke()` before a spoke is ever rendered, so this value itself
 * is never actually shown to a user. Components should use `useCtaLabel()`
 * (in `useCtaLabel.ts`) instead.
 */
export const CTA_LABEL = LAUNCH_MODE === 'live' ? 'Get started' : 'Join the waitlist';
