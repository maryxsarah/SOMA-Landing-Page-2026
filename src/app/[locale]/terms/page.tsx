import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, BRAND } from '@/lib/seo/constants';
import { LegalPage } from '@/components/landing/LegalPage';
import { getTermsContent } from '@/content/legal';
import { routing, localizedPath, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = await getTermsContent(locale as Locale);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}${localizedPath(l, '/terms')}`]),
  );
  languages['x-default'] = `${BASE_URL}/terms`;
  return {
    title: c.title,
    description: `Terms for using the ${BRAND.productFull} website and waitlist.`,
    alternates: { canonical: `${BASE_URL}${localizedPath(locale, '/terms')}`, languages },
  };
}

// TODO(brand): basic placeholder — have legal counsel review before launch.
export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getTermsContent(locale as Locale);
  return (
    <LegalPage title={c.title} updated={c.updated}>
      <p>{c.intro}</p>

      <h2>{c.waitlist.h2}</h2>
      <p>{c.waitlist.body}</p>

      <h2>{c.notMedicalDevice.h2}</h2>
      <p>{c.notMedicalDevice.body}</p>

      <h2>{c.intellectualProperty.h2}</h2>
      <p>{c.intellectualProperty.body}</p>

      <h2>{c.noWarranty.h2}</h2>
      <p>{c.noWarranty.body}</p>

      <h2>{c.changes.h2}</h2>
      <p>{c.changes.body}</p>

      <h2>{c.contact.h2}</h2>
      <p>
        {c.contact.paragraph.before}
        <a href="mailto:team@soma4health.com">team@soma4health.com</a>
        {c.contact.paragraph.after}
      </p>
    </LegalPage>
  );
}
