import { useTranslations } from 'next-intl';
import { LocalImage } from '@/components/LocalImage';

/**
 * Cut-out props layered ON TOP of the bento cards (z-20), the same drifting
 * motif the hero uses. Offsets are keyed to the 4-column grid's fixed desktop
 * geometry — 1200px content width, 288px columns, 488px-tall first two rows —
 * so each prop lands in a card's empty half, never over copy.
 * `pointer-events-none` keeps them from stealing the cards' magnetic hover.
 *
 * Each prop is matched to its card's subject — training gear on "Proof", the
 * phone-in-hand shot on "Affirmation" — so swapping one means picking an image
 * that still reads for that card, not just one that fits the gap.
 */
const GRID_PROPS = [
  {
    img: 'life-dumbbell',
    dims: [1200, 832],
    className: 'left-[2%] top-[286px] w-[186px]',
    rot: -9,
    drift: 'k7Drift',
    dur: '11s',
    px: '0.07',
  },
  {
    img: 'food-granola',
    dims: [1094, 1094],
    className: 'left-[79%] top-[300px] w-[132px]',
    rot: 8,
    drift: 'k7DriftB',
    dur: '9s',
    px: '0.09',
  },
  {
    img: 'gear-dumbbells',
    dims: [411, 375],
    className: 'left-[61%] top-[818px] w-[132px]',
    rot: -6,
    drift: 'k7Drift',
    dur: '13s',
    // Low parallax strength on props that sit near copy: the ±90px clamp in
    // KineticEffects is the worst-case drift, so a strong value can walk them
    // back onto the text at some scroll positions.
    px: '0.05',
  },
  {
    img: 'her-phone-bench',
    dims: [974, 1151],
    className: 'left-[47%] top-[996px] w-[196px]',
    rot: 0,
    drift: 'k7DriftB',
    dur: '12s',
    px: '0.05',
  },
] as const;

