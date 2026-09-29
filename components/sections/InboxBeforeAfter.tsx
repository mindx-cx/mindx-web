'use client';

import { useEffect, useState } from 'react';
import { Inbox } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { Illustrative } from '@/components/ui/Illustrative';
import { WorkerTile } from '@/components/ui/WorkerTile';
import { inbox } from '@/content/home';
import { cn } from '@/lib/cn';

const FLIP_MS = 3800;

/**
 * The five questions from B2.2 as an inbox with a Today / With MindX switch.
 * Flips on its own until the visitor clicks a tab. Sample counts (Illustrative).
 */
export function InboxBeforeAfter() {
  const [withMindx, setWithMindx] = useState(false);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setWithMindx((v) => !v), FLIP_MS);
    return () => window.clearInterval(id);
  }, [auto]);

  function choose(value: boolean) {
    setAuto(false);
    setWithMindx(value);
  }

  return (
    <div className="relative overflow-hidden rounded-card border border-gray-200 bg-white">
      <Illustrative />
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 py-3 pl-4 pr-28">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-gray-50 text-ink-700">
          <Inbox className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="font-semibold">{inbox.title}</p>
        <div role="group" aria-label="Inbox view" className="flex rounded-pill bg-gray-50 p-0.5 text-xs font-semibold">
          {inbox.tabs.map((tab, i) => {
            const selected = (i === 1) === withMindx;
            return (
              <button
                key={tab}
                type="button"
                aria-pressed={selected}
                onClick={() => choose(i === 1)}
                className={cn(
                  'rounded-pill px-3 py-1 transition-colors',
                  selected ? 'bg-white text-ink-950 shadow-[0_1px_2px_rgba(15,26,58,0.14)]' : 'text-gray-500 hover:text-ink-950',
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="divide-y divide-gray-200">
        {inbox.rows.map((row) => (
          <li key={row.question} className="flex items-center gap-3 px-4 py-3">
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-ink-950">{row.question}</span>
              <span
                className={cn(
                  'block text-small text-gray-500 transition-opacity duration-300',
                  withMindx ? 'opacity-100' : 'opacity-0',
                )}
                aria-hidden={!withMindx}
              >
                {row.withMindx.detail}
              </span>
            </span>
            {withMindx ? (
              <Chip tone={row.withMindx.tone}>{row.withMindx.status}</Chip>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-gray-50 px-2.5 py-0.5 text-xs font-semibold text-ink-700">
                {row.count} {inbox.openLabel.toLowerCase()}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div
        aria-live={auto ? 'off' : 'polite'}
        className={cn(
          'flex items-center gap-3 border-t border-gray-200 px-4 py-3 text-small font-semibold transition-colors duration-300',
          withMindx ? 'bg-success-soft text-success-strong' : 'bg-gray-50 text-ink-700',
        )}
      >
        {withMindx && <WorkerTile worker="resolve" size="sm" />}
        {withMindx ? inbox.withSummary : inbox.todaySummary}
      </div>
    </div>
  );
}
