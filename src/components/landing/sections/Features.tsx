import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

const DEVICE_CHIPS = ['oura ring', 'whoop', 'apple health', 'smart scale', 'CGM', '+ your habits'];

/** Bento grid: the four load-bearing capabilities from the one-pager. */
export const Features = () => (
  <section id="features" className="border-t border-[var(--ld-line)] bg-[var(--ld-surface)] py-24">
    <Container>
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <Eyebrow>what soma does</Eyebrow>
        <h2 className="ld-serif max-w-2xl text-4xl leading-tight font-medium">
          One home screen for your whole body
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <Reveal className="ld-lift rounded-2xl bg-[var(--ld-accent-soft)] p-8 md:row-span-2">
          <h3 className="text-lg font-bold">Reasons across everything at once</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ld-text-2)]">
            Every device produces its own score, in its own app, blind to the others. SOMA’s agents
            read them jointly — your sleep in the context of your cycle day, your readiness in the
            context of yesterday’s meals and this morning’s calendar — and answer as one voice.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {DEVICE_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-[var(--ld-surface)] px-4 py-1.5 text-sm font-semibold text-[color:var(--ld-text-2)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={90} className="ld-lift rounded-2xl border border-[var(--ld-line)] p-8">
          <h3 className="text-lg font-bold">Vendor-independent by design</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ld-text-2)]">
            Device makers can’t build coaching on a competitor’s hardware — structurally, they
            can’t. SOMA sits above the hardware war: it works with what you own now and whatever
            you switch to next.
          </p>
        </Reveal>

        <Reveal delay={180} className="ld-lift rounded-2xl border border-[var(--ld-line)] p-8">
          <h3 className="text-lg font-bold">Reaches out first</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ld-text-2)]">
            When something changes enough to matter, SOMA messages you — it doesn’t wait in an app
            for you to remember to check. Speak or type back like you would to a coach.
          </p>
        </Reveal>

        <Reveal delay={240} className="ld-lift rounded-2xl border border-[var(--ld-line)] p-8 md:col-span-2">
          <h3 className="text-lg font-bold">Depth on demand</h3>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[color:var(--ld-text-2)]">
            Beyond the daily plan: biometric audits and doctor-visit summaries when you want to go
            deeper — a written read of what your data has been saying, ready to bring into the
            conversations that matter.
          </p>
        </Reveal>
      </div>
    </Container>
  </section>
);
