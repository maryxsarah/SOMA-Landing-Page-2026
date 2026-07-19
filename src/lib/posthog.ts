import posthog from 'posthog-js';

/** The ONLY posthog-js import in the codebase. Everything else uses the façade. */

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

let initialized = false;

export function initPostHog(): void {
  if (typeof window === 'undefined' || initialized || !POSTHOG_KEY) return;
  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      ui_host: 'https://us.posthog.com',
      autocapture: false, // explicit taxonomy only
      capture_pageview: false, // façade fires $pageview per route change
      capture_pageleave: true,
      persistence: 'localStorage+cookie',
      session_recording: { maskAllInputs: true, maskTextSelector: '[data-sensitive]' },
    });
    initialized = true;
  } catch {
    // tracking must never be a hot-path failure
  }
}

export function posthogEnabled(): boolean {
  return initialized;
}

export function posthogCapture(event: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  try {
    posthog.capture(event, properties);
  } catch {
    /* swallow */
  }
}

export function posthogIdentify(userId: string, props?: Record<string, unknown>): void {
  if (!initialized) return;
  try {
    posthog.identify(userId, props);
  } catch {
    /* swallow */
  }
}

export function posthogReset(): void {
  if (!initialized) return;
  try {
    posthog.reset();
  } catch {
    /* swallow */
  }
}

export function posthogDistinctId(): string | undefined {
  if (!initialized) return undefined;
  try {
    return posthog.get_distinct_id();
  } catch {
    return undefined;
  }
}
