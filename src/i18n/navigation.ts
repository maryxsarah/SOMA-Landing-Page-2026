import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware Link/usePathname/etc — usePathname() returns the
 * locale-stripped path, and Link adds the correct prefix (or none, for
 * `en`) underneath. Use these instead of `next/link`/`next/navigation` for
 * any internal link.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
