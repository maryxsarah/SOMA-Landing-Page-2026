import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo/metadata';
import { jsonLdString, organization, softwareApplication, webPage, webSite } from '@/lib/seo/jsonLd';
import { LandingPage } from '@/components/landing/LandingPage';
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
  const t = await getTranslations({ locale, namespace: 'home' });
  return pageMetadata({
    archetype: 'hub',
    description: t('metaDescription'),
    path: '/',
    locale: locale as Locale,
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const ld = [
    organization(),
    webSite(),
    // Offers come from src/lib/pricing.ts via softwareApplication().
    softwareApplication({ featureList: t.raw('jsonLdFeatures') as string[] }),
    webPage({ url: localizedPath(locale, '/'), locale }),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <LandingPage />
    </>
  );
}
