import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo/metadata';
import { findSpoke, spokePath, spokesInBucket } from '@/marketing/spokes/registry';
import { localizeSpoke } from '@/marketing/spokes/i18n';
import { SpokePage } from '@/marketing/spokes/SpokePage';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    spokesInBucket('alternatives').map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata(ctx: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await ctx.params;
  const spoke = findSpoke('alternatives', slug);
  if (!spoke) return {};
  const localized = await localizeSpoke(spoke, locale as Locale);
  return pageMetadata({
    archetype: 'alternative',
    subject: localized.subject,
    description: localized.description,
    path: spokePath(spoke),
    locale: locale as Locale,
  });
}

export default async function AlternativeSpoke(ctx: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await ctx.params;
  setRequestLocale(locale);
  const spoke = findSpoke('alternatives', slug);
  if (!spoke) notFound();
  return <SpokePage spoke={await localizeSpoke(spoke, locale as Locale)} />;
}
