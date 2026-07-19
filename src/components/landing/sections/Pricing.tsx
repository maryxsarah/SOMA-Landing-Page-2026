import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';
import { CtaButton } from '../CtaButton';
import { CTA_HREF } from '@/lib/launch';

/**
 * Pricing preview (waitlist mode: framed as "at launch", CTAs land on the
 * guide opt-in). Anchored against what fragmentation already costs — the
 * one-pager's pricing logic, not the sensor price.
 */
export const Pricing = () => (
  <section id="pricing" className="border-t border-[var(--ld-line)] py-24">
    <Container>
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <Eyebrow>membership</Eyebrow>
        <h2 className="ld-serif max-w-2xl text-4xl leading-tight font-medium">
          Priced against the stack it replaces
        </h2>
        <p className="max-w-2xl text-[color:var(--ld-text-2)]">
          Fragmentation already costs $30–90/month across device apps — plus $200–600/month if you
          add human coaches on top. SOMA replaces the translation layer, not your devices.
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
        <Reveal className="ld-lift flex flex-col rounded-2xl border border-[var(--ld-line)] bg-[var(--ld-surface)] p-8">
          <h3 className="text-lg font-bold">SOMA Membership</h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="ld-serif text-4xl font-medium">$99</span>
            <span className="text-sm text-[color:var(--ld-text-2)]">/month from, at launch</span>
          </div>
          <ul className="mt-6 flex-1 space-y-2 text-[15px] text-[color:var(--ld-text-2)]">
            <li>Daily plan across every connected device</li>
            <li>Chat and voice check-ins</li>
            <li>Proactive outreach when something changes</li>
            <li>Credits for audits and doctor-visit summaries</li>
          </ul>
          <CtaButton href={CTA_HREF} size="sm" variant="outline" className="mt-8 self-start">
            Get early access
          </CtaButton>
        </Reveal>

        <Reveal delay={110} className="ld-lift flex flex-col rounded-2xl bg-[var(--ld-bg-dark)] p-8 text-[color:var(--ld-text-inverse)]">
          <h3 className="text-lg font-bold">Founder Cohort</h3>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="ld-serif text-4xl font-medium">Concierge</span>
          </div>
          <ul className="mt-6 flex-1 space-y-2 text-[15px] text-white/70">
            <li>Hands-on onboarding with the founders</li>
            <li>Premium three-month program</li>
            <li>Direct input into what gets built</li>
            <li>A small number of seats, waitlist first</li>
          </ul>
          <CtaButton href={CTA_HREF} size="sm" variant="outline-light" className="mt-8 self-start">
            Join the waitlist
          </CtaButton>
        </Reveal>
      </div>
    </Container>
  </section>
);
