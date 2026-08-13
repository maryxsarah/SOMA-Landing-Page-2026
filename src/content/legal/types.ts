/**
 * Legal-page prose doesn't fit a flat JSON message dictionary well (long
 * multi-paragraph text, and two paragraphs that embed a link around a fixed
 * brand name / email address that itself never translates) — so it lives in
 * a typed per-locale, per-document content module instead of
 * messages/{locale}.json. `before`/`after` split a paragraph around the
 * embedded link so the page component can render the actual `<a>` without
 * the content module needing any markup syntax.
 */
export interface LegalLinkParagraph {
  before: string;
  after?: string;
}

export interface PrivacyContent {
  title: string;
  updated: string;
  intro: string;
  whatWeCollect: { h2: string; paragraph: LegalLinkParagraph };
  howWeUseIt: { h2: string; body: string };
  cookies: { h2: string; body: string };
  yourRights: { h2: string; body: string };
  changes: { h2: string; body: string };
  contact: { h2: string; paragraph: LegalLinkParagraph };
}

export interface TermsContent {
  title: string;
  updated: string;
  intro: string;
  waitlist: { h2: string; body: string };
  notMedicalDevice: { h2: string; body: string };
  intellectualProperty: { h2: string; body: string };
  noWarranty: { h2: string; body: string };
  changes: { h2: string; body: string };
  contact: { h2: string; paragraph: LegalLinkParagraph };
}
