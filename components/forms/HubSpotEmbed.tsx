'use client';

import { useEffect, useRef } from 'react';
import { HUBSPOT_PORTAL_ID, HUBSPOT_REGION, hubspotFormId, type HubSpotFormKey } from '@/lib/hubspotForms';

/**
 * HubSpot's own embed code for one of our three forms: the
 * `<div class="hs-form-frame">` placeholder plus the portal's embed script.
 *
 * HubSpot's script looks for `.hs-form-frame` elements once, when it loads.
 * The site navigates client-side, so a script tag pasted into the page would
 * miss every form rendered after the first page view. Creating the placeholder
 * and the script together on mount makes the form render on every visit to the
 * page, and removing both on unmount stops a revisit from stacking a second
 * form on top of the first.
 */
export function HubSpotEmbed({ form, className }: { form: HubSpotFormKey; className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const frame = document.createElement('div');
    frame.className = 'hs-form-frame';
    frame.dataset.region = HUBSPOT_REGION;
    frame.dataset.formId = hubspotFormId(form);
    frame.dataset.portalId = HUBSPOT_PORTAL_ID;
    el.appendChild(frame);

    // HubSpot warns when its script is on the page twice (the page form and the
    // footer form mount together), so replace any earlier copy. The new copy
    // renders every placeholder that has no form in it yet.
    const src = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;
    document.querySelectorAll(`script[src="${src}"]`).forEach((old) => old.remove());
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      el.replaceChildren();
    };
  }, [form]);

  return <div ref={host} className={className} />;
}
