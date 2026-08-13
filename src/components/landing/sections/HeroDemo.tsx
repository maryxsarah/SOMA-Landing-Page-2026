import { useTranslations } from 'next-intl';
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
 *
 * `caption`/`alt` come from messages/{locale}.json `heroDemo.screens.<key>` —
 * `src` stays fixed (an asset path, not translatable content).
 */
const SCREEN_SOURCES = [
  { key: 'intro', src: '/media/screens/intro.webp' },
  { key: 'onboarding', src: '/media/screens/onboarding.webp' },
  { key: 'home', src: '/media/screens/home.webp' },
  { key: 'readiness', src: '/media/screens/readiness.webp' },
  { key: 'workout', src: '/media/screens/workout.webp' },
  { key: 'complete', src: '/media/screens/complete.webp' },
  { key: 'profile', src: '/media/screens/profile.webp' },
] as const;

export const HeroDemo = () => {
  const t = useTranslations('heroDemo');
  const screens: Screen[] = SCREEN_SOURCES.map(({ key, src }) => ({
    src,
    caption: t(`screens.${key}.caption`),
    alt: t(`screens.${key}.alt`),
  }));
  return (
    <section id="hero-demo" className="py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="ld-serif max-w-3xl text-4xl leading-tight font-medium md:text-5xl">
            {t.rich('h2', { em: (chunks) => <em className="italic">{chunks}</em> })}
          </h2>
        </Reveal>
        <Reveal delay={120} className="w-full">
          <div className="mx-auto max-w-6xl rounded-2xl bg-[var(--ld-surface)] px-6 py-8 md:px-12 md:py-10">
            <ScreenGallery screens={screens} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
