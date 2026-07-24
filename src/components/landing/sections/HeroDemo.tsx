import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';
import { ScreenGallery, type Screen } from './ScreenGallery';

/**
 * First product peek right under the hero: a dot carousel of real app
 * screenshots in product order — onboarding, the daily read, the plan it
 * generates, logging it, the devices behind it. Each is cropped below the iOS
 * status bar and sits in a light bezel; their own backgrounds are near-white,
 * so the surface card behind them hides any bg mismatch.
 *
 * A carousel, not a grid: seven full-length phone screens in a 3-column grid
 * make a ~2200px-tall section, and squeezing them into one row puts the UI copy
 * below legibility. Three per page keeps them readable.
 */
const SCREENS: readonly Screen[] = [
  {
    src: '/media/screens/intro.webp',
    caption: 'What SOMA does',
    alt: 'SOMA intro screen: "Find your next best day", the devices → SOMA reads it → clear daily plan flow, and a chart showing consistency compounding over six months',
  },
  {
    src: '/media/screens/onboarding.webp',
    caption: 'Setup in a minute',
    alt: 'SOMA onboarding screen: "A simpler way to workout", with a bar chart comparing progress without SOMA and with SOMA',
  },
  {
    src: '/media/screens/home.webp',
    caption: 'Your week at a glance',
    alt: "SOMA home screen: the last seven days as filled rings with today highlighted, and today's readiness read as Moderate with the completed 35-minute upper body workout below",
  },
  {
    src: '/media/screens/readiness.webp',
    caption: "Today's plan",
    alt: "SOMA readiness detail: a 7,000–9,000 step target for today and a list of workouts that fit it, with the 35-minute upper body session picked",
  },
  {
    src: '/media/screens/workout.webp',
    caption: 'The full workout',
    alt: 'SOMA AI-generated workout: warm-up and strength blocks with exact sets, reps, loads and how to perform each exercise',
  },
  {
    src: '/media/screens/complete.webp',
    caption: 'Log it, and why',
    alt: 'SOMA workout screen scrolled to the cool-down, the Mark Workout Complete button, and a "Why today" note explaining the Oura readiness score behind the plan',
  },
  {
    src: '/media/screens/profile.webp',
    caption: 'Your devices',
    alt: 'SOMA profile screen: Apple Health and Oura connected, Whoop ready to connect, plus contact email and training experience settings',
  },
] as const;

export const HeroDemo = () => (
  <section id="hero-demo" className="py-24">
    <Container className="flex flex-col items-center gap-6 text-center">
      <Reveal className="flex flex-col items-center gap-6">
        <Eyebrow>a first look at SOMA</Eyebrow>
        <h2 className="ld-serif max-w-3xl text-4xl leading-tight font-medium md:text-5xl">
          One read of your day. <em className="italic">One clear plan.</em>
        </h2>
      </Reveal>
      <Reveal delay={120} className="w-full">
        <div className="mx-auto max-w-6xl rounded-2xl bg-[var(--ld-surface)] px-6 py-8 md:px-12 md:py-10">
          <ScreenGallery screens={SCREENS} />
        </div>
      </Reveal>
    </Container>
  </section>
);
