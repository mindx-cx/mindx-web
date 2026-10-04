// First-landing attribution (A9): UTM parameters and landing page, kept in a
// first-party cookie for 30 days and sent with every form.
// [Legal to confirm: mention this cookie in the privacy policy.]

const COOKIE = 'mx_utm';
const MAX_AGE = 60 * 60 * 24 * 30;

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  landingPage?: string;
};

function readCookie(): Attribution | null {
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.slice(COOKIE.length + 1))) as Attribution;
  } catch {
    return null;
  }
}

/** Saves attribution on the first landing only; later visits don't overwrite it. */
export function captureAttribution(): void {
  if (readCookie()) return;
  const params = new URLSearchParams(window.location.search);
  const value: Attribution = {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
    utmContent: params.get('utm_content') ?? undefined,
    landingPage: window.location.pathname,
  };
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${
    window.location.protocol === 'https:' ? '; Secure' : ''
  }`;
}

export function readAttribution(): Attribution {
  return readCookie() ?? { landingPage: window.location.pathname };
}

/**
 * The campaign for this visit: the URL's own utm_* values when it has them
 * (an ad click), otherwise the first-landing ones saved in the cookie. Used by
 * /beta so a signup is credited to the ad that brought it.
 */
export function currentCampaign(): Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content', string | undefined> {
  const params = new URLSearchParams(window.location.search);
  const saved = readAttribution();
  return {
    utm_source: params.get('utm_source') ?? saved.utmSource,
    utm_medium: params.get('utm_medium') ?? saved.utmMedium,
    utm_campaign: params.get('utm_campaign') ?? saved.utmCampaign,
    utm_content: params.get('utm_content') ?? saved.utmContent,
  };
}
