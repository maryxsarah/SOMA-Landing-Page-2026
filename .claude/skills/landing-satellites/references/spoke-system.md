# Spoke system: typed registry → all surfaces

One `SpokeDef` object per satellite page. Pages, footer, sitemap.xml, llms.txt,
and markdown twins all derive from the single `SPOKES` array. Never keep
parallel page lists (footer list / sitemap list / schema list WILL drift).

## Types — `src/marketing/spokes/types.ts`

```ts
export type SpokeBucket = 'features' | 'for' | 'how-to' | 'alternatives' | 'compare';

export interface SpokeFaqItem {
  q: string;
  /** Docs entry behind the answer; `a` defaults to that entry's summary, verbatim. */
  docSlug: string;
  a?: string; // inline answer if the site has no docs system
}

export interface SpokeSectionDef {
  title: string;
  body: string[];
  /** Rendered as a rounded-pill list. */
  pills?: string[];
}

export interface SpokeDef {
  bucket: SpokeBucket;
  slug: string;
  archetype: 'feature' | 'for' | 'howTo' | 'alternative' | 'compare';
  /** Fills the archetype title template in `pageMetadata`. */
  subject: string;
  /** Short label for footer-sitemap lists; defaults to capitalized subject. */
  navLabel?: string;
  /** Meta description, 110–170 chars. Checked against FORBIDDEN_* in tests. */
  description: string;
  /** Queries this page claims / must stay away from — the anti-cannibalization contract. */
  owns: string[];
  avoids: string[];
  hero: {
    eyebrow: string;
    h1: string;
    /** Lead paragraph; carries `data-speakable`. Same guardrails as the title. */
    lead: string;
    cta: { label: string; href: string };
  };
  sections: SpokeSectionDef[];
  faq: SpokeFaqItem[];
  /** Primary docs page behind this spoke — linked from the hero. */
  docSlug: string;
  /** how-to bucket only: numbered steps + HowTo JSON-LD. */
  howToSteps?: { name: string; text: string }[];
  /** alternatives/compare buckets: at-a-glance table + ItemList JSON-LD. */
  comparison?: {
    competitor: string;
    rows: { dim: string; them: string; us: string }[];
  };
}

export function spokePath(spoke: SpokeDef): string {
  return `/${spoke.bucket}/${spoke.slug}`;
}
```

## Registry — `src/marketing/spokes/registry.ts`

```ts
export const SPOKES: SpokeDef[] = [
  /* features → how-to → for → alternatives, in build order */
];

export function spokesInBucket(bucket: SpokeBucket): SpokeDef[] {
  return SPOKES.filter((s) => s.bucket === bucket);
}
export function findSpoke(bucket: SpokeBucket, slug: string): SpokeDef | null {
  return SPOKES.find((s) => s.bucket === bucket && s.slug === slug) ?? null;
}
/** FAQ answer: explicit override, else the docs entry summary — verbatim. Throws on broken ref. */
export function resolveFaq(item: SpokeFaqItem): { q: string; a: string; docSlug: string } {
  const a = item.a ?? findEntry(item.docSlug)?.entry.summary;
  if (!a) throw new Error(`Spoke FAQ references unknown docs entry "${item.docSlug}"`);
  return { q: item.q, a, docSlug: item.docSlug };
}
```

## Writing spoke defs: the Owns/Avoids discipline

Every def carries the contract twice: a JSDoc header (for the human diff-reader)
and the `owns[]`/`avoids[]` fields (for the record). Example patterns:

```ts
/** Owns: "duck music under voice podcast", "music too loud under voice".
 *  Avoids: generic video auto-duck — the sister product owns that page. The
 *  claim unique to THIS page is survival across edits. */
export const autoDuck: SpokeDef = {
  bucket: 'features', slug: 'auto-duck', archetype: 'feature', subject: 'Auto-ducking',
  description: '…140–160 chars…',
  owns: ['duck music under voice podcast', 'music too loud under voice'],
  avoids: ['auto-duck for video (sister product owns it)', 'sidechain tutorials (DAW intent)'],
  hero: { eyebrow: 'Auto-ducking', h1: 'Ducking that stays correct after you cut', lead: '…', cta: { label: 'Try it', href: '/auth' } },
  sections: [{ title: '…', body: ['…'], pills: ['…'] }],
  faq: [{ q: '…?', docSlug: 'auto-ducking' }],
  docSlug: 'auto-ducking',
};
```

