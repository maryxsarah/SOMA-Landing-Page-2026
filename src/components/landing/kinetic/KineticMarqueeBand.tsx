import { useTranslations } from 'next-intl';
import { LocalImage } from '@/components/LocalImage';

const CUTOUT = 'max-h-[76%] max-w-[74%] h-auto w-auto';
const COVER = 'h-full w-full object-cover';

const WORD_IMAGES = [
  { img: '/assets/kinetic/site/food-bowl.png', dims: [1094, 1134], style: CUTOUT },
  { img: '/assets/kinetic/site/life-dumbbell.png', dims: [1200, 832], style: COVER },
  { img: '/assets/kinetic/site/dev-oura.png', dims: [405, 350], style: CUTOUT },
  { img: '/assets/kinetic/site/life-beach.png', dims: [650, 1200], style: COVER },
  { img: '/assets/kinetic/site/dev-health.png', dims: [699, 699], style: CUTOUT },
  { img: '/assets/kinetic/site/her-portrait.png', dims: [1075, 1200], style: COVER },
  { img: '/assets/kinetic/site/food-berries.png', dims: [1143, 1200], style: CUTOUT },
  { img: '/assets/kinetic/site/life-hike.png', dims: [650, 1200], style: COVER },
] as const;

/** Pure-CSS marquee of the pattern words, each with a small icon or photo. */
export const KineticMarqueeBand = () => {
  const t = useTranslations('kinetic');
  const words = t.raw('band.words') as string[];

  return (
    <section className="relative mt-[76px] overflow-hidden bg-[linear-gradient(90deg,rgba(122,162,255,0.06),rgba(176,150,255,0.12)_50%,rgba(122,162,255,0.06))] py-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(255,255,255,0.12)]">
      <div className="flex w-max animate-[k7Marquee_46s_linear_infinite] items-center gap-[18px]">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-[18px]">
            {words.map((word, i) => {
              const asset = WORD_IMAGES[i];
              return (
                <span key={`${copy}-${word}`} className="flex shrink-0 items-center gap-[14px] whitespace-nowrap">
                  <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                    <LocalImage
                      src={asset.img}
                      alt=""
                      width={asset.dims[0]}
                      height={asset.dims[1]}
                      className={asset.style}
                    />
                  </span>
                  <span className="k7-serif text-[22px] leading-none font-bold tracking-[-0.4px] text-white">
                    {word}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};
