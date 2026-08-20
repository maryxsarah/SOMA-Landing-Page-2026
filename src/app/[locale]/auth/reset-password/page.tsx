import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Reset your password',
  robots: { index: false, follow: false },
};

// Landing target of Supabase's password-recovery email
// (redirect_to=https://www.soma4health.com/auth/reset-password), and the
// second entry in public/.well-known/apple-app-site-association. On a
// device with the app installed the universal link hands off before this
// page renders and the app shows the real "set a new password" form; this
// static page is the fallback for everyone else (desktop, app not
// installed), and exists so the deep link never lands on a 404 -- the same
// regression /auth/confirm was added to fix.
//
// The recovery token rides in the URL *fragment*, which browsers never send
// to the server, so nothing sensitive reaches this component. Setting a new
// password is app-only by design; there is no web form to leak into.
export default async function AuthResetPassword({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <div aria-hidden style={{ fontSize: '3rem', lineHeight: 1 }}>&#8635;</div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Reset your password</h1>
      <p style={{ maxWidth: '28rem', opacity: 0.75 }}>
        Open this link on the iPhone where Soma is installed and the app will
        take you straight to setting a new password. The link expires after a
        short while — if it has, request a new one from the app.
      </p>
    </main>
  );
}
