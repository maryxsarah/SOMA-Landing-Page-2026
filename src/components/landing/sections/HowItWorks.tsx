import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

const STEP_NUMBERS = ['01', '02', '03'] as const;

/** Three-step "how it works" from the one-pager's solution paragraph. */
export const HowItWorks = () => {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as { title: string; body: string }[];
  return (
    <section id="how-it-works" className="border-t border-[var(--ld-line)] py-24">
      <Container>
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="ld-serif max-w-2xl text-4xl leading-tight font-medium">{t('h2')}</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 90}
              className="ld-lift rounded-2xl border border-[var(--ld-line)] bg-[var(--ld-surface)] p-8"
            >
              <div className="ld-serif text-3xl text-[color:var(--ld-accent)]">
                {STEP_NUMBERS[i]}
              </div>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ld-text-2)]">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
