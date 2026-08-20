import { CTA_HREF_OFF_LANDING, CTA_LABEL } from '@/lib/launch';
import type { SpokeBucket, SpokeDef, SpokeFaqItem } from './types';

export { spokePath } from './types';
export type { SpokeDef, SpokeBucket } from './types';

/** Shared CTA across spokes — flips with LAUNCH_MODE, zero copy edits. */
const SPOKE_CTA = { label: CTA_LABEL, href: CTA_HREF_OFF_LANDING };

/** Shared waitlist-status FAQ — same honest answer on every spoke. */
const AVAILABILITY_FAQ: SpokeFaqItem = {
  q: 'Is SOMA available today?',
  docSlug: 'waitlist',
  a: 'SOMA is pre-launch. Joining the waitlist gets you The Data-Backed Reset Guide immediately and early access before the public launch; the Founder Cohort concierge tier is offered to the waitlist first.',
};

const ouraAdvisor: SpokeDef = {
  bucket: 'alternatives',
  slug: 'oura-advisor',
  archetype: 'alternative',
  subject: 'Oura Advisor',
  navLabel: 'Oura Advisor alternative',
  description:
    'SOMA is an Oura Advisor alternative that reads your Oura data next to Whoop, smart scales and CGMs — one AI health agent across every device, not one ring.',
  owns: ['oura advisor alternative', 'ai coach for oura data', 'oura ai chat alternative'],
  avoids: ['oura ring alternative', 'oura ring review', 'best smart ring'],
  hero: {
    eyebrow: 'Oura Advisor alternative',
    h1: 'An Oura Advisor alternative that sees more than the ring',
    lead: 'Oura Advisor is the AI coach built into the Oura app, and it works from one source: your ring. SOMA is a vendor-independent AI health agent that reads your Oura data alongside everything else — Whoop, smart scale, CGM, logged meals — and answers with one plan for today.',
    cta: SPOKE_CTA,
  },
  comparison: {
    competitor: 'Oura Advisor',
    rows: [
      { dim: 'Data it reasons over', them: 'Oura ring data', us: 'Every source you connect — ring, band, scale, CGM, habits' },
      { dim: 'Where it lives', them: 'Inside the Oura app', us: 'One home screen — chat or voice' },
      { dim: 'Who starts the conversation', them: 'You open the app and ask', us: 'SOMA reaches out first when something changes' },
      { dim: 'If you switch hardware', them: 'Advice stays with Oura', us: 'Vendor-independent — your history moves with you' },
      { dim: 'Price', them: 'Included with Oura membership', us: 'From $19.99/month at launch' },
    ],
  },
  sections: [
    {
      title: 'When Oura Advisor is enough',
      body: [
        'If the ring is your only tracker, Oura Advisor is a reasonable default: it is free with membership, lives where your data already is, and answers questions about sleep, readiness and activity from that single stream.',
      ],
    },
    {
      title: 'When you need a layer above the ring',
      body: [
        'Most people SOMA is built for own 2–4 devices. The ring knows recovery, the scale knows body composition, the CGM knows glucose, the calendar knows load — and no single-vendor coach is structurally able to read a competitor’s device. SOMA sits above the hardware: it reasons across all of those signals at once and answers as one voice, so a low readiness score gets interpreted next to your cycle day, yesterday’s meals and this morning’s meetings — not in isolation.',
      ],
      pills: ['oura ring', 'whoop', 'apple health', 'smart scale', 'CGM', '+ your habits'],
    },
  ],
  faq: [
    {
      q: 'Does SOMA replace my Oura ring?',
      docSlug: 'devices',
      a: 'No. SOMA is not hardware — it reads the data your Oura ring already produces and combines it with your other sources. You keep the ring; SOMA replaces the translation work between apps.',
    },
    {
      q: 'How does SOMA get my Oura data?',
      docSlug: 'integrations',
      a: 'Through official APIs, with Apple Health as a hub where available, plus a manual/CSV fallback — so no single integration change can cut off your history.',
    },
    AVAILABILITY_FAQ,
  ],
  docSlug: 'oura-advisor-alternative',
};

