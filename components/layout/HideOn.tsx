'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Renders its children everywhere except on the given paths. Used to give a
 * campaign page (/beta) its own simple header and footer while every other
 * page keeps the site's.
 */
export function HideOn({ paths, children }: { paths: readonly string[]; children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const path = pathname.replace(/\/$/, '') || '/';
  return paths.includes(path) ? null : <>{children}</>;
}
