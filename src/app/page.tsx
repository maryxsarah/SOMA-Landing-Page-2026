import { pageMetadata } from '@/lib/seo/metadata';
import {
  faqPage,
  jsonLdString,
  organization,
  softwareApplication,
  webPage,
  webSite,
} from '@/lib/seo/jsonLd';
import { LandingPage } from '@/components/landing/LandingPage';
import { FAQ_ITEMS } from '@/components/landing/sections/Faq';

export const metadata = pageMetadata({
  archetype: 'hub',
  description:
    'SOMA is a vendor-independent AI health agent. It reads your ring, band, scale and CGM together and answers with one plan for today — not four dashboards.',
  path: '/',
});

export default function Home() {
  const ld = [
    organization(),
    webSite(),
    // TODO(brand): add offers once public pricing is final.
    softwareApplication({
      featureList: [
        'One daily plan reasoned across every connected wearable',
        'Works with rings, bands, smart scales and CGMs',
        'Chat or voice check-ins — type it or say it',
        'Proactive outreach when something changes enough to matter',
      ],
    }),
    webPage({ url: '/' }),
    faqPage(FAQ_ITEMS),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }} />
      <LandingPage />
    </>
  );
}
