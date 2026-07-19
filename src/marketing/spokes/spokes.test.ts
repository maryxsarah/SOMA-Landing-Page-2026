import { FORBIDDEN_CLAIMS, FORBIDDEN_KEYWORDS } from '@/lib/seo/constants';
import { resolveFaq, SPOKES } from './registry';

const forbidden = [...FORBIDDEN_KEYWORDS, ...FORBIDDEN_CLAIMS].map((k) => k.toLowerCase());

function violations(text: string): string[] {
  const t = text.toLowerCase();
  return forbidden.filter((k) => t.includes(k));
}

describe('spoke guardrails', () => {
  it.each(SPOKES.map((s) => [s.slug, s] as const))(
    '%s: no forbidden phrases in title surfaces (subject, description, H1, lead)',
    (_slug, spoke) => {
      for (const surface of [spoke.subject, spoke.description, spoke.hero.h1, spoke.hero.lead]) {
        expect(violations(surface)).toEqual([]);
      }
    },
  );

  it.each(SPOKES.map((s) => [s.slug, s] as const))(
    '%s: no forbidden CLAIMS anywhere in the body',
    (_slug, spoke) => {
      const everything = spoke.sections
        .flatMap((s) => [s.title, ...s.body, ...(s.pills ?? [])])
        .join(' ');
      const claims = FORBIDDEN_CLAIMS.filter((k) => everything.toLowerCase().includes(k));
      expect(claims).toEqual([]);
    },
  );

  it.each(SPOKES.map((s) => [s.slug, s] as const))(
    '%s: every FAQ answer resolves',
    (_slug, spoke) => {
      for (const item of spoke.faq) {
        const { a } = resolveFaq(item);
        expect(a.length).toBeGreaterThan(40);
      }
    },
  );

  it.each(SPOKES.map((s) => [s.slug, s] as const))(
    '%s: meta description is 110–170 chars',
    (_slug, spoke) => {
      expect(spoke.description.length).toBeGreaterThanOrEqual(110);
      expect(spoke.description.length).toBeLessThanOrEqual(170);
    },
  );
});
