'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/** Native autonyms, not translated demonyms — every language stays
 * findable regardless of the UI's current language. */
const NATIVE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  ru: 'Русский',
  ka: 'ქართული',
  hy: 'Հայերեն',
  sr: 'Српски',
};

/** One row of language links — same component works on every route since
 * slugs are identical across locales (no localized-slugs feature). */
export const LocaleSwitcher = () => {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Language">
      {routing.locales.map((locale) => (
        <li key={locale}>
          {locale === activeLocale ? (
            <span aria-current="true" className="text-sm font-semibold text-[color:var(--ld-ink)]">
              {NATIVE_NAMES[locale]}
            </span>
          ) : (
            <Link
              href={pathname}
              locale={locale}
              className="text-sm text-[color:var(--ld-text-2)] hover:text-[color:var(--ld-ink)]"
            >
              {NATIVE_NAMES[locale]}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
