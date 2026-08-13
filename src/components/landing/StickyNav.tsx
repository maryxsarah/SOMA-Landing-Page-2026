'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { BRAND } from '@/lib/seo/constants';
import { CTA_HREF } from '@/lib/launch';
import { useCtaLabel } from '@/lib/useCtaLabel';
import { CtaButton } from './CtaButton';

const NAV_ANCHORS = ['features', 'howItWorks', 'faq'] as const;
const NAV_HASHES: Record<(typeof NAV_ANCHORS)[number], string> = {
  features: '#features',
  howItWorks: '#how-it-works',
  faq: '#faq',
};

/**
 * Light translucent pinned nav — deliberately NO backdrop-blur: on zoomed
 * pages the composite layer can exceed the GPU texture cap and the nav goes
 * blank. MUST be `position:fixed` AND rendered OUTSIDE the zoomed `.ld`
 * subtree (see landing.css): position:sticky consults the scroller's offset,
 * which Chromium maps through the sibling `.ld` zoom, so a sticky nav drifts
 * down by (1-zoom)·scrollY. Fixed with zero offsets never consults scroll
 * position and is immune. The spacer keeps flow height for anchor targets.
 * Anchor hrefs work from spoke pages too (`/#x` off the landing).
 */
export const StickyNav = () => {
  const t = useTranslations('nav');
  const ctaLabel = useCtaLabel();
  const pathname = usePathname();
  const onLanding = pathname === '/';
  // `anchor` is either a bare `#hash` (needs `/` prefixed when off-landing)
  // or an already-absolute path like CTA_HREF's `/auth` (left as-is —
  // prefixing it again would produce `//auth`). Link (from @/i18n/navigation)
  // adds the locale prefix underneath either way.
  const href = (anchor: string) => (onLanding || anchor.startsWith('/') ? anchor : `/${anchor}`);

  return (
    <>
      <div aria-hidden className="h-16" />
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-[rgba(246,247,247,0.94)] p-4">
      <Link href="/" className="text-[18px] font-bold tracking-tight text-[color:var(--ld-ink)]">
        {BRAND.productShort}
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        {NAV_ANCHORS.map((key) => (
          <Link
            key={key}
            href={href(NAV_HASHES[key])}
            className="text-[14px] text-[color:var(--ld-text-2)] transition-colors hover:text-[color:var(--ld-ink)]"
          >
            {t(key)}
          </Link>
        ))}
      </div>
        <CtaButton href={href(CTA_HREF)} size="sm">
          {ctaLabel}
        </CtaButton>
      </nav>
    </>
  );
};
