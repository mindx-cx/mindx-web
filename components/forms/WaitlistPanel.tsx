'use client';

import { useEffect, useState } from 'react';
import { HubSpotEmbed } from '@/components/forms/HubSpotEmbed';
import { waitlistPage as copy } from '@/content/waitlist';

/**
 * Reads ?intent=demo in the browser rather than on the server.
 *
 * The page used to await searchParams, which a static export cannot do: there
 * is no request at build time, so the whole page failed to prerender. The HTML
 * is now the same for everyone and the demo note appears on mount, which is
 * also why intent starts undefined -- rendering it during hydration and then
 * removing it would be a mismatch.
 */
export function WaitlistPanel() {
  const [intent, setIntent] = useState<'demo' | undefined>();

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('intent');
    if (value === 'demo') setIntent('demo');
  }, []);

  return (
    <>
      {intent === 'demo' && (
        <p className="mb-5 rounded-btn bg-blue-50 px-4 py-3 text-left text-small font-medium text-info-strong">
          {copy.demoNote}
        </p>
      )}
      <HubSpotEmbed form="waitlist" />
    </>
  );
}
