/**
 * Public pricing — the single source of truth for every surface that quotes
 * a number: JSON-LD `offers`, /pricing.md, llms.txt, the price line on the
 * homepage, and the guard test that scans spoke copy for stray figures.
 *
 * Figures mirror the live App Store paywall ("Get your personalized workout
 * plan"), not the pitch deck — the deck rounds and the paywall charges.
 *
 * Why this file exists: the site once shipped "From $99/month at launch" on
 * 18 localized spoke pages while the homepage said $19.99. Copy is
 * translated into 9 locales, so a wrong figure gets multiplied, not caught.
 * Anything quoting a price reads it from here, and `pricing.test.ts` fails
 * CI on any dollar figure in spoke copy that isn't listed below.
 *
 * Deliberately zero framework imports — same constraint as `launch.ts`, so
 * plain data modules and Jest can both import it.
 */

export const PRICING = {
  currency: 'USD',

  /** Monthly plan, billed monthly. The paywall shows $239.88/year equivalent. */
  monthly: 19.99,

  /**
   * Yearly plan. `annualTotal` is what actually gets charged; the $13.33
   * is the marketing per-month figure the paywall leads with. Do NOT derive
   * one from the other — 13.33 × 12 is 159.96, and the real charge is
   * 159.99. Quoting the derived number in schema.org `offers` would be a
   * wrong claim about the transaction.
   */
  annualTotal: 159.99,
  annualPerMonth: 13.33,
  /** Rounded saving the paywall advertises against 12 × monthly. */
  annualSavingPercent: 33,

  /**
   * Free trial length in days — and, importantly, which plan it applies to.
   * The paywall states "3-Day Free Trial only with yearly plan"; any copy
   * that offers a trial on the monthly plan is a promise the product does
   * not keep.
   */
  trialDays: 3,
  trialAppliesTo: 'annual' as const,
} as const;

/**
 * Deeper reports, biomarker/bloodwork integration and cycle-synced
 * programming. In the pitch deck as a $79.99 tier; NOT in the shipped
 * paywall. Kept here so the figure has one home if it launches, but no
 * public surface may present it as purchasable until it is — an agent
 * comparing products will take a listed tier as buyable.
 */
export const PLANNED_PREMIUM_MONTHLY = 79.99;

/**
 * Every price string allowed to appear in marketing copy, in the decimal
 * conventions the 9 locales actually use (de/fr/it/sr write 19,99).
 * The guard test whitelists these and rejects any other figure.
 */
export const ALLOWED_PRICE_STRINGS: readonly string[] = [
  '19.99',
  '19,99',
  '13.33',
  '13,33',
  '159.99',
  '159,99',
  '239.88',
  '239,88',
];
