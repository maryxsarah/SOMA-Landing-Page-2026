import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

/** Single source for the FAQ (English) — page.tsx builds the FAQPage JSON-LD
 * from this; translated FAQ text comes from messages/{locale}.json `faq.items`
 * via useFaqItems() below, keyed by the same index. */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'Which devices does SOMA work with?',
    a: 'Rings, bands, smart scales and CGMs — connected through official APIs, with Apple Health as a hub, plus a manual/CSV fallback. SOMA is vendor-independent: it works with the devices you own now and whatever you switch to next.',
  },
  {
    q: 'Do I need to buy new hardware?',
    a: 'No. SOMA reads the wearables and data you already have. Nothing in it requires a new device, a new app subscription, or a new purchase — the whole point is making what you own finally talk to each other.',
  },
  {
    q: 'Is SOMA a medical device?',
    a: 'No. SOMA is a general-wellness tool: it helps you read your own data and plan your day. It does not diagnose, treat, or replace advice from a clinician — for medical questions, talk to your doctor.',
  },
  {
    q: 'What happens after I join the waitlist?',
    a: 'You get The Data-Backed Reset Guide in your inbox right away — six field notes on reading your wearable data. After that, an occasional field note and launch updates. Waitlist members get access before anyone else.',
  },
  {
    q: 'What is the Founder Cohort?',
    a: 'A small concierge tier for the first users: hands-on onboarding with the founders, a premium three-month program, and direct input into what gets built. Seats are limited and offered to the waitlist first.',
  },
];

/** Shared by both the sync (`useFaqItems`) and async (`getFaqItems`) variants
 * below — `t` is whichever translate function the caller's component type
 * requires (next-intl forbids the sync `useTranslations` hook inside an
 * `async` component). */
function buildFaqItems(t: (key: string) => string): { q: string; a: string }[] {
  return FAQ_ITEMS.map((_, i) => ({ q: t(`items.${i}.q`), a: t(`items.${i}.a`) }));
}

/** Locale-aware FAQ items, same order/count as FAQ_ITEMS (English source).
 * Only call from a non-`async` component — see `getFaqItems` for `async` ones. */
export function useFaqItems(): { q: string; a: string }[] {
  const t = useTranslations('faq');
  return buildFaqItems(t);
}

/** Same as `useFaqItems`, for `async` Server Components (e.g. a page's
 * default export with `generateStaticParams`), which can't use the sync hook. */
export async function getFaqItems(locale: string): Promise<{ q: string; a: string }[]> {
  const t = await getTranslations({ locale, namespace: 'faq' });
  return buildFaqItems(t);
}

export const Faq = () => {
  const t = useTranslations('faq');
  const items = useFaqItems();
  return (
    <section id="faq" className="border-t border-[var(--ld-line)] bg-[var(--ld-surface)] py-24">
      <Container className="flex flex-col items-center">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="ld-serif text-4xl leading-tight font-medium">{t('h2')}</h2>
        </Reveal>
        <Reveal delay={100} className="mt-12 w-full max-w-3xl space-y-3">
          {items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="rounded-2xl border border-[var(--ld-line)] bg-[var(--ld-bg)] p-5"
            >
              <summary className="cursor-pointer font-bold">{item.q}</summary>
              <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--ld-text-2)]">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
};