const whoopCoach: SpokeDef = {
  bucket: 'alternatives',
  slug: 'whoop-coach',
  archetype: 'alternative',
  subject: 'Whoop Coach',
  navLabel: 'Whoop Coach alternative',
  description:
    'SOMA is a Whoop Coach alternative that reads your Whoop data next to your ring, scale and CGM — a vendor-independent AI health agent, not a one-band coach.',
  owns: ['whoop coach alternative', 'ai coach for whoop data', 'whoop ai alternative'],
  avoids: ['whoop band alternative', 'whoop review', 'best fitness band'],
  hero: {
    eyebrow: 'Whoop Coach alternative',
    h1: 'A Whoop Coach alternative that reads more than the band',
    lead: 'Whoop Coach is the AI assistant inside the Whoop app, built on one stream: your band. SOMA is a vendor-independent AI health agent that reasons across your Whoop data plus your ring, smart scale, CGM and logged habits — and answers with one plan for today, not another dashboard.',
    cta: SPOKE_CTA,
  },
  comparison: {
    competitor: 'Whoop Coach',
    rows: [
      { dim: 'Data it reasons over', them: 'Whoop band data', us: 'Every source you connect — band, ring, scale, CGM, habits' },
      { dim: 'Where it lives', them: 'Inside the Whoop app', us: 'One home screen — chat or voice' },
      { dim: 'Who starts the conversation', them: 'You open the app and ask', us: 'SOMA reaches out first when something changes' },
      { dim: 'If you switch hardware', them: 'Advice stays with Whoop', us: 'Vendor-independent — your history moves with you' },
      { dim: 'Price', them: 'Included with Whoop membership', us: 'From $19.99/month at launch' },
    ],
  },
  sections: [
    {
      title: 'When Whoop Coach is enough',
      body: [
        'If strain and recovery from the band are the only signals you act on, Whoop Coach is a sensible default — it is bundled with membership and speaks fluently about the data Whoop itself collects.',
      ],
    },
    {
      title: 'When one band stops being the whole picture',
      body: [
        'Recovery is not produced by the band alone: sleep architecture, cycle phase, glucose response to yesterday’s meals and body-composition trends all move it. Device makers are locked in a hardware war and none will build coaching on a competitor’s device — structurally, they can’t. SOMA is the layer above that war: it reads every source you connect and compounds with each one you add.',
      ],
      pills: ['whoop', 'oura ring', 'apple health', 'smart scale', 'CGM', '+ your habits'],
    },
  ],
  faq: [
    {
      q: 'Does SOMA replace my Whoop membership?',
      docSlug: 'devices',
      a: 'No. SOMA reads the data your Whoop band produces and interprets it next to your other sources. The band and its membership stay; SOMA replaces the cross-referencing you do between apps.',
    },
    AVAILABILITY_FAQ,
  ],
  docSlug: 'whoop-coach-alternative',
};

const crossDeviceReasoning: SpokeDef = {
  bucket: 'features',
  slug: 'cross-device-reasoning',
  archetype: 'feature',
  subject: 'Cross-device reasoning',
  navLabel: 'Cross-device reasoning',
  description:
    'SOMA reads your ring, band, smart scale and CGM together — cycle day, sleep, readiness, meals — and answers with one plan instead of four dashboards.',
  owns: ['combine oura and whoop data', 'read all wearables together', 'multi wearable ai agent'],
  avoids: ['oura advisor alternative', 'whoop coach alternative'],
  hero: {
    eyebrow: 'Cross-device reasoning',
    h1: 'One AI that reads every wearable you own — together',
    lead: 'Every health device produces its own score, in its own app, blind to the others. SOMA’s agents reason jointly across all of them — cycle day, sleep stages, readiness, injury history, recent meals, body composition — and answer as one voice: one plan for today, not four dashboards.',
    cta: SPOKE_CTA,
  },
  sections: [
    {
      title: 'Why one signal is never the answer',
      body: [
        'Almost nothing your body does can be explained by one number in isolation. A low readiness score next to a fully booked calendar means something different than the same score on a rest day; a high sleep score can hide a night of shallow sleep the workout will feel. SOMA interprets each signal in the context of all the others — which is the part no single-device app is built to do.',
      ],
    },
    {
      title: 'What it reads',
      body: [
        'Connected once through official APIs — with Apple Health as a hub and a manual/CSV fallback — SOMA reads whatever you own now and whatever you switch to next.',
      ],
      pills: ['oura ring', 'whoop', 'apple health', 'smart scale', 'CGM', 'calendar load', 'logged meals'],
    },
  ],
  faq: [
    {
      q: 'Which devices can SOMA read together?',
      docSlug: 'devices',
      a: 'Rings, bands, smart scales and CGMs — via official APIs, Apple Health as a hub, and a manual/CSV fallback for anything without an integration.',
    },
    AVAILABILITY_FAQ,
  ],
  docSlug: 'cross-device-reasoning',
};

