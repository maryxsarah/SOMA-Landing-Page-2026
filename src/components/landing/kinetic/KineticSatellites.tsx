import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SPOKES, spokePath } from '@/marketing/spokes/registry';
import { localizeSpokeCopy } from '@/marketing/spokes/i18n';
import type { Locale } from '@/i18n/routing';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Real spoke pages, not the DC template's fictional `/gym-scan` etc. reserved
 * slots — this site already has 6 live spokes ready to link from here.
 */
export const KineticSatellites = () => {
  const t = useTranslations('kinetic');
  const locale = useLocale() as Locale;
  const spokes = SPOKES.map((s) => localizeSpokeCopy(s, locale));

  return (
    <section className="relative mx-auto mt-[76px] max-w-[1280px] px-10 max-[900px]:mt-12 max-[900px]:px-5">
      <div
        data-r
        data-from="up"
        className="mb-[18px] flex items-baseline justify-between gap-5 border-t border-white/12 pt-6"
      >
        <div className="text-[11.5px] font-semibold tracking-[1.1px] text-[color:var(--k-ink-faint)] uppercase">
          {t('satellites.eyebrow')}
        </div>
        <div className="text-[13px] text-[color:var(--k-ink-faint)]">{t('satellites.caption')}</div>
      </div>
      <div data-r data-from="up" data-d="1" className="grid grid-cols-3 gap-3 max-[900px]:grid-cols-1">
        {spokes.map((spoke) => (
          <Link
            key={spoke.docSlug}
            href={spokePath(spoke)}
            className="rounded-[18px] bg-white/5 p-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-colors hover:bg-white/8"
          >
            <div className="mb-[7px] text-[11.5px] font-semibold text-[color:var(--k-ink-faint)]">
              {spokePath(spoke)}
            </div>
            <div className="text-[15px] font-semibold text-[color:var(--k-ink)]">
              {spoke.navLabel ?? cap(spoke.subject)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
