# SEO core: constants, metadata, JSON-LD, crawler surface

## Constants — `src/lib/seo/constants.ts`

```ts
/** Public origin — the reverse-proxied path, not the internal host. */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://domain.com/tools/product';
export const PARENT_URL = 'https://domain.com';

export const BRAND = {
  productFull: 'Product by Parent',
  productShort: 'Product',
  parentName: 'Parent',
  tagline: 'One-sentence positioning.',
} as const;

/** Third-party identity URLs only (socials, Crunchbase, wiki) — never self. */
export const ORG_SAME_AS: readonly string[] = [];

/** Queries the PARENT domain or a sister product ranks for — must never appear
 *  in H1 / meta title / meta description / hero lead of this site. */
export const FORBIDDEN_KEYWORDS: readonly string[] = [
  // e.g. 'ai music generator', 'text to music', 'royalty-free music for',
];

/** Legally risky promises — must never appear ANYWHERE in page copy. */
export const FORBIDDEN_CLAIMS: readonly string[] = [
  'copyright-free', 'copyright free', 'claim-free', 'claim free',
  'zero content id', 'no copyright',
];

/** AI crawlers explicitly allowed in robots.ts. */
export const AI_CRAWLERS: readonly string[] = [
  'GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot',
  'Google-Extended', 'Applebot-Extended', 'CCBot', 'meta-externalagent',
];
```

## Per-archetype metadata — `src/lib/seo/metadata.ts`

```ts
type Archetype = 'hub' | 'feature' | 'alternative' | 'compare' | 'for' | 'glossary' | 'blog' | 'pricing' | 'howTo';

const archetypeTitles: Record<Archetype, (subject: string) => string> = {
  hub: () => `${BRAND.productFull} — <category positioning line>`,
  feature: (s) => `${s} for <category> — ${BRAND.productShort}`,
  alternative: (s) => `${s} alternative for <category> — ${BRAND.productShort}`,
  compare: (s) => `${s} vs ${BRAND.productShort}: which <category> wins?`,
  for: (s) => `${BRAND.productShort} for ${s}: <outcome promise>`,
  glossary: (s) => `${s} — what it is and how to use it in ${BRAND.productShort}`,
  blog: (s) => `${s} — ${BRAND.productShort}`,
  pricing: () => `Pricing — ${BRAND.productFull}`,
  howTo: (s) => `How to ${s} | ${BRAND.parentName} ${BRAND.productShort}`,
};

interface PageMetaOpts {
  archetype: Archetype;
  subject?: string;
  title?: string;        // raw override
  description: string;   // 110–170 chars
  path: string;          // '/', '/features/x'
  noindex?: boolean;
}

export function pageMetadata(opts: PageMetaOpts): Metadata {
  const rawTitle = opts.title ?? archetypeTitles[opts.archetype](opts.subject ?? '');
  const canonical = opts.path === '/' ? BASE_URL : `${BASE_URL}${opts.path}`;
  return {
    // hub/howTo titles already carry the brand — bypass the layout `%s | Brand` template
    title: opts.archetype === 'hub' || opts.archetype === 'howTo' ? { absolute: rawTitle } : rawTitle,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      type: 'website', siteName: BRAND.productFull, locale: 'en_US',
      url: canonical, title: rawTitle, description: opts.description,
      images: [{ url: `${canonical}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: rawTitle, description: opts.description },
    ...(opts.noindex
      ? { robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } } }
      : {}),
  };
}
```

Root layout metadata:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { template: `%s | ${BRAND.productFull}`, default: archetypeTitles.hub('') },
  description: '…',
  applicationName: BRAND.productFull,
  openGraph: { type: 'website', siteName: BRAND.productFull, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

## JSON-LD builders — `src/lib/seo/jsonLd.ts`

Entity-graph strategy: **stable `@id`s** so search engines and LLMs merge nodes
across pages instead of seeing 20 disconnected apps.

```ts
const ORG_ID = `${PARENT_URL}/#org`;
const APP_ID = `${BASE_URL}#app`;
const SITE_ID = `${PARENT_URL}#website`;

/** Shared freshness date — drives schema dateModified AND the visible
 *  "Last updated" caption so they cannot drift. Bump on real content changes. */
export const APP_DATE_MODIFIED = 'YYYY-MM-DD';