/** "What's inside" bento grid — 7 cards, magnetic tilt + scroll reveal wired globally by <KineticEffects/>. */
export const KineticBentoGrid = () => {
  const t = useTranslations('kinetic');

  return (
    <section id="grid" className="relative mx-auto max-w-[1280px] px-10 pt-[88px] max-[900px]:px-5 max-[900px]:pt-14">
      <div className="relative mb-11 pb-4 text-center">
        <div
          data-r
          data-from="up"
          className="mb-5 inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-[1.6px] text-[color:var(--k-accent-soft)] uppercase"
        >
          <span className="h-px w-6 bg-[rgba(185,201,251,0.5)]" />
          {t('grid.eyebrow')}
          <span className="h-px w-6 bg-[rgba(185,201,251,0.5)]" />
        </div>
        <h2 data-r data-from="up" data-d="1" className="k7-serif mx-auto max-w-[700px] text-[46px] leading-[1.06] font-bold max-[900px]:text-[30px]">
          {t('grid.h2')}
        </h2>
      </div>

      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 max-[1240px]:hidden">
          {GRID_PROPS.map((prop) => (
            <div
              key={prop.img}
              data-px={prop.px}
              className={`absolute ${prop.className}`}
              style={{ '--rot': `${prop.rot}deg` } as React.CSSProperties}
            >
              <LocalImage
                src={`/assets/kinetic/site/${prop.img}.png`}
                alt=""
                width={prop.dims[0]}
                height={prop.dims[1]}
                className="h-auto w-full drop-shadow-[0_22px_40px_rgba(5,8,30,0.6)]"
                style={{
                  animationName: prop.drift,
                  animationDuration: prop.dur,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-1 max-[900px]:gap-5 max-[900px]:[&>*]:col-span-1">
        <div
          data-r
          data-from="left"
          data-magnet
          className="col-span-2 overflow-hidden rounded-[28px] bg-white/6 p-[30px] max-[900px]:p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        >
          <div className="grid grid-cols-[1fr_168px] items-center gap-6 max-[1240px]:grid-cols-1">
            <div>
              <div className="mb-3 text-[11.5px] font-semibold tracking-[1px] text-[color:var(--k-accent)] uppercase">
                {t('grid.daily.label')}
              </div>
              <h3 className="k7-serif mb-2.5 text-[28px] leading-[1.1] font-bold">{t('grid.daily.h3')}</h3>
              <p className="text-[14.5px] leading-[1.6] text-[color:var(--k-ink-soft)]">{t('grid.daily.body')}</p>
            </div>
            <div className="rounded-[28px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] p-1.5 shadow-[0_20px_40px_rgba(5,8,30,0.55)] max-[1240px]:mx-auto max-[1240px]:max-w-[168px]">
              <div className="overflow-hidden rounded-[23px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-home.png"
                  alt="Today's plan card"
                  width={589}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          data-r
          data-from="up"
          data-d="1"
          data-magnet
          className="overflow-hidden rounded-[28px] bg-white/6 px-[26px] pt-[26px] max-[900px]:px-6 max-[900px]:pt-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        >
          <div className="mb-2 text-[11.5px] font-semibold tracking-[1px] text-[color:var(--k-ink-faint)] uppercase">
            {t('grid.widgets.label')}
          </div>
          <h3 className="mb-2 text-[17px] font-bold">{t('grid.widgets.h3')}</h3>
          <p className="mb-[18px] text-[13.5px] leading-[1.55] text-white/62">{t('grid.widgets.body')}</p>
          <div className="flex justify-center max-[900px]:max-h-[360px] max-[900px]:overflow-hidden">
            <div className="w-[170px] max-[900px]:w-[min(58vw,230px)] rounded-t-[28px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] px-1.5 pt-1.5 shadow-[0_-2px_40px_rgba(5,8,30,0.5)]">
              <div className="overflow-hidden rounded-t-[23px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-widgets.png"
                  alt="Widget picker: water, sleep, mood, sport goal"
                  width={589}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          data-r
          data-from="right"
          data-d="2"
          data-magnet
          className="rounded-[28px] bg-[linear-gradient(170deg,#C6D6FD_0%,#8FAEF8_55%,#5A7DF5_100%)] p-[26px] max-[900px]:p-6 text-[#12102C] shadow-[0_18px_40px_rgba(27,74,226,0.3)]"
        >
          <div className="mb-[14px] text-[11.5px] font-semibold tracking-[1px] text-[#12102C]/60 uppercase">
            {t('grid.recovery.label')}
          </div>
          <div className="k7-serif text-[52px] leading-none font-bold">
            <span data-count="7.5" data-decimals="1">
              7.5
            </span>{' '}
            {t('grid.recovery.unit')}
          </div>
          <div className="mt-2 text-[13.5px] leading-[1.5] text-[#12102C]/72">{t('grid.recovery.body')}</div>
        </div>

        <div
          data-r
          data-from="left"
          data-magnet
          className="overflow-hidden rounded-[28px] bg-white/6 px-[26px] pt-[26px] max-[900px]:px-6 max-[900px]:pt-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        >
          <div className="mb-2 text-[11.5px] font-semibold tracking-[1px] text-[color:var(--k-ink-faint)] uppercase">
            {t('grid.gymScan.label')}
          </div>
          <h3 className="mb-2 text-[17px] font-bold">{t('grid.gymScan.h3')}</h3>
          <p className="mb-[18px] text-[13.5px] leading-[1.55] text-white/62">{t('grid.gymScan.body')}</p>
          <div className="flex justify-center max-[900px]:max-h-[360px] max-[900px]:overflow-hidden">
            <div className="w-[170px] max-[900px]:w-[min(58vw,230px)] rounded-t-[28px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] px-1.5 pt-1.5 shadow-[0_-2px_40px_rgba(5,8,30,0.5)]">
              <div className="overflow-hidden rounded-t-[23px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-gymscan.png"
                  alt="Session rebuilt from the equipment in the room"
                  width={600}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          data-r
          data-from="up"
          data-d="1"
          data-magnet
          className="col-span-2 rounded-[28px] bg-white/6 p-[30px] max-[900px]:p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        >
          <div className="grid grid-cols-[168px_1fr] items-center gap-6 max-[1240px]:grid-cols-1">
            <div className="rounded-[28px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] p-1.5 shadow-[0_20px_40px_rgba(5,8,30,0.55)] max-[1240px]:mx-auto max-[1240px]:max-w-[168px]">
              <div className="overflow-hidden rounded-[23px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-compare.png"
                  alt="Goal photo against current photo"
                  width={600}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div>
              <div className="mb-3 text-[11.5px] font-semibold tracking-[1px] text-[color:var(--k-accent)] uppercase">
                {t('grid.proof.label')}
              </div>
              <h3 className="k7-serif mb-2.5 text-[28px] leading-[1.1] font-bold">{t('grid.proof.h3')}</h3>
              <p className="text-[14.5px] leading-[1.6] text-[color:var(--k-ink-soft)]">{t('grid.proof.body')}</p>
            </div>
          </div>
        </div>

        <div
          data-r
          data-from="right"
          data-d="2"
          data-magnet
          className="col-span-2 flex flex-col justify-between gap-4 rounded-[28px] bg-white/6 p-[30px] max-[900px]:p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        >
          <div className="text-[11.5px] font-semibold tracking-[1px] text-[color:var(--k-ink-faint)] uppercase">
            {t('grid.affirmation.label')}
          </div>
          <div className="k7-serif text-[22px] leading-[1.18] font-bold italic">{t('grid.affirmation.quote')}</div>
          <div className="flex items-center gap-2.5 text-[12.5px] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--k-accent)]" />
            {t('grid.affirmation.caption')}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
