/**
 * A locale's override of a spoke's translatable copy — every field optional,
 * merged on top of the canonical English `SpokeDef` from `registry.ts` at
 * render time (`localizeSpoke`). Structural/id fields (bucket, slug,
 * archetype, docSlug, hero.cta.href, owns, avoids — the latter two never
 * rendered) are never overridden here; they're defined once in registry.ts.
 * `sections`/`howToSteps`/`comparison.rows` are matched by array index
 * (order is fixed per spoke, never reordered per locale); `faq` is keyed by
 * `docSlug` since spokes share some FAQ entries (the availability FAQ is
 * handled separately via messages/{locale}.json `faq.availability`, not
 * here — it's identical across every spoke).
 */
export interface SpokeCopyOverride {
  subject?: string;
  navLabel?: string;
  description?: string;
  hero?: { eyebrow?: string; h1?: string; lead?: string };
  sections?: ({ title?: string; body?: string[]; pills?: string[] } | undefined)[];
  faq?: Record<string, { q?: string; a?: string }>;
  howToSteps?: ({ name?: string; text?: string } | undefined)[];
  comparison?: {
    competitor?: string;
    rows?: ({ dim?: string; them?: string; us?: string } | undefined)[];
  };
}

/** Keyed by `SpokeDef.docSlug`. */
export type SpokeLocaleOverrides = Record<string, SpokeCopyOverride>;
