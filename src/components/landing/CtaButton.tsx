'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';

interface CtaButtonProps {
  href: string;
  /**
   * Analytics label. Required whenever `children` isn't a plain string —
   * an <Image> child made every App Store badge on the site report its
   * href ("#waitlist") as its label, so the header, hero and pricing
   * placements were indistinguishable in PostHog and GA4.
   */
  label?: string;
  variant?: 'primary' | 'outline' | 'outline-light' | 'badge';
  size?: 'lg' | 'sm';
  arrow?: boolean;
  shimmer?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * The single funnel chokepoint: EVERY marketing CTA goes through this
 * component so one track() call covers the whole funnel.
 */
export const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  label,
  variant = 'primary',
  size = 'lg',
  arrow,
  shimmer,
  className,
  children,
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() =>
        track('landing_cta_click', {
          label: label ?? (typeof children === 'string' ? children : href),
          href,
          path: pathname ?? '/',
          variant,
        })
      }
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-transform hover:scale-[1.02] active:scale-[0.99]',
        variant === 'badge'
          ? 'rounded-lg'
          : cn('rounded-full font-semibold', size === 'lg' ? 'h-14 px-8 text-[17px]' : 'h-9 px-5 text-[14px]'),
        variant === 'primary' &&
          'relative z-20 bg-[var(--ld-accent)] text-white shadow-[0_10px_32px_rgba(62,106,140,0.30)] hover:bg-[var(--ld-accent-hover)]',
        variant === 'outline' &&
          'border border-[var(--ld-line-strong)] text-[color:var(--ld-ink)] hover:border-[var(--ld-text-3)]',
        variant === 'outline-light' && 'border border-white/40 text-white',
        shimmer && 'ld-shimmer',
        className,
      )}
    >
      {children}
      {arrow && <span aria-hidden>↗</span>}
    </Link>
  );
};
