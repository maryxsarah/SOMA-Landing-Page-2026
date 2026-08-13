import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

/** The reframe from the Reset Guide, ending on the dark pull-quote card. */
export const Problem = () => {
  const t = useTranslations('problem');
  const signals = t.raw('signals') as { a: string; b: string }[];
  return (
    <section id="problem" className="py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 className="ld-serif max-w-3xl text-4xl leading-tight font-medium md:text-5xl">
          {t.rich('h2', { em: (chunks) => <em className="italic">{chunks}</em> })}
        </h2>
        <p className="max-w-2xl text-lg text-[color:var(--ld-text-2)]">{t('lead')}</p>
        </Reveal>

        <Reveal delay={120} className="mt-6 flex flex-col gap-3">
          {signals.map((s) => (
            <div key={s.a} className="flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-[var(--ld-sunken)] px-5 py-2 text-sm font-semibold">
                {s.a}
              </span>
              <span className="text-xs font-bold tracking-[0.08em] text-[color:var(--ld-text-3)]">
                {t('vs')}
              </span>
              <span className="rounded-full bg-[var(--ld-sunken)] px-5 py-2 text-sm font-semibold">
                {s.b}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={200} className="w-full max-w-2xl">
        <figure className="ld-lift mt-10 rounded-2xl bg-[var(--ld-bg-dark)] px-10 py-9">
          <blockquote className="ld-serif text-2xl text-[color:var(--ld-text-inverse)] italic">
            {t('quote')}
          </blockquote>
          <figcaption className="mt-3 text-sm text-white/50">{t('quoteCaption')}</figcaption>
        </figure>
        </Reveal>
      </Container>
    </section>
  );
};
