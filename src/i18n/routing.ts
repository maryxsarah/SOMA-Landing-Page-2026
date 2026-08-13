import { defineRouting } from 'next-intl/routing';

/**
 * English stays unprefixed (`as-needed`) so today's already-indexed URLs
 * (`/features/x`) don't change; the other 8 locales get a `/xx/` prefix.
 */
export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'it', 'de', 'ru', 'ka', 'hy', 'sr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

/** Locale-prefixed path, `as-needed`-aware: `en` never gets a prefix, and
 * the root path becomes `/xx` (never `/xx/`, which isn't a real route). */
export function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}
