import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { Eyebrow } from '../Eyebrow';
import { Reveal } from '../Reveal';

/**
 * Founder note — the warm band in the cold/warm rhythm from the reference
 * board (stone background, terracotta accent). Condensed from the Reset
 * Guide's "a quick note from me" in Sarah-Maria's own words.
 */
export const FounderNote = () => {
  const t = useTranslations('founderNote');
  return (
    <section className="border-t border-[var(--ld-line)] bg-[#f7f3ec] py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <blockquote className="ld-serif max-w-3xl text-2xl leading-relaxed font-medium md:text-3xl">
          {t.rich('quote', { em: (chunks) => <em className="italic">{chunks}</em> })}
        </blockquote>
        <div>
          <p className="font-bold">{t('name')}</p>
          <p className="text-sm text-[color:var(--ld-text-2)]">{t('title')}</p>
        </div>
        <p className="text-sm text-[color:var(--ld-terracotta)]">{t('tagline')}</p>
        </Reveal>
      </Container>
    </section>
  );
};
