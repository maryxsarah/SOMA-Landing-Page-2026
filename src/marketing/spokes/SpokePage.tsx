import { useLocale, useTranslations } from 'next-intl';
import { localizedPath } from '@/i18n/routing';
import { BASE_URL, BRAND, PARENT_URL } from '@/lib/seo/constants';
import {
  breadcrumbList,
  faqPage,
  howTo,
  itemList,
  jsonLdString,
  softwareApplicationRef,
  webPage,
} from '@/lib/seo/jsonLd';
import { CtaButton } from '@/components/landing/CtaButton';
import { Container } from '@/components/landing/Container';
import { Eyebrow } from '@/components/landing/Eyebrow';
import { Footer } from '@/components/landing/Footer';
import { StickyNav } from '@/components/landing/StickyNav';
import { resolveFaq, spokePath } from './registry';
import type { SpokeDef } from './types';

/** One renderer for all spoke archetypes, built on the landing DS. */
export const SpokePage: React.FC<{ spoke: SpokeDef }> = ({ spoke }) => {
  const t = useTranslations('spoke');
  const locale = useLocale();
  const path = localizedPath(locale, spokePath(spoke));
  const url = `${BASE_URL}${path}`;
  const faqs = spoke.faq.map(resolveFaq);

  const ld: object[] = [
    softwareApplicationRef(),
    webPage({ url: path, name: spoke.hero.h1, locale }),
    breadcrumbList([
      { name: BRAND.parentName, url: PARENT_URL },
      { name: BRAND.productShort, url: BASE_URL },
      { name: spoke.navLabel ?? spoke.subject, url },
    ]),
  ];
  if (spoke.howToSteps?.length) {
    ld.push(howTo({ name: spoke.hero.h1, steps: spoke.howToSteps }));
  }
  if (spoke.comparison) {
    ld.push(
      itemList([
        { name: spoke.comparison.competitor, url },
        { name: BRAND.productShort, url: BASE_URL },
      ]),
    );
  }
  if (faqs.length) {
    ld.push(faqPage(faqs));
  }

  return (
    <div className="ld-theme min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      {/* Nav lives OUTSIDE the zoomed <main> — sticky drifts inside CSS zoom. */}
      <StickyNav />
      <main className="ld">

      <Container className="py-24">
        <Eyebrow>{spoke.hero.eyebrow}</Eyebrow>
        <h1 className="ld-serif mt-4 max-w-4xl text-5xl leading-tight">{spoke.hero.h1}</h1>
        <p data-speakable className="mt-6 max-w-2xl text-lg text-[color:var(--ld-text-2)]">
          {spoke.hero.lead}
        </p>
        <div className="mt-8">
          <CtaButton href={spoke.hero.cta.href} arrow>
            {spoke.hero.cta.label}
          </CtaButton>
        </div>
      </Container>

      {spoke.howToSteps && spoke.howToSteps.length > 0 && (
        <Container className="pb-16">
          <ol className="max-w-3xl list-decimal space-y-6 pl-6">
            {spoke.howToSteps.map((step) => (
              <li key={step.name}>
                <h2 className="text-xl font-semibold">{step.name}</h2>
                <p className="mt-1 text-[color:var(--ld-text-2)]">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      )}

      {spoke.comparison && (
        <Container className="pb-16">
          <h2 className="ld-serif mb-6 text-3xl">{t('atAGlance')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl text-left text-[color:var(--ld-text-2)]">
              <thead>
                <tr className="border-b border-[var(--ld-line-strong)] text-[color:var(--ld-ink)]">
                  <th className="py-3 pr-6" />
                  <th className="py-3 pr-6">{spoke.comparison.competitor}</th>
                  <th className="py-3">{BRAND.productShort}</th>
                </tr>
              </thead>
              <tbody>
                {spoke.comparison.rows.map((row) => (
                  <tr key={row.dim} className="border-b border-[var(--ld-line)]">
                    <td className="py-3 pr-6 font-medium text-[color:var(--ld-ink)]">{row.dim}</td>
                    <td className="py-3 pr-6">{row.them}</td>
                    <td className="py-3">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      )}

      {spoke.sections.map((section) => (
        <Container key={section.title} className="pb-16">
          <section>
            <h2 className="ld-serif mb-4 text-3xl">{section.title}</h2>
            {section.body.map((p) => (
              <p key={p} className="mb-4 max-w-3xl text-[color:var(--ld-text-2)]">
                {p}
              </p>
            ))}
            {section.pills && section.pills.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {section.pills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full border border-[var(--ld-line-strong)] bg-[var(--ld-surface)] px-4 py-1 text-sm text-[color:var(--ld-text-2)]"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </Container>
      ))}

      {faqs.length > 0 && (
        <Container className="pb-24">
          <h2 className="ld-serif mb-6 text-3xl">{t('faqTitle')}</h2>
          <div className="max-w-3xl space-y-3">
            {faqs.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="rounded-lg border border-[var(--ld-line)] bg-[var(--ld-surface)] p-4"
              >
                <summary className="cursor-pointer font-medium">{item.q}</summary>
                <p className="mt-3 text-[color:var(--ld-text-2)]">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      )}

        <Footer />
      </main>
    </div>
  );
};
