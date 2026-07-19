/**
 * Launch-mode switch. Flipping waitlist → live is one env change + redeploy:
 * every CTA in sections and spoke defs routes through CTA_HREF.
 */
export const LAUNCH_MODE = (process.env.NEXT_PUBLIC_LAUNCH_MODE ?? 'waitlist') as
  | 'waitlist'
  | 'live';

export const CTA_HREF = LAUNCH_MODE === 'live' ? '/auth' : '#waitlist';

/** In waitlist mode never say "Start free" for a product that can't be started. */
export const CTA_LABEL = LAUNCH_MODE === 'live' ? 'Get started' : 'Join the waitlist';
