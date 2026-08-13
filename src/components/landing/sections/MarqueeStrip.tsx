import { useTranslations } from 'next-intl';

/**
 * Slow marquee of the six field-note pattern titles from the Reset Guide —
 * instant "that's me" recognition, and a teaser for the lead magnet.
 */
export const MarqueeStrip = () => {
  const t = useTranslations('marquee');
  const patterns = t.raw('patterns') as string[];
  return (
    <section
      aria-label={t('ariaLabel')}
      className="overflow-hidden border-y border-[var(--ld-line)] bg-[var(--ld-surface)] py-5"
    >
      <div className="ld-marquee flex w-max gap-4">
        {/* Two copies back to back: the -50% keyframe loops seamlessly. */}
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4">
            {patterns.map((p) => (
              <span
                key={p}
                className="ld-serif shrink-0 rounded-full border border-[var(--ld-line)] bg-[var(--ld-bg)] px-6 py-2 text-[17px] text-[color:var(--ld-text-2)] italic"
              >
                {p}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
