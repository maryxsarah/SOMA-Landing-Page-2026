import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Connect what you already own',
    body: 'Your ring, your wearable, your CGM, Apple Health, or any other health device you already own. SOMA learns who you are and gets smarter every day.',
  },
  {
    n: '02',
    title: 'Tell SOMA about your day',
    body: 'A meal, a workout, how you slept — type it or say it. SOMA adjusts your plan based on how you feel, and what your body signals.',
  },
  {
    n: '03',
    title: 'Get one plan, not four dashboards',
    body: 'One clear plan, that already knows you and your body. When something changes, SOMA checks in with you - rather than waiting to be asked.',
  },
];

/** Three-step "how it works" from the one-pager's solution paragraph. */
export const HowItWorks = () => (
  <section id="how-it-works" className="border-t border-[var(--ld-line)] py-24">
    <Container>
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <Eyebrow>how it works</Eyebrow>
        <h2 className="ld-serif max-w-2xl text-4xl leading-tight font-medium">
          Two minutes, every morning, before the first real decision of the day
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal
            key={step.n}
            delay={i * 90}
            className="ld-lift rounded-2xl border border-[var(--ld-line)] bg-[var(--ld-surface)] p-8"
          >
            <div className="ld-serif text-3xl text-[color:var(--ld-accent)]">{step.n}</div>
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
