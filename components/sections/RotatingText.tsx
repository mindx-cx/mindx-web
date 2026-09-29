'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const INTERVAL_MS = 2600;

/**
 * Cycles through phrases. All phrases share one grid cell, so the block keeps
 * the height of the longest one and nothing below it jumps. Decorative: the
 * parent heading carries the real text for screen readers. With reduced motion
 * it shows the last phrase only.
 */
export function RotatingText({ phrases, className }: { phrases: readonly string[]; className?: string }) {
  const last = phrases.length - 1;
  const [index, setIndex] = useState(last);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIndex(0);
    const id = window.setInterval(() => setIndex((i) => (i + 1) % phrases.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  return (
    <span aria-hidden="true" className={cn('grid', className)}>
      {phrases.map((phrase, i) => (
        <span
          key={phrase}
          className={cn(
            '[grid-area:1/1] transition-all duration-500 ease-out',
            i === index ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
          )}
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}
