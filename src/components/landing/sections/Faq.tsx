import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

/** Single source for the FAQ — page.tsx builds the FAQPage JSON-LD from this. */
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
  {
    q: 'What does SOMA cost?',
    a: 'Membership starts from $99/month at launch — priced against the $30–90/month people already spend across device apps, plus $200–600/month for separate coaches. Credits cover on-demand depth like audits and doctor-visit summaries.',
  },
];

export const Faq = () => (
  <section id="faq" className="border-t border-[var(--ld-line)] bg-[var(--ld-surface)] py-24">
    <Container className="flex flex-col items-center">
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <Eyebrow>questions</Eyebrow>
        <h2 className="ld-serif text-4xl leading-tight font-medium">Asked before you had to</h2>
      </Reveal>
      <Reveal delay={100} className="mt-12 w-full max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, i) => (
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
