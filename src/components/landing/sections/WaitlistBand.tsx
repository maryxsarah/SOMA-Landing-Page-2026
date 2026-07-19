import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';
import { WaitlistForm } from '../WaitlistForm';

/**
 * Final full-width band. In waitlist mode this replaces the ReadyBand — the
 * hero CTA anchor `#waitlist` lands here. The offer is the lead magnet: the
 * guide IS the waitlist (one opt-in, no competing "join waitlist" CTA).
 */
export const WaitlistBand = () => (
  <section id="waitlist" className="border-t border-[var(--ld-line)] py-24">
    <Container className="flex flex-col items-center gap-6 text-center">
      <Reveal className="flex w-full flex-col items-center gap-6">
      <Eyebrow>start where you are</Eyebrow>
      <h2 className="ld-serif text-4xl font-medium">
        Get <em className="italic">The Data-Backed Reset Guide</em>
      </h2>
      <p className="max-w-xl text-[color:var(--ld-text-2)]">
        Six field notes on turning the data you already collect into calmer, better mornings —
        free, in your inbox today. Joining puts you on the SOMA waitlist for first access at
        launch.
      </p>
      <WaitlistForm className="items-center" />
      </Reveal>
    </Container>
  </section>
);
