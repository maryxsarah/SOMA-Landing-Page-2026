import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

const SIGNALS = [
  { a: 'Low readiness score', b: 'Fully booked calendar' },
  { a: 'High sleep score', b: 'Heavy, flat workout' },
  { a: '“I feel great” today', b: 'Low HRV overnight' },
];

/** The reframe from the Reset Guide, ending on the dark pull-quote card. */
export const Problem = () => (
  <section id="problem" className="py-24">
    <Container className="flex flex-col items-center gap-6 text-center">
      <Reveal className="flex flex-col items-center gap-6">
      <Eyebrow>the real problem</Eyebrow>
      <h2 className="ld-serif max-w-3xl text-4xl leading-tight font-medium md:text-5xl">
        You don’t have a data problem. You have a <em className="italic">translation</em> problem.
      </h2>
      <p className="max-w-2xl text-lg text-[color:var(--ld-text-2)]">
        Your ring knows your recovery. Your calendar knows your load. Your sleep app knows your
        stages. None of them talk to each other — and none of them were ever built to. So you do
        the translation yourself. Usually badly. Usually alone. Usually at 6am with half a coffee
        in you and twelve minutes before the first meeting.
      </p>
      </Reveal>

      <Reveal delay={120} className="mt-6 flex flex-col gap-3">
        {SIGNALS.map((s) => (
          <div key={s.a} className="flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-[var(--ld-sunken)] px-5 py-2 text-sm font-semibold">
              {s.a}
            </span>
            <span className="text-xs font-bold tracking-[0.08em] text-[color:var(--ld-text-3)]">
              VS
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
          “The number was never lying to you. It just wasn’t finished talking.”
        </blockquote>
        <figcaption className="mt-3 text-sm text-white/50">
          — The Data-Backed Reset Guide
        </figcaption>
      </figure>
      </Reveal>
    </Container>
  </section>
);
