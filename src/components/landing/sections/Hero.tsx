import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';
import { WaitlistForm } from '../WaitlistForm';
import { LAUNCH_MODE, CTA_HREF, CTA_LABEL } from '@/lib/launch';
import { CtaButton } from '../CtaButton';
import { asset } from '@/lib/asset';

/**
 * Hero per the reference board: centered orb (the AI-presence motif) on a
 * mist-gradient first screen, serif-italic H1 from the tagline, one lead,
 * ONE primary CTA (waitlist = guide opt-in).
 * Must fit the first screen at every width (the `.ld` zoom svh term).
 */
export const Hero = () => (
  <section id="hero" className="[background:var(--ld-mist)]">
    <Container className="flex min-h-[calc(100svh-64px)] flex-col items-center justify-center gap-6 py-8 text-center">
      <Reveal className="shrink-0">
      <div className="ld-orb-halo h-[260px] w-[260px]">
        {/* Liquid orb loop from the DS; motion-reduce hides the video and the
            .ld-orb-media gradient fallback shows instead. */}
        <div aria-hidden className="ld-orb-mask h-[242px] w-[242px] motion-reduce:hidden">
          <video src={asset('/media/orb-liquid-loop-blue.mp4')} autoPlay muted loop playsInline />
        </div>
        <div
          aria-hidden
          className="ld-orb-media hidden h-[190px] w-[190px] motion-reduce:block"
        />
      </div>
      </Reveal>
      <Reveal delay={120}>
        <Eyebrow>your health journey starts now</Eyebrow>
      </Reveal>
      <Reveal delay={200}>
      <h1 className="ld-serif max-w-4xl text-5xl leading-[1.08] font-medium md:text-[68px] md:leading-[1.05]">
        Find your next <em className="italic">best day</em>.
      </h1>
      </Reveal>
      <Reveal delay={280}>
      <p data-speakable className="max-w-2xl text-xl text-[color:var(--ld-text-2)]">
        The health coach for all devices in your pocket. One App for your health, wellness, and
        longevity.
      </p>
      </Reveal>
      <Reveal delay={360} className="w-full max-w-md">
        {LAUNCH_MODE === 'waitlist' ? (
          <WaitlistForm className="mt-2 items-center" />
        ) : (
          <CtaButton href={CTA_HREF} shimmer arrow className="mt-2">
            {CTA_LABEL}
          </CtaButton>
        )}
      </Reveal>
    </Container>
  </section>
);
