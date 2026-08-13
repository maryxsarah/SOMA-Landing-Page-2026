import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';
import { WaitlistForm } from '../WaitlistForm';

/**
 * Final full-width band. In waitlist mode this replaces the ReadyBand — the
 * hero CTA anchor `#waitlist` lands here. The offer is the lead magnet: the
 * guide IS the waitlist (one opt-in, no competing "join waitlist" CTA).
 */
export const WaitlistBand = () => {
  const t = useTranslations('waitlistBand');
  return (
    <section id="waitlist" className="border-t border-[var(--ld-line)] py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal className="flex w-full flex-col items-center gap-6">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 className="ld-serif text-4xl font-medium">
          {t.rich('h2', { em: (chunks) => <em className="italic">{chunks}</em> })}
        </h2>
        <p className="max-w-xl text-[color:var(--ld-text-2)]">{t('lead')}</p>
        <WaitlistForm className="items-center" />
        </Reveal>
      </Container>
    </section>
  );
};
