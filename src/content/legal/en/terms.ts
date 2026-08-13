import type { TermsContent } from '../types';

// TODO(brand): basic placeholder — have legal counsel review before launch.
export const terms: TermsContent = {
  title: 'Terms of Service',
  updated: 'July 21, 2026',
  intro:
    'By using this website or joining the SOMA waitlist, you agree to these terms. SOMA is currently pre-launch — the product described on this site is not yet publicly available.',
  waitlist: {
    h2: 'The waitlist',
    body: 'Joining the waitlist is free and creates no purchase obligation. We’ll email you the Reset Guide and occasional updates; you can unsubscribe at any time.',
  },
  notMedicalDevice: {
    h2: 'Not a medical device',
    body: 'SOMA is a general-wellness tool. It does not diagnose, treat, or replace advice from a qualified clinician. Talk to your doctor for medical questions.',
  },
  intellectualProperty: {
    h2: 'Intellectual property',
    body: 'All content on this site — text, graphics, and branding — belongs to SOMA unless otherwise noted, and may not be reused without permission.',
  },
  noWarranty: {
    h2: 'No warranty',
    body: 'This site and any information on it are provided “as is”, without warranty of any kind, to the fullest extent permitted by law.',
  },
  changes: {
    h2: 'Changes',
    body: 'We may update these terms as the product evolves. We’ll update the date above when we do.',
  },
  contact: {
    h2: 'Contact',
    paragraph: { before: 'Questions about these terms: ' },
  },
};
