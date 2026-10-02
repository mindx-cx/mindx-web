'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { disableAnalytics, initAnalytics, track } from '@/lib/analytics';
import { CONSENT_EVENT, type Consent } from '@/lib/consent';
import { readAttribution } from '@/lib/utm';

/** Where on the page a CTA sits (A10 position property). */
function position(el: Element): string {
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  const section = el.closest('main > section, main > * > section');
  if (section && section === document.querySelector('main section')) return 'hero';
  return 'section';
}

/**
 * Wires analytics events (A10) without touching every component: page views
 * on route change, CTA clicks and FAQ opens through document listeners.
 * Everything no-ops until consent is "all" and a PostHog key is set.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
    const onConsent = (e: Event) => {
      const consent = (e as CustomEvent<Consent>).detail;
      if (consent === 'all') initAnalytics();
      else disableAnalytics();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    const { utmSource, utmMedium, utmCampaign } = readAttribution();
    track('page_view', {
      path: pathname,
      referrer: document.referrer || undefined,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const props = { page: window.location.pathname, position: position(link) };
      if (href.startsWith('/waitlist?intent=demo') || href === '/demo') track('cta_demo_click', props);
      else if (href.startsWith('/waitlist') || href.startsWith('/signup')) track('cta_brain_scan_click', props);
    };
    // "toggle" doesn't bubble, so listen in the capture phase.
    const onToggle = (e: Event) => {
      const details = e.target as HTMLDetailsElement;
      if (details.tagName === 'DETAILS' && details.open && details.id.startsWith('faq-')) {
        track('faq_open', { page: window.location.pathname, question_id: details.id.slice(4) });
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('toggle', onToggle, true);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('toggle', onToggle, true);
    };
  }, []);

  return null;
}
