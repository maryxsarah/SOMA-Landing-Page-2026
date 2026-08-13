import { useTranslations } from 'next-intl';
import { LAUNCH_MODE } from './launch';

/**
 * In waitlist mode never say "Start free" for a product that can't be
 * started. Locale-aware (messages/{locale}.json `common.ctaLabel*`) — call
 * from a Server or Client Component, same as `useTranslations` itself.
 * Split out of `launch.ts` so that file (imported by plain data modules
 * like `registry.ts`, in turn imported by Jest-run tests) never pulls in
 * next-intl transitively.
 */
export function useCtaLabel(): string {
  const t = useTranslations('common');
  return LAUNCH_MODE === 'live' ? t('ctaLabelLive') : t('ctaLabelWaitlist');
}
