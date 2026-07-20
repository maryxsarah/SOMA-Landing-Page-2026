import type { Metadata } from 'next';
import { BASE_URL, BRAND } from '@/lib/seo/constants';
import { LegalPage } from '@/components/landing/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms for using the ${BRAND.productFull} website and waitlist.`,
  alternates: { canonical: `${BASE_URL}/terms` },
};

// TODO(brand): basic placeholder — have legal counsel review before launch.
export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="July 21, 2026">
      <p>
        By using this website or joining the {BRAND.productFull} waitlist, you agree to these
        terms. {BRAND.productFull} is currently pre-launch — the product described on this site
        is not yet publicly available.
      </p>

      <h2>The waitlist</h2>
      <p>
        Joining the waitlist is free and creates no purchase obligation. We&rsquo;ll email you the
        Reset Guide and occasional updates; you can unsubscribe at any time.
      </p>

      <h2>Not a medical device</h2>
      <p>
        {BRAND.productFull} is a general-wellness tool. It does not diagnose, treat, or replace
        advice from a qualified clinician. Talk to your doctor for medical questions.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site — text, graphics, and branding — belongs to{' '}
        {BRAND.parentName} unless otherwise noted, and may not be reused without permission.
      </p>

      <h2>No warranty</h2>
      <p>
        This site and any information on it are provided &ldquo;as is&rdquo;, without warranty of
        any kind, to the fullest extent permitted by law.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the product evolves. We&rsquo;ll update the date above when
        we do.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:team@soma4health.com">team@soma4health.com</a>
      </p>
    </LegalPage>
  );
}
