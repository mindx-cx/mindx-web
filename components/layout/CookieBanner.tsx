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

  // CHANGED 4 Oct 2026 (Rajesh): a small white card in the corner instead of
  // a full-width navy bar (navy is kept for the top bar, footer and CTA band).
  // Blue "Accept all", soft "Only necessary", plain-text "Settings".
  const soft =
    'inline-flex items-center justify-center whitespace-nowrap rounded-ctl bg-surface px-4 py-2 text-[14px] font-medium leading-5 text-fg transition-colors duration-150 hover:bg-muted-bg';

  return (
    <section
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-line bg-white p-5 text-fg shadow-[0_8px_30px_rgba(19,20,25,0.12)] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[400px]"
    >
      <p className="text-small text-muted-fg">{cookieBanner.text}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button variant="nav" onClick={() => choose('all')}>
          {cookieBanner.acceptAll}
        </Button>
        <button type="button" className={soft} onClick={() => choose('necessary')}>
          {cookieBanner.necessaryOnly}
        </button>
        <button
          type="button"
          className="ml-auto px-2 py-2 text-[14px] font-medium leading-5 text-muted-fg underline-offset-4 hover:text-fg hover:underline"
          aria-expanded={showSettings}
          aria-controls={`${id}-settings`}
          onClick={() => setShowSettings((v) => !v)}
        >
          {cookieBanner.settings}
        </button>
      </div>

      {showSettings && (
        <div id={`${id}-settings`} className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
          <label className="flex items-center gap-2 text-small text-muted-fg">
            <input type="checkbox" checked disabled className="h-4 w-4 accent-brand" />
            {cookieBanner.necessaryLabel}
          </label>
          <label className="flex items-center gap-2 text-small text-fg">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="h-4 w-4 accent-brand"
            />
            {cookieBanner.analyticsLabel}
          </label>
          <button type="button" className={`${soft} self-start`} onClick={() => choose(analytics ? 'all' : 'necessary')}>
            {cookieBanner.save}
          </button>
        </div>
      )}
    </section>
  );
}