export const organization = () => ({
  '@type': 'Organization', '@id': ORG_ID,
  name: BRAND.parentName, url: PARENT_URL, sameAs: ORG_SAME_AS,
});

export const webSite = () => ({
  '@type': 'WebSite', '@id': SITE_ID, url: PARENT_URL,
  name: BRAND.parentName, publisher: { '@id': ORG_ID },
});

/** Full node — HUB ONLY (featureList, offers with priceValidUntil, dateModified). */
export const softwareApplication = (opts: { featureList: string[]; offers?: object[] }) => ({
  '@type': 'SoftwareApplication', '@id': APP_ID,
  name: BRAND.productFull, applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web', url: BASE_URL, dateModified: APP_DATE_MODIFIED,
  publisher: { '@id': ORG_ID }, ...opts,
});

/** Minimal ref — spokes emit this instead of restating the full node N times. */
export const softwareApplicationRef = () => ({ '@type': 'SoftwareApplication', '@id': APP_ID, name: BRAND.productFull, url: BASE_URL });

export const webPage = (opts: { url: string; name?: string }) => ({
  '@type': 'WebPage', url: `${BASE_URL}${opts.url === '/' ? '' : opts.url}`,
  ...(opts.name ? { name: opts.name } : {}),
  isPartOf: { '@id': SITE_ID }, mainEntity: { '@id': APP_ID },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '[data-speakable]'] },
  dateModified: APP_DATE_MODIFIED,
});

export const breadcrumbList = (items: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

export const faqPage = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
});

export const howTo = (opts: { name: string; steps: { name: string; text: string }[] }) => ({
  '@type': 'HowTo', name: opts.name,
  step: opts.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
});

export const itemList = (items: { name: string; url: string }[]) => ({
  '@type': 'ItemList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: it.url })),
});

export const jsonLdString = (nodes: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
```

Per-page assembly: pass an array of the nodes that page needs (spokes emit
`softwareApplicationRef()`, only the hub emits the full node). Breadcrumb chain:
Parent → Product → Page.

## sitemap.ts

```ts
/** Hard-coded, bumped on real content changes. NEVER `new Date()` — a
 *  lastModified that changes every deploy trains Google to ignore it. */
const LAST_MODIFIED = 'YYYY-MM-DD';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: LAST_MODIFIED, priority: 1 },
    ...SPOKES.map((s) => ({ url: `${BASE_URL}${spokePath(s)}`, lastModified: LAST_MODIFIED, priority: 0.8 })),
    // + docs entries at 0.7 if the site has docs
  ];
  // changeFrequency omitted — Google ignores it
}
```

Exclude app routes (`/editor`, `/auth`, `/dashboard`) from the sitemap; they are
noindexed via header instead (see infra reference) — do NOT robots-disallow them
(a disallowed page can still rank with a stale snippet; a crawlable noindex
cannot).

## robots.ts

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
      { userAgent: '*', allow: '/', disallow: ['/auth', '/api/'] },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`, `${PARENT_URL}/sitemap.xml`],
    host: PARENT_URL,
  };
}
```

## llms.txt — `src/app/llms.txt/route.ts`

Plain-text index for LLM crawlers: product one-liner, then sections listing docs
pages and marketing pages, one line each:
`- [<h1>](<BASE_URL><path>): <description>`. Marketing section iterates `SPOKES`.

## OG image — `src/app/opengraph-image.tsx`

Server-rendered via `next/og` `ImageResponse` so brand strings can't drift from
code. `size = { width: 1200, height: 630 }`, `contentType = 'image/png'`. Dark
brand card: eyebrow (product name), ~84px headline (the money query), subhead,
2–3 trust chips. Per-spoke OG images are optional — the root one is the
fallback referenced by `pageMetadata` (`${canonical}/opengraph-image`).

## Copy rules enforced editorially (not testable)

- H1 carries the page's target query; meta title 50–60 chars where possible;
  the lead paragraph is a citable 1–2 sentence definition ("Citable Passage").
- Anchor text: descriptive and varied — never "click here"/"learn more", never
  the bare product name on every link.
- Every page opens in the product's own frame (the job the visitor came to do),
  never in the parent's frame — the wording discipline that keeps the sites
  from cannibalizing each other.
