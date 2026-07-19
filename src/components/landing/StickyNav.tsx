'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/lib/seo/constants';
import { CTA_HREF, CTA_LABEL } from '@/lib/launch';
import { CtaButton } from './CtaButton';

const NAV_ITEMS = [
  { label: 'Features', anchor: '#features' },
  { label: 'How it works', anchor: '#how-it-works' },
  { label: 'Pricing', anchor: '#pricing' },
  { label: 'FAQ', anchor: '#faq' },
];

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
  const pathname = usePathname();
  const onLanding = pathname === '/';
  const href = (anchor: string) => (onLanding ? anchor : `/${anchor}`);

  return (
    <>
      <div aria-hidden className="h-16" />
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-[rgba(246,247,247,0.94)] p-4">
      <Link href="/" className="text-[18px] font-bold tracking-tight text-[color:var(--ld-ink)]">
        {BRAND.productShort}
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.anchor}
            href={href(item.anchor)}
            className="text-[14px] text-[color:var(--ld-text-2)] transition-colors hover:text-[color:var(--ld-ink)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
        <CtaButton href={onLanding ? CTA_HREF : `/${CTA_HREF}`} size="sm">
          {CTA_LABEL}
        </CtaButton>
      </nav>
    </>
  );
};
