import type { Locale } from '@/i18n/routing';
import type { PrivacyContent, TermsContent } from './types';

/** Falls back to English for any locale whose legal content hasn't landed yet. */
export async function getPrivacyContent(locale: Locale): Promise<PrivacyContent> {
  try {
    return (await import(`./${locale}/privacy`)).privacy;
  } catch {
    return (await import('./en/privacy')).privacy;
  }
}

export async function getTermsContent(locale: Locale): Promise<TermsContent> {
  try {
    return (await import(`./${locale}/terms`)).terms;
  } catch {
    return (await import('./en/terms')).terms;
  }
}
