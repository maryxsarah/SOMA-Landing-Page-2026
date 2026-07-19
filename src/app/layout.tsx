import type { Metadata } from 'next';
import { Manrope, Newsreader } from 'next/font/google';
import { AnalyticsBinder } from '@/components/AnalyticsBinder';
import { archetypeTitles } from '@/lib/seo/metadata';
import { BASE_URL, BRAND } from '@/lib/seo/constants';
import './globals.css';

// DS typefaces (tokens/fonts.css): Manrope = UI sans, Newsreader = editorial
// display serif. Both are the DS's confirmed Google substitutes — no separate
// brand font files exist. Self-hosted at build time by next/font.
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { template: `%s | ${BRAND.productFull}`, default: archetypeTitles.hub('') },
  description: BRAND.tagline,
  applicationName: BRAND.productFull,
  openGraph: { type: 'website', siteName: BRAND.productFull, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <AnalyticsBinder />
      </body>
    </html>
  );
}
