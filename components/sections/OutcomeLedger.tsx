'use client';

import { useEffect, useRef, useState } from 'react';
import { CircleCheck, CircleDollarSign, Clock, Repeat, type LucideIcon } from 'lucide-react';
import { Illustrative } from '@/components/ui/Illustrative';
import { cn } from '@/lib/cn';

type Tile = { label: string; value: number; prefix?: string };

const icons: LucideIcon[] = [CircleCheck, Clock, Repeat, CircleDollarSign];
const DURATION_MS = 1400;

const number = new Intl.NumberFormat('en-US');

/**
 * Sample outcome ledger whose numbers count up the first time it scrolls into
 * view. Server-renders the final values, so no-JS and reduced-motion visitors
 * see them straight away.
 */
export function OutcomeLedger({ label, tiles }: { label: string; tiles: readonly Tile[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    let frame = 0;
    setProgress(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          setProgress(1 - Math.pow(1 - t, 3)); // ease-out cubic
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="relative rounded-card border border-gray-200 bg-white p-6 md:p-8">
      <Illustrative />
      <p className="t-eyebrow text-gray-500">{label}</p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, i) => {
          const Icon = icons[i] ?? CircleCheck;
          const shown = Math.round(tile.value * progress);
          return (
            <li key={tile.label} className="flex flex-col gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className={cn('t-stat tabular-nums', i === tiles.length - 1 ? 'text-success' : 'text-ink-950')}>
                {tile.prefix}
                {number.format(shown)}
              </span>
              <span className="text-small text-ink-700">{tile.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
