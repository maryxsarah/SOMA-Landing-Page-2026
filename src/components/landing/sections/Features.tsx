import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

const CARD_LAYOUT = [
  'ld-lift rounded-2xl bg-[var(--ld-accent-soft)] p-8 md:row-span-2',
  'ld-lift rounded-2xl border border-[var(--ld-line)] p-8',
  'ld-lift rounded-2xl border border-[var(--ld-line)] p-8',
  'ld-lift rounded-2xl border border-[var(--ld-line)] p-8 md:col-span-2',
] as const;
const CARD_DELAYS = [0, 90, 180, 240] as const;

/** Bento grid: the four load-bearing capabilities from the one-pager. */
export const Features = () => {
  const t = useTranslations('features');
  const deviceChips = t.raw('deviceChips') as string[];
  const cards = t.raw('cards') as { title: string; body: string }[];
  return (
    <section id="features" className="border-t border-[var(--ld-line)] bg-[var(--ld-surface)] py-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="ld-serif max-w-2xl text-4xl leading-tight font-medium">{t('h2')}</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={CARD_DELAYS[i]} className={CARD_LAYOUT[i]}>
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[color:var(--ld-text-2)]">
                {card.body}
              </p>
              {i === 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {deviceChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-[var(--ld-surface)] px-4 py-1.5 text-sm font-semibold text-[color:var(--ld-text-2)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
