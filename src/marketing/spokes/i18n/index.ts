import { getTranslations } from 'next-intl/server';
import { LAUNCH_MODE } from '@/lib/launch';
import type { Locale } from '@/i18n/routing';
import type { SpokeDef } from '../types';
import type { SpokeCopyOverride, SpokeLocaleOverrides } from './types';
import es from './es';
import fr from './fr';
import it from './it';
import de from './de';
import ru from './ru';
import ka from './ka';
import hy from './hy';
import sr from './sr';

const OVERRIDES: Partial<Record<Locale, SpokeLocaleOverrides>> = { es, fr, it, de, ru, ka, hy, sr };

function mergeCopy(spoke: SpokeDef, o: SpokeCopyOverride | undefined): SpokeDef {
  if (!o) return spoke;
  return {
    ...spoke,
    subject: o.subject ?? spoke.subject,
    navLabel: o.navLabel ?? spoke.navLabel,
    description: o.description ?? spoke.description,
    hero: { ...spoke.hero, ...o.hero },
    sections: spoke.sections.map((s, i) => ({ ...s, ...o.sections?.[i] })),
    faq: spoke.faq.map((item) => {
      const fo = o.faq?.[item.docSlug];
      return fo ? { ...item, ...fo } : item;
    }),
    howToSteps: spoke.howToSteps?.map((s, i) => ({ ...s, ...o.howToSteps?.[i] })),
    comparison: spoke.comparison && {
      ...spoke.comparison,
      competitor: o.comparison?.competitor ?? spoke.comparison.competitor,
      rows: spoke.comparison.rows.map((r, i) => ({ ...r, ...o.comparison?.rows?.[i] })),
    },
  };
}

/**
 * Sync half: merges the locale's copy override (if any) on top of the
 * canonical English `SpokeDef` — no CTA label / availability FAQ (those need
 * an async translation lookup, see `localizeSpoke` below). Safe to call from
 * a plain synchronous Server Component (e.g. Footer's nav-label list).
 */
export function localizeSpokeCopy(spoke: SpokeDef, locale: Locale): SpokeDef {
  return mergeCopy(spoke, OVERRIDES[locale]?.[spoke.docSlug]);
}

/**
 * Full locale-aware view of a spoke: `localizeSpokeCopy` plus the two
 * shared-across-every-spoke strings (CTA label, availability FAQ) injected
 * from messages/{locale}.json rather than requiring every override file to
 * repeat them.
 */
export async function localizeSpoke(spoke: SpokeDef, locale: Locale): Promise<SpokeDef> {
  const merged = localizeSpokeCopy(spoke, locale);
  const [common, faqT] = await Promise.all([
    getTranslations({ locale, namespace: 'common' }),
    getTranslations({ locale, namespace: 'faq' }),
  ]);
  const ctaLabel = LAUNCH_MODE === 'live' ? common('ctaLabelLive') : common('ctaLabelWaitlist');

  return {
    ...merged,
    hero: { ...merged.hero, cta: { ...merged.hero.cta, label: ctaLabel } },
    faq: merged.faq.map((item) =>
      item.docSlug === 'waitlist'
        ? { ...item, q: faqT('availability.q'), a: faqT('availability.a') }
        : item,
    ),
  };
}
