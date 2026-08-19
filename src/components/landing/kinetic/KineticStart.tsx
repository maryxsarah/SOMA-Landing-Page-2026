import { useTranslations } from 'next-intl';
import { LocalImage } from '@/components/LocalImage';
import { CTA_HREF } from '@/lib/launch';
import { CtaButton } from '../CtaButton';
import { WaitlistForm } from '../WaitlistForm';
import { KINETIC_TRIAL_DAYS } from './constants';

const DEVICE_ICONS = [
  { key: 'health', img: 'dev-health', dims: [699, 699], size: 34 },
  { key: 'watch', img: 'dev-watch', dims: [654, 554], size: 36 },
  { key: 'oura', img: 'dev-oura', dims: [405, 350], size: 34 },
  { key: 'whoop', img: 'dev-whoop', dims: [359, 405], size: 36 },
] as const;

const TRACKER_PILLS = ['Garmin', 'Fitbit', 'Polar', 'Samsung Health', 'Withings', 'Strava'];

type Stat = { value: string; suffix: string; caption: string };

export const KineticStart = () => {
  const t = useTranslations('kinetic');
  const stats = t.raw('start.stats') as Stat[];

  return (
    <section id="start" className="relative mx-auto max-w-[1280px] scroll-mt-24 px-10 pt-[70px]">
      <div
        data-r
        data-from="scale"
        className="rounded-[36px] bg-[linear-gradient(165deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_100%)] p-[52px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_26px_60px_rgba(5,8,30,0.5)]"
      >
        <div className="grid grid-cols-[1.05fr_0.95fr] items-center gap-[52px]">
          <div>
            <h2 className="k7-serif mb-4 text-[48px] leading-[1.04] font-bold">{t('start.h2')}</h2>
            <p className="mb-[26px] max-w-[450px] text-[16.5px] leading-[1.6] text-[color:var(--k-ink-soft)]">
              {t('start.priceLine', { days: KINETIC_TRIAL_DAYS })}
            </p>
            <div id="waitlist" className="scroll-mt-24 rounded-[20px] bg-[var(--ld-surface)] p-6 shadow-[0_20px_50px_rgba(5,8,30,0.4)]">
              <div className="ld-theme">
                <WaitlistForm />
              </div>
            </div>
            <div className="mt-[26px] flex items-center gap-[22px]">
              <CtaButton href={CTA_HREF} variant="badge">
                <LocalImage
                  src="/assets/kinetic/site/appstore-badge.png"
                  alt="Download on the App Store"
                  width={1200}
                  height={357}
                  className="h-[50px] w-auto"
                />
              </CtaButton>
              <LocalImage
                src="/assets/kinetic/site/laurel-apple-nostars.png"
                alt="Available on Apple App Store, 2026"
                width={700}
                height={382}
                className="h-[78px] w-auto brightness-0 invert opacity-82"
              />
            </div>
          </div>
          <div>
            <div className="mb-[14px] grid max-w-[320px] grid-cols-4 gap-2.5">
              {DEVICE_ICONS.map((d) => (
                <div key={d.key} className="flex flex-col items-center gap-2.5">
                  <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[20px] bg-white/8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                    <LocalImage
                      src={`/assets/kinetic/site/${d.img}.png`}
                      alt={t(`start.devices.${d.key}`)}
                      width={d.dims[0]}
                      height={d.dims[1]}
                      style={{ width: d.size, height: d.size }}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px] text-white/60">{t(`start.devices.${d.key}`)}</span>
                </div>
              ))}
            </div>
            <div className="mb-7 flex flex-wrap gap-2">
              {TRACKER_PILLS.map((tracker) => (
                <span
                  key={tracker}
                  className="rounded-full bg-white/7 px-[13px] py-[7px] text-[12.5px] font-medium text-white/72 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.13)]"
                >
                  {tracker}
                </span>
              ))}
              <span className="rounded-full bg-[rgba(122,162,255,0.14)] px-[13px] py-[7px] text-[12.5px] font-medium text-[color:var(--k-accent-soft)] shadow-[inset_0_0_0_1px_rgba(143,174,248,0.26)]">
                {t('start.trackersMore')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div key={stat.caption}>
                  <div className="k7-serif text-[28px] leading-none font-bold text-[color:var(--k-accent-soft)]">
                    <span data-count={stat.value} data-suffix={stat.suffix}>
                      {stat.value}
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="mt-[7px] text-[12.5px] leading-[1.45] text-white/56">{stat.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
