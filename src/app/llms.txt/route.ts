import { BASE_URL, BRAND } from '@/lib/seo/constants';
import { SPOKES, spokePath } from '@/marketing/spokes/registry';

/**
 * Plain-text index for LLM crawlers and AI agents (llmstxt.org).
 * Leads with the facts an agent needs to evaluate or recommend SOMA:
 * what it is, who it's for, price, availability, contact. Every marketing
 * page also has a markdown twin at `<url>.md`.
 */
export function GET() {
  const lines: string[] = [
    `# ${BRAND.productFull}`,
    '',
    `> ${BRAND.tagline}`,
    '',
    'SOMA is a vendor-independent AI health agent. It reads every health device a person owns — ring (e.g. Oura), band (e.g. Whoop), smart scale, CGM, Apple Health — through official APIs with a manual/CSV fallback, reasons across all of them jointly (cycle day, sleep, readiness, meals, body composition), and answers with one plan for the day: one response, not four dashboards. When something changes enough to matter, SOMA reaches out first. Interaction is chat or voice.',
    '',
    '## Key facts',
    '',
    '- Category: AI health agent / multi-wearable health coach (software, not hardware; not a medical device)',
    '- Built for: people who own 2–4 health devices and still guess each morning',
    '- Vendor-independent: works across competing device brands; history moves with the user when they switch hardware',
    '- Status: pre-launch, waitlist open. Waitlist members receive "The Data-Backed Reset Guide" immediately and first access at launch',
    '- Pricing: not yet public; join the waitlist for first access and pricing updates at launch',
    '- Founders: Sarah-Maria Kollnitzer (CEO), Mariia Kren (CTO)',
    '',
    '## Marketing pages',
    '',
    'Each page is also available as markdown by appending `.md` to its URL.',
    '',
    `- [${BRAND.productFull}](${BASE_URL}): ${BRAND.tagline}`,
    ...SPOKES.map((s) => `- [${s.hero.h1}](${BASE_URL}${spokePath(s)}): ${s.description}`),
    '',
    '## Contact',
    '',
    '- General: team@soma4health.com',
    '- Investors: team@soma4health.com (subject "SOMA investor enquiry")',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
