import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { cn } from '@/lib/cn';
import { BASE_URL } from '@/lib/seo/constants';
import { routing, localizedPath } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { LocalImage } from '@/components/LocalImage';
import { CTA_HREF_OFF_LANDING, LAUNCH_MODE } from '@/lib/launch';
import { Footer } from '@/components/landing/Footer';
import { CtaButton } from '@/components/landing/CtaButton';
import { SupportForm } from '@/components/landing/SupportForm';
import { kineticFontVariables } from '@/components/landing/kinetic/fonts';
import { KineticEffects } from '@/components/landing/kinetic/KineticEffects';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'support' });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}${localizedPath(l, '/support')}`]),
  );
  languages['x-default'] = `${BASE_URL}/support`;
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: `${BASE_URL}${localizedPath(locale, '/support')}`, languages },
  };
}

/**
 * Dark "Kinetic v7" treatment, matching the homepage (KineticHero/KineticStart)
 * rather than the light legal-page template — a compact standalone hero
 * (logo + waitlist CTA, no homepage-only nav anchors) over the same gradient
 * backdrop, with the form riding in the light `.ld-theme` card KineticStart
 * already uses for WaitlistForm. Footer stays outside `.ld-kinetic`, light,
 * same as every other page (see LandingPage.tsx).
 */
export default async function Support({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('support');
  // useCtaLabel() wraps useTranslations, which next-intl forbids calling
  // inside an async Server Component (see LegalPage.tsx for the sync-child
  // workaround used elsewhere) — resolve the same key server-side instead.
  const tc = await getTranslations('common');
  const ctaLabel = LAUNCH_MODE === 'live' ? tc('ctaLabelLive') : tc('ctaLabelWaitlist');

  return (
    <div className="ld-theme min-h-screen">
      <div className={cn('ld-kinetic relative overflow-hidden bg-[color:var(--k-bg)]', kineticFontVariables)}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_60%_at_50%_-10%,#3B2B70_0%,#201A45_42%,#0C0A16_100%)]" />

        <header className="relative z-10 mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-10 pt-7 max-[900px]:px-5">
          <Link href="/" className="flex shrink-0 items-center gap-3.5">
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
              className="h-7 w-auto shrink-0 brightness-0 invert"
            />
          </Link>
          <CtaButton href={CTA_HREF_OFF_LANDING} label="support-header-cta" variant="outline-light" size="sm">
            {ctaLabel}
          </CtaButton>
        </header>

        <section className="relative z-10 mx-auto max-w-[720px] px-10 pt-20 pb-28 max-[900px]:px-5 max-[900px]:pt-12 max-[900px]:pb-16">
          <div data-r data-from="up" className="mb-10 text-center">
            <h1 className="k7-serif mb-4 text-[48px] leading-[1.05] font-bold max-[900px]:text-[32px]">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-[480px] text-[16.5px] leading-[1.6] text-[color:var(--k-ink-soft)]">
              {t('intro')}
            </p>
          </div>

          <div
            data-r
            data-from="scale"
            data-d="1"
            className="rounded-[20px] bg-[var(--ld-surface)] p-6 shadow-[0_20px_50px_rgba(5,8,30,0.4)] max-[900px]:p-5"
          >
            <div className="ld-theme">
              <SupportForm />
            </div>
          </div>

          <p data-r data-from="up" data-d="2" className="mt-6 text-center text-[13px] text-white/50">
            {t('directEmail')}{' '}
            <a href="mailto:team@soma4health.com" className="underline underline-offset-2 !text-white/70 hover:!text-white">
              team@soma4health.com
            </a>
          </p>
        </section>

        <KineticEffects />
      </div>
      <Footer />
    </div>
  );
}
