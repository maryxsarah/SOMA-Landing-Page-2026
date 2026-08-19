import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocalImage } from '@/components/LocalImage';
import { CTA_HREF } from '@/lib/launch';
import { CtaButton } from '../CtaButton';
import { KINETIC_TRIAL_DAYS } from './constants';

const NAV_LINKS = [
  { key: 'inside', href: '#grid' },
  { key: 'food', href: '#food' },
  { key: 'pricing', href: '#start' },
] as const;

const DEVICE_CHIPS = [
  { key: 'appleHealth', img: 'dev-health', top: 88, offset: -472, rot: -8, drift: 'k7Drift', dur: '9s', px: '0.16' },
  { key: 'oura', img: 'dev-oura', top: 286, offset: -408, rot: 6, drift: 'k7DriftB', dur: '11s', px: '0.24' },
  { key: 'appleWatch', img: 'dev-watch', top: 110, offset: 342, rot: 7, drift: 'k7Drift', dur: '10s', px: '0.2' },
  { key: 'whoop', img: 'dev-whoop', top: 300, offset: 376, rot: -6, drift: 'k7DriftB', dur: '12s', px: '0.28' },
] as const;

/**
 * Nav lives here, non-sticky, inline in the hero's gradient backdrop — a
 * deliberate departure from the rest of the site's StickyNav (see
 * landing-zoom-quirks in project memory): this design has no CSS-zoom scale
 * model and the nav is meant to scroll away with the hero, not persist.
 */
