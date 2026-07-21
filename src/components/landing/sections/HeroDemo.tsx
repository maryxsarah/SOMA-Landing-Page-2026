import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';
import { LocalImage } from '@/components/LocalImage';

/**
 * First product peek right under the hero: four app screens (voice orb,
 * daily check-in, coach chat) on a white surface card — the screenshot's
 * own background is pure white, so the card hides the bg mismatch.
 */
export const HeroDemo = () => (
  <section id="hero-demo" className="py-24">
    <Container className="flex flex-col items-center gap-6 text-center">
      <Reveal className="flex flex-col items-center gap-6">
        <Eyebrow>a first look at SOMA</Eyebrow>
        <h2 className="ld-serif max-w-3xl text-4xl leading-tight font-medium md:text-5xl">
          One orb. Every signal. <em className="italic">Zero translation.</em>
        </h2>
      </Reveal>
      <Reveal delay={120} className="w-full">
        <div className="ld-lift mx-auto max-w-6xl rounded-2xl bg-[var(--ld-surface)] p-6 md:p-10">
          <LocalImage
            src="/media/app-screens.webp"
            alt="Four SOMA app screens: the coach suggesting a zone-2 workout from last night's HRV, a 7:30am daily check-in prompt, and the hold-to-talk voice orb ready for a question"
            width={1448}
            height={665}
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="h-auto w-full"
          />
        </div>
      </Reveal>
    </Container>
  </section>
);
