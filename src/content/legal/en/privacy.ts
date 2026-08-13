import type { PrivacyContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const privacy: PrivacyContent = {
  title: 'Privacy Policy',
  updated: 'July 21, 2026',
  intro:
    'SOMA (“we”, “us”) is currently pre-launch and collecting waitlist signups. This policy explains what we collect and why.',
  whatWeCollect: {
    h2: 'What we collect',
    paragraph: {
      before: 'When you join the waitlist, we collect the email address you provide. We use ',
      after:
        ' (ConvertKit) as our email service provider — Kit stores and processes your email on our behalf under its own privacy policy. We also collect standard analytics data (pages viewed, referring campaign) via PostHog and Google Analytics when those are enabled.',
    },
  },
  howWeUseIt: {
    h2: 'How we use it',
    body: 'Your email is used to send the Reset Guide you sign up for and occasional launch updates. Analytics data is used in aggregate to understand which pages and campaigns work — it is not used to identify you personally.',
  },
  cookies: {
    h2: 'Cookies',
    body: 'Analytics cookies are only set once you’ve given consent. We don’t use advertising or tracking cookies.',
  },
  yourRights: {
    h2: 'Your rights',
    body: 'You can ask us to remove your email from our list at any time by emailing us — see Contact below — or by using the unsubscribe link in any email we send.',
  },
  changes: {
    h2: 'Changes',
    body: 'We may update this policy as the product evolves. We’ll update the date above when we do.',
  },
  contact: {
    h2: 'Contact',
    paragraph: { before: 'Questions about this policy: ' },
  },
};
