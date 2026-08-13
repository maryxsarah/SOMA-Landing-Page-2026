import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, BRAND } from '@/lib/seo/constants';
import { LegalPage } from '@/components/landing/LegalPage';
import { getPrivacyContent } from '@/content/legal';
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
  const c = await getPrivacyContent(locale as Locale);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}${localizedPath(l, '/privacy')}`]),
  );
  languages['x-default'] = `${BASE_URL}/privacy`;
  return {
    title: c.title,
    description: `How ${BRAND.productFull} collects, uses, and protects your data.`,
    alternates: { canonical: `${BASE_URL}${localizedPath(locale, '/privacy')}`, languages },
  };
}

// TODO(brand): basic placeholder — have legal counsel review before launch.
export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = await getPrivacyContent(locale as Locale);
  return (
    <LegalPage title={c.title} updated={c.updated}>
      <p>{c.intro}</p>

      <h2>{c.whatWeCollect.h2}</h2>
      <p>
        {c.whatWeCollect.paragraph.before}
        <a href="https://kit.com" target="_blank" rel="noopener noreferrer">
          Kit
        </a>
        {c.whatWeCollect.paragraph.after}
      </p>

      <h2>{c.howWeUseIt.h2}</h2>
      <p>{c.howWeUseIt.body}</p>

      <h2>{c.cookies.h2}</h2>
      <p>{c.cookies.body}</p>

      <h2>{c.yourRights.h2}</h2>
      <p>{c.yourRights.body}</p>

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
