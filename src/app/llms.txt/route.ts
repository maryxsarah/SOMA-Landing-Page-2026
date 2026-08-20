import { PRICING } from '@/lib/pricing';
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
    'SOMA is an AI operating system for personal health, shipping as an iPhone app. Two agents — a fitness coach and a nutrition expert — reason together over the data already on the phone (Apple Health, Apple Watch, Oura, Whoop) and return one plan per day: the workout, the food, and the reason behind each. The plan adapts daily to recovery, logged meals and visible progress rather than running a fixed program.',
    '',
    '## Key facts',
    '',
    '- Category: AI fitness and nutrition coaching app (software, not hardware; not a medical device)',
    '- Platform: iPhone, iOS 17+. Android is on the roadmap. No new hardware required — it reads the sensors the user already owns',
    '- Built for women. The product is designed around female training and nutrition rather than adapted from a general-purpose app',
    '- What it does that most apps do not: gym scan (photograph any room, the session rebuilds around the equipment actually present); progress measured by goal-photo against current-photo instead of a streak; recipes generated from what is in the fridge, sized to the calories and macros left that day',
    `- Pricing: $${PRICING.annualTotal.toFixed(2)}/year (billed once, $${PRICING.annualPerMonth.toFixed(2)}/month equivalent) or $${PRICING.monthly.toFixed(2)}/month. A free ${PRICING.trialDays}-day trial is available on the YEARLY plan only — the monthly plan has no trial. Full breakdown: ${BASE_URL}/pricing.md`,
    '- Status: invite-only beta, public launch imminent. The waitlist sends "The Data-Backed Reset Guide" (six field notes on reading your own health data) immediately, plus first access at launch',
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
