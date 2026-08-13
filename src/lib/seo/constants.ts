/**
 * Public origin of the site — where visitors and crawlers see it.
 * Standalone domain: leave NEXT_PUBLIC_BASE_PATH unset everywhere.
 * Mounted under a parent domain path: set both env vars (see .env.example).
 */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://soma4health.com';

/** Parent/company domain. Same as BASE_URL host for a standalone site. */
export const PARENT_URL = 'https://soma4health.com';

export const BRAND = {
  productFull: 'SOMA',
  productShort: 'SOMA',
  parentName: 'SOMA',
  tagline: 'Find your next best day.',
} as const;

/** `openGraph.locale` wants an underscore region tag; next-intl's routing
 * locales are bare language codes — map explicitly rather than guess a
 * region per code. */
export const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  de: 'de_DE',
  ru: 'ru_RU',
  ka: 'ka_GE',
  hy: 'hy_AM',
  sr: 'sr_RS',
};

/** Third-party identity URLs only (socials, Crunchbase, wiki) — never self. */
export const ORG_SAME_AS: readonly string[] = [];

/**
 * Queries a parent domain or sister product ranks for — must never appear in
 * H1 / meta title / meta description / hero lead of this site.
 * Enforced by src/marketing/spokes/spokes.test.ts.
 */
export const FORBIDDEN_KEYWORDS: readonly string[] = [
  // e.g. 'ai music generator', 'text to music',
];

/**
 * Legally risky promises — must never appear ANYWHERE in page copy.
 * While in waitlist mode, phrases implying the product is publicly available
 * are forbidden too.
 */
export const FORBIDDEN_CLAIMS: readonly string[] = [
  'copyright-free',
  'copyright free',
  'claim-free',
  'claim free',
  'no copyright',
];

/** AI crawlers explicitly allowed in robots.ts. */
export const AI_CRAWLERS: readonly string[] = [
  'GPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
];
