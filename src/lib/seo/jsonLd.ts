import { PRICING } from '@/lib/pricing';
import { BASE_URL, BRAND, ORG_SAME_AS, PARENT_URL } from './constants';

/** Stable @ids so search engines and LLMs merge nodes across pages. */
const ORG_ID = `${PARENT_URL}/#org`;
const APP_ID = `${BASE_URL}#app`;
const SITE_ID = `${PARENT_URL}#website`;

/**
 * Shared freshness date — drives schema dateModified AND any visible
 * "Last updated" caption so they cannot drift. Bump on real content changes.
 */
export const APP_DATE_MODIFIED = '2026-08-20';

/**
 * Shipped subscription tiers as schema.org Offers, built from the single
 * pricing source so the markup can't drift from the paywall. Annual carries
 * its real yearly charge ($159.99), not 12 × the $13.33 marketing per-month
 * figure — that arithmetic gives $159.96 and would be a wrong claim about
 * what the customer is actually charged.
 *
 * `trialDays` rides only on the annual offer: the paywall grants the free
 * trial on the yearly plan alone.
 */
const offers = () => [
  {
    '@type': 'Offer',
    name: 'Monthly',
    price: PRICING.monthly.toFixed(2),
    priceCurrency: PRICING.currency,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: PRICING.monthly.toFixed(2),
      priceCurrency: PRICING.currency,
      billingDuration: 'P1M',
    },
  },
  {
    '@type': 'Offer',
    name: 'Yearly',
    price: PRICING.annualTotal.toFixed(2),
    priceCurrency: PRICING.currency,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: PRICING.annualTotal.toFixed(2),
      priceCurrency: PRICING.currency,
      billingDuration: 'P1Y',
    },
    // schema.org has no free-trial property on Offer; `description` is the
    // honest place for it rather than bending an unrelated field.
    description: `Includes a free ${PRICING.trialDays}-day trial. Billed $${PRICING.annualTotal.toFixed(2)}/year (${PRICING.annualPerMonth.toFixed(2)}/month equivalent).`,
  },
];

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

/**
 * Full node — HUB ONLY. Spokes emit softwareApplicationRef() instead.
 *
 * `operatingSystem` is iOS, not Web: SOMA ships as an iPhone app (iOS 17+),
 * and this site is its marketing page, not the product. Offers default to
 * the published tiers — they used to be omitted with a "add once pricing is
 * final" TODO, which outlived the pricing going public on the homepage.
 */
export const softwareApplication = (opts: { featureList: string[]; offers?: object[] }) => ({
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: BRAND.productFull,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS 17.0',
  url: BASE_URL,
  dateModified: APP_DATE_MODIFIED,
  publisher: { '@id': ORG_ID },
  offers: offers(),
  ...opts,
});

export const softwareApplicationRef = () => ({
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: BRAND.productFull,
  url: BASE_URL,
});

/** `url` should already be locale-prefixed (via `localizedPath`) when the
 * page isn't English — this function only prepends `BASE_URL`. */
export const webPage = (opts: { url: string; name?: string; locale?: string }) => ({
  '@type': 'WebPage',
  url: `${BASE_URL}${opts.url === '/' ? '' : opts.url}`,
  ...(opts.name ? { name: opts.name } : {}),
  ...(opts.locale ? { inLanguage: opts.locale } : {}),
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
