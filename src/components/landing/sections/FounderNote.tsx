import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

/**
 * Founder note — the warm band in the cold/warm rhythm from the reference
 * board (stone background, terracotta accent). Condensed from the Reset
 * Guide's "a quick note from me" in Sarah-Maria's own words.
 */
export const FounderNote = () => (
  <section className="border-t border-[var(--ld-line)] bg-[#f7f3ec] py-24">
    <Container className="flex flex-col items-center gap-6 text-center">
      <Reveal className="flex flex-col items-center gap-6">
      <Eyebrow>why soma exists</Eyebrow>
      <blockquote className="ld-serif max-w-3xl text-2xl leading-relaxed font-medium md:text-3xl">
        “I bought the ring. I downloaded the apps. I had more data about myself than I’d ever had
        in my life — and I still didn’t know what to actually{' '}
        <em className="italic">do</em> with any of it. I did the translation by hand for two
        years. SOMA is the tool I wished existed the whole time.”
      </blockquote>
      <div>
        <p className="font-bold">Sarah-Maria Kollnitzer</p>
        <p className="text-sm text-[color:var(--ld-text-2)]">
          Founder &amp; CEO — SOMA’s first and most demanding user
        </p>
      </div>
      <p className="text-sm text-[color:var(--ld-terracotta)]">
        Building in public — a new field note every week.
      </p>
      </Reveal>
    </Container>
  </section>
);
