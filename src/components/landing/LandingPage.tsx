import { cn } from '@/lib/cn';
import { Footer } from './Footer';
import { kineticFontVariables } from './kinetic/fonts';
import { KineticEffects } from './kinetic/KineticEffects';
import { KineticHero } from './kinetic/KineticHero';
import { KineticMarqueeBand } from './kinetic/KineticMarqueeBand';
import { KineticBentoGrid } from './kinetic/KineticBentoGrid';
import { KineticFood } from './kinetic/KineticFood';
import { KineticStart } from './kinetic/KineticStart';
import { KineticSatellites } from './kinetic/KineticSatellites';

/**
 * Kinetic v7 homepage. `.ld-kinetic` layers dark tokens for everything above
 * the footer; the outer `.ld-theme` wrapper is kept so <Footer/> (and the
 * `.ld-theme`-scoped WaitlistForm inside KineticStart) still render in the
 * site's light "vapor" palette — deliberate, see kinetic.css.
 */
export const LandingPage = () => (
  <div className="ld-theme min-h-screen">
    <div className={cn('ld-kinetic bg-[color:var(--k-bg)]', kineticFontVariables)}>
      <KineticHero />
      <KineticMarqueeBand />
      <KineticBentoGrid />
      <KineticFood />
      <KineticStart />
      <KineticSatellites />
      <div className="h-[76px]" />
      <KineticEffects />
    </div>
    <Footer />
  </div>
);
