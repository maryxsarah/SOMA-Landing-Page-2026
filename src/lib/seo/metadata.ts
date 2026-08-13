import type { Metadata } from 'next';
import { routing, localizedPath, type Locale } from '@/i18n/routing';
import { BASE_URL, BRAND, OG_LOCALE_MAP } from './constants';

export type Archetype =
  | 'hub'
  | 'feature'
  | 'alternative'
  | 'compare'
  | 'for'
  | 'glossary'
  | 'blog'
  | 'pricing'
  | 'howTo';

// Category query: "AI health agent" (vendor-independent, multi-wearable).
export const archetypeTitles: Record<Archetype, (subject: string) => string> = {
  hub: () => `${BRAND.productFull} — AI Health Agent for All Your Wearables`,
  feature: (s) => `${s} — ${BRAND.productShort}`,
  alternative: (s) => `${s} alternative — ${BRAND.productShort}`,
  compare: (s) => `${s} vs ${BRAND.productShort}: which one wins?`,
  for: (s) => `${BRAND.productShort} for ${s}`,
  glossary: (s) => `${s} — what it is and how to use it in ${BRAND.productShort}`,
  blog: (s) => `${s} — ${BRAND.productShort}`,
  pricing: () => `Pricing — ${BRAND.productFull}`,
  howTo: (s) => `How to ${s} | ${BRAND.productShort}`,
};

interface PageMetaOpts {
  archetype: Archetype;
  subject?: string;
  /** Raw title override — bypasses the archetype template. */
  title?: string;
  /** 110–170 chars. */
  description: string;
  /** '/', '/features/x', … — unprefixed (English) path; locale below adds the prefix. */
  path: string;
  /** Defaults to `routing.defaultLocale` (en) for call sites that haven't
   * been made locale-aware yet — always pass the real one for a [locale] page. */
  locale?: Locale;
  noindex?: boolean;
}

export function pageMetadata(opts: PageMetaOpts): Metadata {
  const locale = opts.locale ?? routing.defaultLocale;
  const rawTitle = opts.title ?? archetypeTitles[opts.archetype](opts.subject ?? '');
  const localizedPathValue = localizedPath(locale, opts.path);
  const canonical =
    localizedPathValue === '/' ? BASE_URL : `${BASE_URL}${localizedPathValue}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => {
      const p = localizedPath(l, opts.path);
      return [l, p === '/' ? BASE_URL : `${BASE_URL}${p}`];
    }),
  );
  languages['x-default'] = opts.path === '/' ? BASE_URL : `${BASE_URL}${opts.path}`;
  return {
    // hub/howTo titles already carry the brand — bypass the layout `%s | Brand` template
    title:
      opts.archetype === 'hub' || opts.archetype === 'howTo'
        ? { absolute: rawTitle }
        : rawTitle,
    description: opts.description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      siteName: BRAND.productFull,
      locale: OG_LOCALE_MAP[locale] ?? OG_LOCALE_MAP[routing.defaultLocale],
      url: canonical,
      title: rawTitle,
      description: opts.description,
      images: [{ url: `${canonical}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: rawTitle, description: opts.description },
    ...(opts.noindex
      ? {
          robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: { index: false, follow: false },
          },
        }
      : {}),
  };
}
