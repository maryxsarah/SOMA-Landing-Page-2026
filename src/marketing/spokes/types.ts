export type SpokeBucket = 'features' | 'for' | 'how-to' | 'alternatives' | 'compare';

export interface SpokeFaqItem {
  q: string;
  /**
   * Docs entry behind the answer; `a` defaults to that entry's summary,
   * verbatim. This site has no docs system yet, so `a` is required for now —
   * when docs land, wire resolveFaq() to the docs source instead.
   */
  docSlug: string;
  a?: string;
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
  /** Primary docs page behind this spoke — linked from the hero (when docs exist). */
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
