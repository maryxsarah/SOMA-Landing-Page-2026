import type { Metadata } from 'next';
import { BASE_URL, BRAND } from '@/lib/seo/constants';
import { LegalPage } from '@/components/landing/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${BRAND.productFull} collects, uses, and protects your data.`,
  alternates: { canonical: `${BASE_URL}/privacy` },
};

// TODO(brand): basic placeholder — have legal counsel review before launch.
export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="July 21, 2026">
      <p>
        {BRAND.productFull} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is currently pre-launch and
        collecting waitlist signups. This policy explains what we collect and why.
      </p>

      <h2>What we collect</h2>
      <p>
        When you join the waitlist, we collect the email address you provide. We use{' '}
        <a href="https://kit.com" target="_blank" rel="noopener noreferrer">
          Kit
        </a>{' '}
        (ConvertKit) as our email service provider — Kit stores and processes your email on our
        behalf under its own privacy policy. We also collect standard analytics data (pages
        viewed, referring campaign) via PostHog and Google Analytics when those are enabled.
      </p>

      <h2>How we use it</h2>
      <p>
        Your email is used to send the Reset Guide you sign up for and occasional launch updates.
        Analytics data is used in aggregate to understand which pages and campaigns work — it is
        not used to identify you personally.
      </p>

      <h2>Cookies</h2>
      <p>
        Analytics cookies are only set once you&rsquo;ve given consent. We don&rsquo;t use
        advertising or tracking cookies.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to remove your email from our list at any time by emailing us — see
        Contact below — or by using the unsubscribe link in any email we send.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as the product evolves. We&rsquo;ll update the date above when
        we do.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href="mailto:team@soma4health.com">team@soma4health.com</a>
      </p>
    </LegalPage>
  );
}