const proactiveAgent: SpokeDef = {
  bucket: 'features',
  slug: 'proactive-ai-coach',
  archetype: 'feature',
  subject: 'Proactive AI health agent',
  navLabel: 'Proactive outreach',
  description:
    'SOMA is an AI health agent that reaches out first: when your data changes enough to matter, it messages you with one concrete adjustment for today.',
  owns: ['ai health coach that reaches out', 'proactive health ai', 'health agent notifications'],
  avoids: ['combine oura and whoop data'],
  hero: {
    eyebrow: 'Proactive outreach',
    h1: 'A health agent that reaches out first',
    lead: 'Dashboards wait to be opened. SOMA watches your connected data and, when something changes enough to matter — readiness dropping while your calendar fills, sleep debt building against a training block — it messages you first with one concrete adjustment, instead of waiting to be asked.',
    cta: SPOKE_CTA,
  },
  sections: [
    {
      title: 'Signal, not noise',
      body: [
        'Proactive does not mean chatty. SOMA speaks up when the cross-device picture actually shifts, and stays quiet when it doesn’t — the bar is “would a good coach interrupt you for this?”. You can always talk back: type it or say it, like you would to a coach who already knows your data.',
      ],
    },
  ],
  faq: [
    {
      q: 'How often does SOMA message me?',
      docSlug: 'proactive',
      a: 'Only when the combined picture changes enough to matter — a meaningful shift in readiness, sleep debt, or load. It is a coach’s interruption bar, not an engagement-notification bar.',
    },
    AVAILABILITY_FAQ,
  ],
  docSlug: 'proactive-ai-coach',
};

const combineWearableData: SpokeDef = {
  bucket: 'how-to',
  slug: 'combine-wearable-data',
  archetype: 'howTo',
  subject: 'combine data from all your wearables',
  navLabel: 'Combine wearable data',
  description:
    'A practical way to read your ring, band, scale and CGM as one picture: pick a hub, connect what you own, and check body signal against life signal daily.',
  owns: ['how to combine wearable data', 'sync oura and whoop data', 'wearable data in one place'],
  avoids: ['oura advisor alternative', 'whoop coach alternative'],
  hero: {
    eyebrow: 'How to',
    h1: 'How to combine data from all your wearables',
    lead: 'You do not need new hardware to see one picture — you need a hub, two honest questions, and a habit that takes two minutes each morning. Here is the manual version, and where SOMA automates it.',
    cta: SPOKE_CTA,
  },
  howToSteps: [
    {
      name: 'Route everything through one hub',
      text: 'On iPhone, turn on Apple Health write access for every device app you own (Oura, Whoop, scale, CGM). This gives you one timeline instead of four apps.',
    },
    {
      name: 'Fill the gaps manually',
      text: 'Anything without an integration — meals, caffeine timing, how a session felt — goes in as a note or CSV. Incomplete context is what makes single scores misleading.',
    },
    {
      name: 'Ask two questions every morning',
      text: 'What is my body’s signal saying (readiness, HRV, sleep)? What is my life’s signal saying (calendar, load, food so far)? If they disagree, that disagreement is the information.',
    },
    {
      name: 'Let an agent do the cross-referencing',
      text: 'Doing this by hand works — and is genuinely hard to sustain. SOMA reads every connected source automatically and answers with one plan for today, so the two-minute habit becomes zero.',
    },
  ],
  sections: [
    {
      title: 'Why the manual version breaks down',
      body: [
        'Cross-referencing apps every morning means holding numbers in your head and remembering what mattered on which day. It survives about as long as any willpower-based habit. The fix is not more discipline — it is moving the translation work to software that reads all the sources at once.',
      ],
    },
  ],
  faq: [
    {
      q: 'Do I need Apple Health for this to work?',
      docSlug: 'integrations',
      a: 'It is the easiest hub on iPhone, but not required — SOMA also connects device APIs directly and accepts manual/CSV input for anything without an integration.',
    },
    AVAILABILITY_FAQ,
  ],
  docSlug: 'combine-wearable-data',
};

