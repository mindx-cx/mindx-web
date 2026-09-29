// Cookie consent state (A6, B10.6). Analytics may load only when consent is "all".

export type Consent = 'all' | 'necessary';

const STORAGE_KEY = 'mx_consent';
export const CONSENT_EVENT = 'mx:consent';
export const OPEN_SETTINGS_EVENT = 'mx:open-cookie-settings';

export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'all' || value === 'necessary' ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
