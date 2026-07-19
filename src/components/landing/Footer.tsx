import Link from 'next/link';
import { BRAND, PARENT_URL } from '@/lib/seo/constants';
import { spokePath, spokesInBucket, type SpokeBucket } from '@/marketing/spokes/registry';
import { Container } from './Container';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

function spokeColumn(title: string, bucket: SpokeBucket): FooterColumn | null {
  const spokes = spokesInBucket(bucket);
  if (spokes.length === 0) return null;
  return {
    title,
    links: spokes.map((s) => ({ label: s.navLabel ?? cap(s.subject), href: spokePath(s) })),
  };
}

/** Full-bleed footer; sitemap columns are GENERATED from the spoke registry. */
export const Footer = () => {
  const columns: FooterColumn[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
    spokeColumn('Features', 'features'),
    spokeColumn('How to', 'how-to'),
    spokeColumn('Use cases', 'for'),
    spokeColumn('Alternatives', 'alternatives'),
    {
      title: 'Company',
      links: [
        { label: 'Contact', href: 'mailto:team@soma4health.com', external: true },
        {
          label: 'Investors',
          href: 'mailto:team@soma4health.com?subject=SOMA%20investor%20enquiry',
          external: true,
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        // TODO(brand): point at the real privacy/terms URLs.
        { label: 'Privacy', href: `${PARENT_URL}/privacy`, external: true },
        { label: 'Terms', href: `${PARENT_URL}/terms`, external: true },
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
        <p className="text-xs text-[color:var(--ld-text-3)]">
          © {new Date().getFullYear()} {BRAND.parentName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};
