'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/utm';

/** Records UTM parameters and the landing page on the first visit (A9). */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
