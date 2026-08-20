import { useTranslations } from 'next-intl';
import { LocalImage } from '@/components/LocalImage';

const MACRO_ROWS = [
  { key: 'calories', bar: '0.3', gradient: 'linear-gradient(90deg,#8FAEF8,#5A7DF5)' },
  { key: 'protein', bar: '0.39', gradient: 'linear-gradient(90deg,#C6D6FD,#8FAEF8)' },
  { key: 'carbsFat', bar: '0.28', gradient: 'linear-gradient(90deg,#8FD3B4,#1E9E6A)' },
] as const;

/** All 27 real product photos, split into the two counter-scrolling strips. */
const STRIP_A = Array.from({ length: 14 }, (_, i) => i + 1);
const STRIP_B = Array.from({ length: 13 }, (_, i) => i + 15);

const PhotoStrip = ({ ids, animationClassName }: { ids: number[]; animationClassName: string }) => (
  <div className={`flex w-max gap-4 ${animationClassName}`}>
    {[0, 1].map((copy) => (
      <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4">
        {ids.map((id) => (
          <div key={`${copy}-${id}`} className="flex h-[266px] w-[150px] shrink-0 items-center justify-center">
            <LocalImage
              src={`/assets/kinetic/carousel/${id}.png`}
              alt=""
              width={1080}
              height={1920}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const KineticFood = () => {
  const t = useTranslations('kinetic');

  return (
    <section id="food" className="relative mt-24 py-20 max-[900px]:mt-16 max-[900px]:px-5 max-[900px]:py-14">
      <div className="mx-auto max-w-[1280px] px-10 max-[900px]:px-0">
        <div className="mb-[52px] grid grid-cols-2 items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div data-r data-from="left">
            <div className="mb-4 text-[11.5px] font-semibold tracking-[1.2px] text-[color:var(--k-ink-faint)] uppercase">
              {t('food.label')}
            </div>
            <h2 className="k7-serif mb-4 text-[46px] leading-[1.04] font-bold max-[900px]:text-[30px]">
              {t('food.h2Line1')}
              <br />
              {t('food.h2Line2')}
            </h2>
            <p className="mb-7 max-w-[440px] text-[16.5px] leading-[1.6] text-[color:var(--k-ink-soft)]">
              {t('food.lead')}
            </p>
            <div className="flex max-w-[420px] flex-col gap-4">
              {MACRO_ROWS.map((row) => (
                <div key={row.key}>
                  <div className="mb-[7px] flex items-baseline justify-between">
                    <span className="text-[13.5px] font-semibold">{t(`food.macros.${row.key}.label`)}</span>
                    <span className="text-[13px] text-white/60">{t(`food.macros.${row.key}.value`)}</span>
                  </div>
                  <div data-bar={row.bar} className="h-[9px] overflow-hidden rounded-full bg-white/12">
                    <i style={{ background: row.gradient }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Food cut-outs sit ON TOP of the phones (z-5) on a diagonal — toast
              top-left, tomatoes bottom-right. Both are placed against a phone's
              blank screen area rather than its UI copy, which is what made the
              earlier on-top attempt cover the ingredient list. */}
          <div data-r data-from="right" data-d="1" className="relative h-[600px] max-[1240px]:flex max-[1240px]:h-auto max-[1240px]:flex-wrap max-[1240px]:items-end max-[1240px]:justify-center max-[1240px]:gap-3.5">
            <div
              data-px="0.06"
              className="max-[1240px]:!static max-[1240px]:!m-0 max-[1240px]:!ml-0 max-[1240px]:!mb-0 max-[1240px]:!w-[46%] max-[1240px]:!max-w-[250px] max-[1240px]:!animate-none absolute top-0 right-[6%] z-[3] w-[242px] animate-[k7Drift_8s_ease-in-out_infinite] rounded-[38px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] p-2 shadow-[0_30px_58px_rgba(5,8,30,0.6)]"
              style={{ '--rot': '3deg' } as React.CSSProperties}
            >
              <div className="overflow-hidden rounded-[31px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-cooking.png"
                  alt="Guided cooking, step by step"
                  width={589}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div
              data-px="0.08"
              className="max-[1240px]:!static max-[1240px]:!m-0 max-[1240px]:!ml-0 max-[1240px]:!mb-0 max-[1240px]:!w-[46%] max-[1240px]:!max-w-[250px] max-[1240px]:!animate-none absolute top-[132px] left-[6px] z-[2] w-[200px] animate-[k7Drift_10s_ease-in-out_infinite] rounded-[32px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] p-[7px] shadow-[0_24px_48px_rgba(5,8,30,0.55)]"
              style={{ '--rot': '-5deg' } as React.CSSProperties}
            >
              <div className="overflow-hidden rounded-[26px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-nutrition.png"
                  alt="Calories and macros logged against today's targets"
                  width={589}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div
              data-px="0.06"
              className="absolute top-[-28px] left-[-34px] z-[5] w-[148px] animate-[k7DriftB_9s_ease-in-out_infinite] max-[900px]:w-[100px] max-[900px]:top-[-12px] max-[900px]:left-[-12px]"
              style={{ '--rot': '-9deg' } as React.CSSProperties}
            >
              <LocalImage
                src="/assets/kinetic/site/food-toast.png"
                alt=""
                width={945}
                height={1200}
                className="h-auto w-full drop-shadow-[0_18px_32px_rgba(5,8,30,0.5)]"
              />
            </div>
            <div
              data-px="0.06"
              className="absolute right-[-58px] bottom-[-40px] z-[5] w-[136px] animate-[k7Drift_12s_ease-in-out_infinite] max-[900px]:w-[92px] max-[900px]:right-[-10px] max-[900px]:bottom-[-12px]"
              style={{ '--rot': '8deg' } as React.CSSProperties}
            >
              <LocalImage
                src="/assets/kinetic/site/food-tomatoes.png"
                alt=""
                width={724}
                height={1200}
                className="h-auto w-full drop-shadow-[0_16px_30px_rgba(5,8,30,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
          <PhotoStrip ids={STRIP_A} animationClassName="animate-[k7Marquee_48s_linear_infinite]" />
          <PhotoStrip ids={STRIP_B} animationClassName="animate-[k7MarqueeRev_56s_linear_infinite]" />
        </div>
      </div>
    </section>
  );
};
