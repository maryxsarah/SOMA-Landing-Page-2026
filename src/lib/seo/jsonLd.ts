import { BASE_URL, BRAND, ORG_SAME_AS, PARENT_URL } from './constants';

/** Stable @ids so search engines and LLMs merge nodes across pages. */
const ORG_ID = `${PARENT_URL}/#org`;
const APP_ID = `${BASE_URL}#app`;
const SITE_ID = `${PARENT_URL}#website`;

/**
 * Shared freshness date — drives schema dateModified AND any visible
 * "Last updated" caption so they cannot drift. Bump on real content changes.
 */
export const APP_DATE_MODIFIED = '2026-07-19';

export const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BRAND.parentName,
  url: PARENT_URL,
  email: 'team@soma4health.com',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'investor relations',
      email: 'team@soma4health.com',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'team@soma4health.com',
    },
  ],
  sameAs: ORG_SAME_AS,
});

export const webSite = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: PARENT_URL,
  name: BRAND.parentName,
  publisher: { '@id': ORG_ID },
});

/** Full node — HUB ONLY. Spokes emit softwareApplicationRef() instead. */
export const softwareApplication = (opts: { featureList: string[]; offers?: object[] }) => ({
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: BRAND.productFull,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  url: BASE_URL,
  dateModified: APP_DATE_MODIFIED,
  publisher: { '@id': ORG_ID },
  ...opts,
});

export const softwareApplicationRef = () => ({
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: BRAND.productFull,
  url: BASE_URL,
});

export const webPage = (opts: { url: string; name?: string }) => ({
  '@type': 'WebPage',
  url: `${BASE_URL}${opts.url === '/' ? '' : opts.url}`,
  ...(opts.name ? { name: opts.name } : {}),
  isPartOf: { '@id': SITE_ID },
  mainEntity: { '@id': APP_ID },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '[data-speakable]'] },
  dateModified: APP_DATE_MODIFIED,
});

export const breadcrumbList = (items: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export const faqPage = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
});

export const howTo = (opts: { name: string; steps: { name: string; text: string }[] }) => ({
  '@type': 'HowTo',
  name: opts.name,
  step: opts.steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
});

export const itemList = (items: { name: string; url: string }[]) => ({
  '@type': 'ItemList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    url: it.url,
  })),
});

export const jsonLdString = (nodes: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