const multiDeviceOwners: SpokeDef = {
  bucket: 'for',
  slug: 'multi-device-owners',
  archetype: 'for',
  subject: 'people with 2–4 health devices',
  navLabel: 'For multi-device owners',
  description:
    'Own a ring, a band, a scale, maybe a CGM — and still guess each morning? SOMA turns 2–4 disconnected scores into one plan for today, built for exactly you.',
  owns: ['too many health apps', 'ring band scale cgm together', 'multiple wearables one answer'],
  avoids: ['how to combine wearable data'],
  hero: {
    eyebrow: 'Who it’s for',
    h1: 'For people who own 2–4 health devices and still guess',
    lead: 'Highly functioning people already own the sensors — a ring, a band, a scale, sometimes a CGM — and still don’t know what to do each morning, because every device produces its own score and none of them talk to each other. SOMA is built for exactly this person.',
    cta: SPOKE_CTA,
  },
  sections: [
    {
      title: 'The fragmentation tax you already pay',
      body: [
        'Multi-device owners typically pay $30–90/month across device apps, plus $200–600/month if human coaches do the interpretation. The money buys four opinions that never meet. SOMA is priced against that stack — it replaces the translation layer, not your devices.',
      ],
    },
    {
      title: 'What changes with one voice',
      body: [
        'Mornings stop starting with app-hopping. You tell SOMA about a meal or a workout — typed or spoken — and it answers from everything it can see: cycle day, sleep, readiness, injury history, body composition. When something changes enough to matter, it reaches out first.',
      ],
      pills: ['one home screen', 'chat + voice', 'proactive outreach', 'vendor-independent'],
    },
  ],
  faq: [
    {
      q: 'I only have one device — is SOMA for me?',
      docSlug: 'devices',
      a: 'SOMA works with a single source, but its value compounds with each one you add — the joint reasoning across devices is the point. With one device, start with the free Reset Guide.',
    },
    AVAILABILITY_FAQ,
  ],
  docSlug: 'multi-device-owners',
};

/** Build order: features → how-to → for → alternatives. */
export const SPOKES: SpokeDef[] = [
  crossDeviceReasoning,
  proactiveAgent,
  combineWearableData,
  multiDeviceOwners,
  ouraAdvisor,
  whoopCoach,
];

export function spokesInBucket(bucket: SpokeBucket): SpokeDef[] {
  return SPOKES.filter((s) => s.bucket === bucket);
}

export function findSpoke(bucket: SpokeBucket, slug: string): SpokeDef | null {
  return SPOKES.find((s) => s.bucket === bucket && s.slug === slug) ?? null;
}

/**
 * FAQ answer: explicit override, else the docs entry summary — verbatim.
 * No docs system yet, so the inline answer is the only source. Throws on a
 * missing answer so a broken ref fails CI, not prod.
 */
export function resolveFaq(item: SpokeFaqItem): { q: string; a: string; docSlug: string } {
  const a = item.a; // TODO(docs): fall back to findEntry(item.docSlug)?.entry.summary
  if (!a) throw new Error(`Spoke FAQ references unknown docs entry "${item.docSlug}"`);
  return { q: item.q, a, docSlug: item.docSlug };
}
