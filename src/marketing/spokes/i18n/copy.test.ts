// Locale JSON files imported under a `Messages` suffix — a bare `it` import
// (for Italian) would shadow Jest's global `it()` test function.
import en from '../../../../messages/en.json';
import esMessages from '../../../../messages/es.json';
import frMessages from '../../../../messages/fr.json';
import itMessages from '../../../../messages/it.json';
import deMessages from '../../../../messages/de.json';
import ruMessages from '../../../../messages/ru.json';
import kaMessages from '../../../../messages/ka.json';
import hyMessages from '../../../../messages/hy.json';
import srMessages from '../../../../messages/sr.json';
import esSpokes from './es';
import frSpokes from './fr';
import itSpokes from './it';
import deSpokes from './de';
import ruSpokes from './ru';
import kaSpokes from './ka';
import hySpokes from './hy';
import srSpokes from './sr';
import { SPOKES } from '../registry';

const MESSAGES: Record<string, unknown> = {
  es: esMessages,
  fr: frMessages,
  it: itMessages,
  de: deMessages,
  ru: ruMessages,
  ka: kaMessages,
  hy: hyMessages,
  sr: srMessages,
};
const SPOKE_OVERRIDES: Record<string, Record<string, unknown>> = {
  es: esSpokes,
  fr: frSpokes,
  it: itSpokes,
  de: deSpokes,
  ru: ruSpokes,
  ka: kaSpokes,
  hy: hySpokes,
  sr: srSpokes,
};

/** `{placeholder}` and `<tag>` tokens, order-independent — a translation
 * dropping or renaming one silently breaks interpolation/rich-text at
 * render time instead of failing a build. */
function tokens(s: string): string[] {
  return [...s.matchAll(/\{[a-zA-Z0-9_]+\}|<[a-zA-Z0-9_]+>/g)].map((m) => m[0]).sort();
}

function walk(en: unknown, other: unknown, path: string, locale: string, issues: string[]) {
  if (typeof en === 'string') {
    if (typeof other !== 'string') {
      issues.push(`${locale} ${path}: expected a string, got ${typeof other}`);
      return;
    }
    const enTokens = tokens(en).join(',');
    const otherTokens = tokens(other).join(',');
    if (enTokens !== otherTokens) {
      issues.push(`${locale} ${path}: token mismatch — en=[${enTokens}] ${locale}=[${otherTokens}]`);
    }
    return;
  }
  if (Array.isArray(en)) {
    if (!Array.isArray(other) || other.length !== en.length) {
      issues.push(`${locale} ${path}: array length mismatch — en=${en.length} ${locale}=${Array.isArray(other) ? other.length : 'not an array'}`);
      return;
    }
    en.forEach((item, i) => walk(item, other[i], `${path}[${i}]`, locale, issues));
    return;
  }
  if (en && typeof en === 'object') {
    if (!other || typeof other !== 'object') {
      issues.push(`${locale} ${path}: expected an object, got ${typeof other}`);
      return;
    }
    for (const key of Object.keys(en as Record<string, unknown>)) {
      walk(
        (en as Record<string, unknown>)[key],
        (other as Record<string, unknown>)[key],
        path ? `${path}.${key}` : key,
        locale,
        issues,
      );
    }
  }
}

describe('messages/{locale}.json — structural parity with en.json', () => {
  it.each(Object.keys(MESSAGES))('%s has the same keys, array lengths, and placeholder/tag tokens as en', (locale) => {
    const issues: string[] = [];
    walk(en, MESSAGES[locale], '', locale, issues);
    expect(issues).toEqual([]);
  });
});

describe('spokes/i18n/{locale}.ts — override keys are real docSlugs', () => {
  const realDocSlugs = new Set(SPOKES.map((s) => s.docSlug));

  it.each(Object.keys(SPOKE_OVERRIDES))('%s only overrides real docSlugs, never "waitlist"', (locale) => {
    const overrides = SPOKE_OVERRIDES[locale];
    for (const docSlug of Object.keys(overrides)) {
      expect(realDocSlugs.has(docSlug)).toBe(true);
    }
    expect(Object.keys(overrides)).not.toContain('waitlist');
  });

  it.each(Object.keys(SPOKE_OVERRIDES))('%s FAQ overrides keep answers over 40 chars', (locale) => {
    const overrides = SPOKE_OVERRIDES[locale] as Record<
      string,
      { faq?: Record<string, { a?: string }> }
    >;
    for (const override of Object.values(overrides)) {
      for (const faqOverride of Object.values(override.faq ?? {})) {
        if (faqOverride.a) expect(faqOverride.a.length).toBeGreaterThan(40);
      }
    }
  });
});
