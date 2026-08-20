'use client';

import { useTranslations } from 'next-intl';
import { LocalImage } from '@/components/LocalImage';
import { APPSTORE_URL, CTA_HREF } from '@/lib/launch';
import { cn } from '@/lib/cn';
import { CtaButton } from '../CtaButton';

/**
 * The App Store badge. Always rendered — it is part of the design.
 *
 * The only thing that changes with launch state is where it POINTS: once
 * `NEXT_PUBLIC_APPSTORE_URL` is set it goes to the real listing, and until
 * then it falls back to the waitlist anchor it has always used. That is a
 * one-env-var flip at launch with no markup or copy edits.
 */
export const KineticAppCta: React.FC<{
  /** Analytics placement, e.g. "header" | "hero" | "pricing". */
  placement: string;
  /** Badge height in px. */
  badgeHeight?: number;
  className?: string;
}> = ({ placement, badgeHeight = 56, className }) => {
  const t = useTranslations('kinetic');
  return (
    <CtaButton
      href={APPSTORE_URL || CTA_HREF}
      label={`appstore-badge:${placement}`}
      variant="badge"
    >
      <LocalImage
        src="/assets/kinetic/site/appstore-badge.png"
        alt={t('cta.appStoreAlt')}
        width={1200}
        height={357}
        style={{ height: badgeHeight }}
        className={cn('w-auto', className)}
      />
    </CtaButton>
  );
};

/**
 * Secondary CTA offering the lead magnet — an ADDITION next to the badge,
 * never a replacement for it. The guide is the reason to hand over an email
 * before the app is downloadable; it is promised in the privacy policy, the
 * terms, the FAQ and the confirmation email, so the page should say so too.
 *
 * Styled as a ghost pill (white/8 fill, thin inset ring, blurred backdrop)
 * matching the rest of the hero's glass language — the trial pill next to
 * it, the mobile device-chip row — rather than a solid accent block, since
 * this is a secondary offer riding alongside the primary App Store CTA, not
 * competing with it for attention. Points at `CTA_HREF` (the waitlist form
 * anchor), which is where the guide is actually sent.
 *
 * Fill, ring, blur and the download-arrow icon are ported byte-for-byte
 * from the DC source's own `Get the free Reset Guide` button (same SVG
 * path data, same `#B9C9FB` stroke = `--k-accent-soft`) — not a redrawn
 * substitute — so it lines up with the design's own answer for this button
 * rather than an invented document glyph.
 *
 * `!text-` is load-bearing: kinetic.css has a blanket
 * `.ld-kinetic a { color: var(--k-accent) }` whose (0,1,1) specificity beats
 * any single `text-*` utility, so without the important flag the label
 * renders accent-blue instead of white.
 */
export const KineticGuideCta: React.FC<{
  placement: string;
  size?: 'lg' | 'sm';
  className?: string;
}> = ({ placement, size = 'lg', className }) => {
  const t = useTranslations('kinetic');
  return (
    <CtaButton
      href={CTA_HREF}
      label={`waitlist-cta:${placement}`}
      size={size}
      className={cn(
        'gap-2.5 bg-white/8 !text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),0_10px_24px_rgba(5,8,30,0.3)] backdrop-blur-[10px] hover:bg-white/14 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.32),0_10px_24px_rgba(5,8,30,0.3)]',
        className,
      )}
    >
      <svg
        aria-hidden
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B9C9FB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="M12 3v13m0 0 4.5-4.5M12 16l-4.5-4.5" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
      {t('cta.getGuide')}
    </CtaButton>
  );
};
