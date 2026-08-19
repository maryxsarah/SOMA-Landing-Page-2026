import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Email confirmed',
  robots: { index: false, follow: false },
};

// Landing target of Supabase's signup-confirmation email
// (redirect_to=https://www.soma4health.com/auth/confirm). By the time the
// browser gets here Supabase has ALREADY verified the token and confirmed
// the account -- on devices with the app installed the universal link
// hands off before this page renders; this static page is the fallback
// for everyone else, replacing the 404 that made users think signup
// failed. No JS needed: the session fragment is consumed by the app path
// only.
export default async function AuthConfirm({
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
      <div aria-hidden style={{ fontSize: '3rem', lineHeight: 1 }}>✓</div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Email confirmed</h1>
      <p style={{ maxWidth: '28rem', opacity: 0.75 }}>
        Your Soma account is ready. Open the Soma app on your phone and log
        in with this email to continue.
      </p>
    </main>
  );
}
