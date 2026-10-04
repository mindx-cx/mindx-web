'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { currentCampaign } from '@/lib/utm';

/** An in-page link on /beta that records which call to action was clicked. */
export function BetaLink({
  href,
  where,
  className,
  children,
}: {
  href: string;
  /** Which button this is, e.g. "hero", "nav", "final". */
  where: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => track('beta_cta_click', { where, ...currentCampaign() })}>
      {children}
    </a>
  );
}
