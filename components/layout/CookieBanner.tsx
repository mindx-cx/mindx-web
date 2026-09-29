'use client';

import { useEffect, useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cookieBanner } from '@/content/site';
import { OPEN_SETTINGS_EVENT, readConsent, writeConsent, type Consent } from '@/lib/consent';

/**
 * Bottom sheet on first visit (A6, B10.6). Analytics loads only after
 * "Accept all" (wired in Phase 7 via the mx:consent event).
 */
export function CookieBanner() {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setVisible(true);

    const openSettings = () => {
      setAnalytics(readConsent() === 'all');
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  function choose(consent: Consent) {
    writeConsent(consent);
    setVisible(false);
    setShowSettings(false);
  }

  if (!visible) return null;

  return (
    <section
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-700 bg-navy-900 text-white shadow-mock"
    >
      <div className="container-x py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-small text-gray-300">{cookieBanner.text}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => choose('all')}>{cookieBanner.acceptAll}</Button>
            <Button variant="secondary" onClick={() => choose('necessary')}>
              {cookieBanner.necessaryOnly}
            </Button>
            <Button
              variant="ghost"
              arrow={false}
              className="h-12 px-3"
              aria-expanded={showSettings}
              aria-controls={`${id}-settings`}
              onClick={() => setShowSettings((v) => !v)}
            >
              {cookieBanner.settings}
            </Button>
          </div>
        </div>

        {showSettings && (
          <div id={`${id}-settings`} className="mt-4 flex flex-col gap-3 border-t border-navy-700 pt-4 sm:flex-row sm:items-center sm:gap-8">
            <label className="flex items-center gap-2 text-small text-gray-300">
              <input type="checkbox" checked disabled className="h-4 w-4 accent-mint-400" />
              {cookieBanner.necessaryLabel}
            </label>
            <label className="flex items-center gap-2 text-small text-white">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-mint-400"
              />
              {cookieBanner.analyticsLabel}
            </label>
            <Button variant="secondary" className="sm:ml-auto" onClick={() => choose(analytics ? 'all' : 'necessary')}>
              {cookieBanner.save}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
