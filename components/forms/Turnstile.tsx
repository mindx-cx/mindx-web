'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';
import { turnstileSiteKey } from '@/lib/config';

type TurnstileApi = {
  render: (el: HTMLElement, options: { sitekey: string; theme?: 'light' | 'dark' | 'auto' }) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Cloudflare Turnstile bot check (A2, A9). Renders nothing until
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. The widget adds a hidden
 * "cf-turnstile-response" input to the surrounding form; read it with
 * readTurnstileToken().
 */
export function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!ref.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(ref.current, { sitekey: turnstileSiteKey, theme: 'light' });
  }, []);

  useEffect(() => {
    render();
  }, [render]);

  if (!turnstileSiteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={render} />
      <div ref={ref} className="min-h-[65px]" />
    </>
  );
}

export function readTurnstileToken(form: HTMLFormElement): string | undefined {
  const value = new FormData(form).get('cf-turnstile-response');
  return typeof value === 'string' && value ? value : undefined;
}

export function resetTurnstile(): void {
  window.turnstile?.reset();
}
