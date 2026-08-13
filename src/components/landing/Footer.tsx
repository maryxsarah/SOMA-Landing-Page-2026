import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BRAND } from '@/lib/seo/constants';
import { spokePath, spokesInBucket, type SpokeBucket } from '@/marketing/spokes/registry';
import { localizeSpokeCopy } from '@/marketing/spokes/i18n';
import type { Locale } from '@/i18n/routing';
import { Container } from './Container';
import { LocaleSwitcher } from './LocaleSwitcher';

// English-only fallback (Latin-case capitalization) for spokes whose locale
// override doesn't set an explicit navLabel — non-Latin scripts (Georgian,
// Armenian) have no case distinction, so their overrides must always set
// navLabel explicitly rather than relying on this.
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

function spokeColumn(title: string, bucket: SpokeBucket, locale: Locale): FooterColumn | null {
  const spokes = spokesInBucket(bucket).map((s) => localizeSpokeCopy(s, locale));
  if (spokes.length === 0) return null;
  return {
    title,
    links: spokes.map((s) => ({ label: s.navLabel ?? cap(s.subject), href: spokePath(s) })),
  };
}

/** Full-bleed footer; sitemap columns are GENERATED from the spoke registry. */
export const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale() as Locale;
  const columns: FooterColumn[] = [
    {
      title: t('productTitle'),
      links: [
        { label: t('featuresLink'), href: '/#features' },
        { label: t('faqLink'), href: '/#faq' },
      ],
    },
    spokeColumn(t('featuresColumnTitle'), 'features', locale),
    spokeColumn(t('howToColumnTitle'), 'how-to', locale),
    spokeColumn(t('useCasesColumnTitle'), 'for', locale),
    spokeColumn(t('alternativesColumnTitle'), 'alternatives', locale),
    {
      title: t('companyTitle'),
      links: [
        { label: t('contactLink'), href: 'mailto:team@soma4health.com', external: true },
        {
          label: t('investorsLink'),
          href: 'mailto:team@soma4health.com?subject=SOMA%20investor%20enquiry',
          external: true,
        },
      ],
    },
    {
      title: t('legalTitle'),
      links: [
        { label: t('privacyLink'), href: '/privacy' },
        { label: t('termsLink'), href: '/terms' },
      ],
    },
  ].filter((c): c is FooterColumn => c !== null);

  return (
    <footer className="border-t border-[var(--ld-line)] bg-[var(--ld-sunken)]">
      {/* Container keeps footer gutters aligned with every section above it. */}
      <Container className="flex flex-col gap-16 py-6">
        <div className="grid grid-cols-2 gap-8 pt-10 md:grid-cols-3 lg:grid-cols-6">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-[color:var(--ld-text-3)]">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) =>
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-[color:var(--ld-text-2)] hover:text-[color:var(--ld-ink)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[color:var(--ld-text-2)] hover:text-[color:var(--ld-ink)]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>,
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[color:var(--ld-text-3)]">
            {t('copyright', { year: new Date().getFullYear(), parentName: BRAND.parentName })}
          </p>
          <LocaleSwitcher />
        </div>
      </Container>
    </footer>
  );
};
