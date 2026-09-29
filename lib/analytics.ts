// Consent-aware analytics (A10). PostHog loads only after "Accept all" and
// only when NEXT_PUBLIC_POSTHOG_KEY is set; until then track() is a no-op.
import type { PostHog } from 'posthog-js';
import { readConsent } from './consent';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export type AnalyticsEvent =
  | 'page_view'
  | 'cta_brain_scan_click'
  | 'cta_demo_click'
  | 'brain_scan_form_submit'
  | 'shopify_connect_start'
  | 'demo_booked'
  | 'design_partner_apply'
  | 'waitlist_join'
  | 'pricing_toggle'
  | 'pricing_calculator_used'
  | 'integration_search'
  | 'integration_request'
  | 'faq_open';

type Props = Record<string, string | number | boolean | undefined>;

let client: PostHog | null = null;
let loading: Promise<void> | null = null;
const queue: Array<[AnalyticsEvent, Props]> = [];

function allowed(): boolean {
  return Boolean(KEY) && typeof window !== 'undefined' && readConsent() === 'all';
}

/** Loads PostHog once consent is given. Safe to call repeatedly. */
export function initAnalytics(): void {
  if (!allowed() || client || loading) return;
  loading = import('posthog-js').then(({ default: posthog }) => {
    posthog.init(KEY as string, {
      api_host: HOST,
      capture_pageview: false, // page_view is sent by AnalyticsProvider on route change
      autocapture: false,
      persistence: 'localStorage+cookie',
    });
    client = posthog;
    while (queue.length) {
      const [event, props] = queue.shift()!;
      client.capture(event, props);
    }
  });
}

/** Stops capturing if the visitor withdraws consent. */
export function disableAnalytics(): void {
  client?.opt_out_capturing();
  queue.length = 0;
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (!allowed()) return;
  if (client) {
    client.opt_in_capturing();
    client.capture(event, props);
    return;
  }
  queue.push([event, props]);
  initAnalytics();
}