Archetype conventions:
- **feature**: what the mechanic does + why here it's different; hero CTA is an
  action phrase ("Put music under my voice"), not "Sign up".
- **howTo**: `subject` is the verb phrase ("remove filler words from a podcast"),
  `navLabel` the short form; 3–5 `howToSteps` (each maps to a real UI action).
  Share one `const START_FREE = { label: '…', href: '/auth' }` across how-tos.
- **for** (persona): H1 speaks to the persona's deliverable/pain, not features.
- **alternative**: singular format ("<Competitor> alternative"), honest — include
  a "Pick <competitor> if…" section; `comparison.rows` `{dim, them, us}` fair
  enough to be citable. Target only direct-category competitors, never products
  a sister site should own.

## Dynamic routes — one file per bucket, identical shape

`src/app/features/[slug]/page.tsx` (clone for `for`, `how-to`, `alternatives`):

```tsx
export function generateStaticParams() {
  return spokesInBucket('features').map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(ctx: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await ctx.params;
  const spoke = findSpoke('features', slug);
  if (!spoke) return {};
  return pageMetadata({ archetype: 'feature', subject: spoke.subject, description: spoke.description, path: spokePath(spoke) });
}

export default async function FeatureSpoke(ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const spoke = findSpoke('features', slug);
  if (!spoke) notFound();
  return <SpokePage spoke={spoke} />;
}
```

## Renderer — one `SpokePage` component for all archetypes

Build it on the landing DS (`.ld`, Container, AcidButton, Footer). It:
1. Assembles JSON-LD from the def: `webPage`, `breadcrumbList`, plus `howTo(...)`
   if `howToSteps`, plus `itemList(...)` if `comparison`, plus `faqPage(...)`.
2. Renders hero: eyebrow, serif H1, lead with `data-speakable`, CTA button, and
   a "Read the docs answer →" link to `/docs/${spoke.docSlug}`.
3. Conditionally: numbered `<ol>` steps (howTo), "At a glance" `<table>`
   (comparison rows).
4. Maps `sections` to `<section>` blocks with pill lists.
5. FAQ as native `<details>` (first one open) — same array feeds FAQPage JSON-LD
   via `resolveFaq`, so visible text and schema can never diverge.
6. Footer.

## Markdown twins + llms.txt (the agent surface)

`spokeToMarkdown(spoke, origin)` emits: H1, lead, docs link, steps, comparison
table, sections + pills, FAQ (resolved answers + "More: /docs/<slug>"), canonical
footer line. Serve via `src/app/spoke-md/[bucket]/[slug]/route.ts` with
`Content-Type: text/markdown` and `X-Robots-Tag: noindex`, `Vary: Accept`.
The edge proxy rewrites `<route>.md` and `Accept: text/markdown` requests to it
(see infra reference). llms.txt appends a "## Marketing pages" section iterating
`SPOKES`: `- [h1](origin + spokePath): description`.

## Guardrail tests — `src/marketing/spokes/spokes.test.ts` (CI gate, verbatim)

```ts
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

  it.each(SPOKES.map((s) => [s.slug, s] as const))('%s: no forbidden CLAIMS anywhere in the body', (_slug, spoke) => {
    const everything = spoke.sections.flatMap((s) => [s.title, ...s.body, ...(s.pills ?? [])]).join(' ');
    const claims = FORBIDDEN_CLAIMS.filter((k) => everything.toLowerCase().includes(k));
    expect(claims).toEqual([]);
  });

  it.each(SPOKES.map((s) => [s.slug, s] as const))('%s: every FAQ answer resolves from docs', (_slug, spoke) => {
    for (const item of spoke.faq) {
      const { a } = resolveFaq(item);
      expect(a.length).toBeGreaterThan(40);
    }
  });

  it.each(SPOKES.map((s) => [s.slug, s] as const))('%s: meta description is 110–170 chars', (_slug, spoke) => {
    expect(spoke.description.length).toBeGreaterThanOrEqual(110);
    expect(spoke.description.length).toBeLessThanOrEqual(170);
  });
});
```

## Scoping decisions that saved pages from being built wrong

- If the product already has a rich docs/glossary section, do NOT build a
  `glossary/` bucket — "link the docs; don't clone them" (self-cannibalization).
- Blog lives on the parent domain (`domain.com/blog/*`), linking IN — not under
  the product path.
- Keep a written **Blocked list**: pages the product cannot honestly back yet
  (features that don't exist, claims pending legal). A page whose promise the
  product can't keep is worse than no page.
