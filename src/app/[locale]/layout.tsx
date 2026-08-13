import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  Manrope,
  Newsreader,
  Noto_Sans_Georgian,
  Noto_Serif_Georgian,
  Noto_Sans_Armenian,
  Noto_Serif_Armenian,
} from 'next/font/google';
import { AnalyticsBinder } from '@/components/AnalyticsBinder';
import { archetypeTitles } from '@/lib/seo/metadata';
import { BASE_URL, BRAND } from '@/lib/seo/constants';
import { routing } from '@/i18n/routing';
import '../globals.css';

// DS typefaces (tokens/fonts.css): Manrope = UI sans, Newsreader = editorial
// display serif. Both are the DS's confirmed Google substitutes — no separate
// brand font files exist. Self-hosted at build time by next/font.
//
// Neither Manrope nor Newsreader covers Georgian or Armenian glyphs (verified
// against Google Fonts directly: requesting either family with
// `subset=georgian`/`subset=armenian` silently falls back to the same
// Latin-only file, not a script-specific one) — ka/hy would render those
// scripts in the browser's fallback system font, visually inconsistent with
// every other locale. Noto Sans/Serif Georgian and Armenian are real,
// separate font files that do cover them; both are declared under the SAME
// `--font-body`/`--font-display` CSS variables Manrope/Newsreader use, and
// `RootLayout` picks which `.variable` class to apply per locale below.
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const notoSansGeorgian = Noto_Sans_Georgian({ variable: '--font-body', display: 'swap' });
const notoSerifGeorgian = Noto_Serif_Georgian({ variable: '--font-display', display: 'swap' });
const notoSansArmenian = Noto_Sans_Armenian({ variable: '--font-body', display: 'swap' });
const notoSerifArmenian = Noto_Serif_Armenian({ variable: '--font-display', display: 'swap' });

const FONT_VARIABLES: Record<string, string> = {
  ka: `${notoSansGeorgian.variable} ${notoSerifGeorgian.variable}`,
  hy: `${notoSansArmenian.variable} ${notoSerifArmenian.variable}`,
};
const defaultFontVariables = `${manrope.variable} ${newsreader.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { template: `%s | ${BRAND.productFull}`, default: archetypeTitles.hub('') },
  description: BRAND.tagline,
  applicationName: BRAND.productFull,
  openGraph: { type: 'website', siteName: BRAND.productFull, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required before any static-rendering-time translation/spoke lookup —
  // skipping this causes locale bleed across prerendered pages.
  setRequestLocale(locale);

  const fontVariables = FONT_VARIABLES[locale] ?? defaultFontVariables;

  return (
    <html lang={locale} className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          {children}
          <AnalyticsBinder />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
