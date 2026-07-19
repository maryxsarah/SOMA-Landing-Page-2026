import {
  initPostHog,
  posthogCapture,
  posthogEnabled,
  posthogIdentify,
  posthogReset,
} from './posthog';

/**
 * Analytics façade: one call, two destinations (GA4 + PostHog), each leg a
 * no-op unless its env var is set. Every product surface calls ONLY this file.
 */

const APP_NAME = 'soma-landing';
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? '';

export type TrackParams = Record<string, string | number | boolean | undefined>;

export interface IdentifyProfile {
  plan?: string;
  originalUtmSource?: string;
  originalUtmMedium?: string;
  originalUtmCampaign?: string;
}

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** Lazy-installs a dataLayer stub and swallows errors. */
function gtagSafe(...args: unknown[]): void {
  if (typeof window === 'undefined' || !GA4_ID) return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    if (!window.gtag) {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
    }
    window.gtag(...args);
  } catch {
    /* tracking must never break the page */
  }
}

export function analyticsEnabled(): boolean {
  return Boolean(GA4_ID) || posthogEnabled();
}

export function initAnalytics(): void {
  initPostHog();
}

export function track(event: string, params: TrackParams = {}): void {
  const stamped = { app: APP_NAME, ...params };
  gtagSafe('event', event, stamped);
  posthogCapture(event, stamped);
}

export function pageView(path: string, search?: string): void {
  if (typeof window === 'undefined') return;
  const params = {
    app: APP_NAME,
    page_path: path,
    page_search: search ?? '',
    page_location: window.location.href,
  };
  gtagSafe('event', 'page_view', params);
  posthogCapture('$pageview', params);
}

export function identify(userId: string, profile: IdentifyProfile = {}): void {
  const props = {
    plan: profile.plan,
    original_utm_source: profile.originalUtmSource,
    original_utm_medium: profile.originalUtmMedium,
    original_utm_campaign: profile.originalUtmCampaign,
  };
  gtagSafe('set', 'user_id', userId);
  gtagSafe('set', 'user_properties', props);
  posthogIdentify(userId, props);
}

export function reset(): void {
  posthogReset();
}

export { GA4_ID };
