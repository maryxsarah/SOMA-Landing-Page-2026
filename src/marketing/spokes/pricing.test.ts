// Guard against the $99-vs-$19.99 class of bug: a price figure written into
// translated copy is copied into 9 locale files, so a wrong one ships nine
// times over. Locale spoke files are imported directly (not via ./i18n,
// which pulls next-intl/server into Jest).
import { ALLOWED_PRICE_STRINGS } from '@/lib/pricing';
import esSpokes from './i18n/es';
import frSpokes from './i18n/fr';
import itSpokes from './i18n/it';
import deSpokes from './i18n/de';
import ruSpokes from './i18n/ru';
import kaSpokes from './i18n/ka';
import hySpokes from './i18n/hy';
import srSpokes from './i18n/sr';
import { SPOKES } from './registry';

const LOCALE_OVERRIDES: Record<string, unknown> = {
  es: esSpokes,
  fr: frSpokes,
  it: itSpokes,
  de: deSpokes,
  ru: ruSpokes,
  ka: kaSpokes,
  hy: hySpokes,
  sr: srSpokes,
};

/** Any number attached to a currency marker, either side: `$99`, `99 $`, `19,99$`. */
const PRICE_RE = /(?:\$\s?\d[\d.,]*)|(?:\d[\d.,]*\s?\$)/g;

/**
 * Keys whose subtree quotes someone ELSE's numbers and is therefore exempt:
 * `them` is the competitor column of a comparison row, and `sections` bodies
 * carry the market-anchoring figures ("$30–90/month across device apps, plus
 * $200–600/month for human coaches"). Everything else — hero, description,
 * FAQ answers, and the `us` column — is SOMA speaking about its own price.
 */
const NOT_OUR_PRICE = new Set(['them', 'sections']);

/** Every string in a nested copy object, skipping the exempt subtrees. */
function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) {
      if (!NOT_OUR_PRICE.has(key)) strings(v, out);
    }
  }
  return out;
}

function badPrices(source: unknown): string[] {
  return strings(source)
    .flatMap((s) => s.match(PRICE_RE) ?? [])
    .filter((hit) => !ALLOWED_PRICE_STRINGS.some((ok) => hit.includes(ok)));
}

describe('price figures in spoke copy', () => {
  it('en (registry): every price is one of the published tiers', () => {
    expect(badPrices(SPOKES)).toEqual([]);
  });

  it.each(Object.entries(LOCALE_OVERRIDES))(
    '%s: every price is one of the published tiers',
    (_locale, overrides) => {
      expect(badPrices(overrides)).toEqual([]);
    },
  );
});