export const KineticHero = () => {
  const t = useTranslations('kinetic');

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(130%_78%_at_50%_-8%,#3B2B70_0%,#201A45_42%,#0C0A16_100%)]">
      <div
        data-px="0.05"
        className="pointer-events-none absolute top-[560px] right-[-280px] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(122,162,255,0.16)_0%,rgba(122,162,255,0)_70%)]"
      />
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute top-[13%] left-[10%] h-[3px] w-[3px] animate-[k7Pulse_5s_ease-in-out_infinite] rounded-full bg-white" />
        <span className="absolute top-[25%] left-[24%] h-[2px] w-[2px] animate-[k7Pulse_7s_ease-in-out_infinite] rounded-full bg-white" />
        <span className="absolute top-[8%] right-[17%] h-[2px] w-[2px] animate-[k7Pulse_6s_ease-in-out_infinite] rounded-full bg-white" />
        <span className="absolute top-[33%] right-[8%] h-[3px] w-[3px] animate-[k7Pulse_8s_ease-in-out_infinite] rounded-full bg-white" />
        <span className="absolute top-[46%] left-[5%] h-[2px] w-[2px] animate-[k7Pulse_6.5s_ease-in-out_infinite] rounded-full bg-white" />
      </div>

      <header className="relative z-30 mx-auto max-w-[1280px] px-10 pt-7">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-7">
          <Link href="/" className="flex items-center gap-3.5 justify-self-start">
            <LocalImage
              src="/assets/kinetic/app-icon.png"
              alt=""
              width={60}
              height={60}
              className="h-[46px] w-[46px] rounded-xl"
            />
            <LocalImage
              src="/assets/kinetic/site/logo-wordmark.png"
              alt="Soma"
              width={900}
              height={227}
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>
          <nav className="flex items-center gap-[30px] text-[17px] font-medium whitespace-nowrap">
            {NAV_LINKS.map((link) => (
              <Link key={link.key} href={link.href} className="text-white/82 hover:text-white">
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 justify-self-end">
            <LocalImage
              src="/assets/kinetic/site/laurel-apple-nostars.png"
              alt="Available on Apple App Store, 2026"
              width={700}
              height={382}
              className="h-[44px] w-auto brightness-0 invert opacity-80"
            />
            <CtaButton href={CTA_HREF} variant="badge">
              <LocalImage
                src="/assets/kinetic/site/appstore-badge.png"
                alt="Download on the App Store"
                width={600}
                height={178}
                className="h-[42px] w-auto"
              />
            </CtaButton>
          </div>
        </div>
      </header>

      <section id="top" className="relative mx-auto max-w-[1280px] px-10 pt-11 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[470px]">
          {DEVICE_CHIPS.map((chip) => (
            <div
              key={chip.key}
              data-px={chip.px}
              className="absolute left-1/2"
              style={{ top: chip.top, marginLeft: chip.offset, '--rot': `${chip.rot}deg` } as React.CSSProperties}
            >
              <div
                className="flex items-center gap-[9px] rounded-[18px] bg-white/8 py-2.5 pr-[15px] pl-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16),0_14px_30px_rgba(5,8,30,0.4)] backdrop-blur-[10px]"
                style={{
                  animationName: chip.drift,
                  animationDuration: chip.dur,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              >
                <LocalImage
                  src={`/assets/kinetic/site/${chip.img}.png`}
                  alt=""
                  width={64}
                  height={64}
                  className="h-[26px] w-[26px] object-contain"
                />
                <span className="text-[12.5px] font-semibold text-white/86">{t(`hero.devices.${chip.key}`)}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          data-r
          data-from="up"
          className="relative z-20 mb-[26px] inline-flex h-8 items-center gap-[9px] rounded-full bg-[rgba(122,162,255,0.14)] px-[15px] text-[11.5px] font-semibold tracking-[0.7px] text-[color:var(--k-accent-soft)] uppercase shadow-[inset_0_0_0_1px_rgba(143,174,248,0.24)]"
        >
          <span className="h-[6px] w-[6px] rounded-full bg-[color:var(--k-accent)] shadow-[0_0_8px_#8FAEF8]" />
          {t('hero.badge')}
        </div>
        <h1
          data-r
          data-from="up"
          data-d="1"
          className="k7-serif relative z-20 mx-auto mb-[22px] max-w-[900px] text-[78px] leading-[0.98] font-bold tracking-[-2.4px]"
        >
          <span className="block">{t('hero.h1Line1')}</span>
          <span className="block text-[color:var(--k-accent-soft)] italic">{t('hero.h1Line2')}</span>
        </h1>
        <p
          data-r
          data-from="up"
          data-d="2"
          className="relative z-20 mx-auto mb-8 max-w-[580px] text-[18.5px] leading-[1.55] text-[color:var(--k-ink-soft)]"
        >
          {t('hero.lead')}
        </p>
        <div data-r data-from="up" data-d="3" className="relative z-20 flex flex-wrap items-center justify-center gap-[18px]">
          <CtaButton href={CTA_HREF} variant="badge">
            <LocalImage
              src="/assets/kinetic/site/appstore-badge.png"
              alt="Download on the App Store"
              width={600}
              height={178}
              className="h-14 w-auto drop-shadow-[0_14px_30px_rgba(5,8,30,0.6)]"
            />
          </CtaButton>
          <span className="flex h-14 items-center gap-2.5 rounded-full bg-[rgba(122,162,255,0.16)] px-[22px] text-[16px] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(143,174,248,0.3)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[color:var(--k-mint)] shadow-[0_0_8px_#8FD3B4]" />
            {t('hero.trialLine', { days: KINETIC_TRIAL_DAYS })}
          </span>
        </div>

        <div className="relative mt-9 h-[600px]">
          <div
            data-px="0.12"
            className="absolute top-[70px] left-1/2 w-[164px] -ml-[560px] animate-[k7Drift_10s_ease-in-out_infinite]"
            style={{ '--rot': '-9deg' } as React.CSSProperties}
          >
            <div className="overflow-hidden rounded-[20px] shadow-[0_20px_42px_rgba(5,8,30,0.55),0_0_0_5px_rgba(255,255,255,0.94)]">
              <LocalImage
                src="/assets/kinetic/site/her-mirror2.png"
                alt=""
                width={444}
                height={800}
                className="h-[206px] w-full object-cover object-[50%_16%]"
              />
            </div>
          </div>
          <div
            data-px="0.18"
            className="absolute top-[352px] left-1/2 w-[132px] -ml-[500px] animate-[k7DriftB_12s_ease-in-out_infinite]"
            style={{ '--rot': '6deg' } as React.CSSProperties}
          >
            <LocalImage
              src="/assets/kinetic/site/food-bowl.png"
              alt=""
              width={580}
              height={600}
              className="h-auto w-full drop-shadow-[0_18px_32px_rgba(5,8,30,0.5)]"
            />
          </div>
          <div
            data-px="0.1"
            className="absolute top-[56px] left-1/2 w-[172px] ml-[392px] animate-[k7Drift_11s_ease-in-out_infinite]"
            style={{ '--rot': '8deg' } as React.CSSProperties}
          >
            <div className="overflow-hidden rounded-[20px] shadow-[0_20px_42px_rgba(5,8,30,0.55),0_0_0_5px_rgba(255,255,255,0.94)]">
              <LocalImage
                src="/assets/kinetic/site/life-hike.png"
                alt=""
                width={433}
                height={800}
                className="h-[212px] w-full object-cover"
              />
            </div>
          </div>
          <div
            data-px="0.2"
            className="absolute top-[340px] left-1/2 w-[118px] ml-[432px] animate-[k7DriftB_9s_ease-in-out_infinite]"
            style={{ '--rot': '-7deg' } as React.CSSProperties}
          >
            <LocalImage
              src="/assets/kinetic/site/food-berries.png"
              alt=""
              width={571}
              height={600}
              className="h-auto w-full drop-shadow-[0_16px_30px_rgba(5,8,30,0.5)]"
            />
          </div>

          <div className="relative flex items-end justify-center gap-5">
            <div
              className="mb-[34px] w-[206px] animate-[k7Drift_9s_ease-in-out_infinite] rounded-[34px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] p-[7px] shadow-[0_26px_52px_rgba(5,8,30,0.6),inset_0_0_0_1.2px_rgba(255,255,255,0.2)]"
            >
              <div className="overflow-hidden rounded-[28px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-checklist.png"
                  alt="Today's session"
                  width={589}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="relative w-[294px] animate-[k7Drift_7s_ease-in-out_infinite] rounded-[44px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] p-[9px] shadow-[0_38px_74px_rgba(5,8,30,0.7),inset_0_0_0_1.4px_rgba(255,255,255,0.22)]">
              <div className="relative overflow-hidden rounded-[36px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-home.png"
                  alt="Soma home: today's plan and widgets"
                  width={589}
                  height={1280}
                  className="h-auto w-full"
                />
                <span className="absolute top-[-8%] left-0 h-[116%] w-[38%] animate-[k7Sheen_9s_ease-in-out_infinite] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.42)_50%,rgba(255,255,255,0)_100%)]" />
              </div>
            </div>
            <div
              className="mb-[34px] w-[206px] animate-[k7Drift_8s_ease-in-out_infinite] rounded-[34px] bg-[linear-gradient(160deg,#2B2B33,#0E0E14)] p-[7px] shadow-[0_26px_52px_rgba(5,8,30,0.6),inset_0_0_0_1.2px_rgba(255,255,255,0.2)]"
            >
              <div className="overflow-hidden rounded-[28px] bg-[#EDF3FC]">
                <LocalImage
                  src="/assets/kinetic/site/screen-nutrition.png"
                  alt="Nutrition against today's targets"
                  width={589}
                  height={1280}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
