/**
 * UTM capture — the payoff of satellite pages: every signup/waitlist row is
 * attributable to the spoke/campaign that brought it.
 *
 * First-touch: written once, sticky. Last-touch: overwritten on each campaign
 * visit. Empty UTMs never overwrite stored ones.
 */

const FIRST_KEY = 'soma_original_attribution';
const LAST_KEY = 'soma_last_attribution';

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_path?: string;
  ts?: number;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

function readStore(key: string): Attribution | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null; // Safari private mode etc.
  }
}

function writeStore(key: string, value: Attribution): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* swallow */
  }
}

/** Call on every route change with window.location.search. */
export function captureAttribution(search: string): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(search);
  const utm: Attribution = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  if (Object.keys(utm).length === 0) return; // empty UTMs never overwrite

  const entry: Attribution = { ...utm, landing_path: window.location.pathname, ts: Date.now() };
  if (!readStore(FIRST_KEY)) writeStore(FIRST_KEY, entry);
  writeStore(LAST_KEY, entry);
}

export function readOriginalAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  return readStore(FIRST_KEY);
}

export function readLastAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  return readStore(LAST_KEY);
}
