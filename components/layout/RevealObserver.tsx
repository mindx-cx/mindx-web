'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Reveals [data-reveal] elements as they scroll into view (styles in
 * globals.css). Re-scans on every route change. Elements stay visible without
 * JS, and with reduced motion the hidden state never applies.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));
    // Browsers don't run IntersectionObserver for pages that aren't being
    // drawn (background tabs, prerender, screenshot tools), so show everything
    // rather than risk blank sections.
    if (!('IntersectionObserver' in window) || document.visibilityState !== 'visible') {
      elements.forEach((el) => el.setAttribute('data-revealed', ''));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
