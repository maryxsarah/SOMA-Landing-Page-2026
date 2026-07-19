import { StickyNav } from './StickyNav';
import { Footer } from './Footer';
import { Hero } from './sections/Hero';
import { MarqueeStrip } from './sections/MarqueeStrip';
import { Problem } from './sections/Problem';
import { HowItWorks } from './sections/HowItWorks';
import { Features } from './sections/Features';
import { FounderNote } from './sections/FounderNote';
import { Pricing } from './sections/Pricing';
import { Faq } from './sections/Faq';
import { WaitlistBand } from './sections/WaitlistBand';

/**
 * Section composer — stacks small section components, no logic here.
 *
 * Full proven narrative order (add sections as content lands, one file each
 * in ./sections, ≤250 lines):
 *   Hero → HeroDemo → SocialProof → MarqueeStrip → FeaturesBento → Problem →
 *   HowItWorks → feature deep-dives → Trust/objection → SeeItInAction →
 *   WhoItsFor → Ecosystem → CtaSection → PricingSection → Faq →
 *   WaitlistBand/ReadyBand → Footer
 *
 * Nav anchors expect sections with id="features", id="how-it-works",
 * id="pricing", id="faq" to exist once those sections are built.
 */
export const LandingPage = () => (
  <div className="ld-theme min-h-screen">
    {/* Nav lives OUTSIDE the zoomed <main> — sticky drifts inside CSS zoom. */}
    <StickyNav />
    <main className="ld">
      <Hero />
      <MarqueeStrip />
      <Problem />
      <HowItWorks />
      <Features />
      <FounderNote />
      <Pricing />
      <Faq />
      <WaitlistBand />
      <Footer />
    </main>
  </div>
);
