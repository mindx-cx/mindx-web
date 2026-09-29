'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

type Step = { title: string; body: string };

const STEP_MS = 1500;
const HOLD_MS = 2200; // pause with every step done before restarting

const columnClass: Record<number, string> = {
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-3',
};

/**
 * A worker's steps as cards that light up one after another, then show all
 * done, then loop. Static (all steps shown plainly) with reduced motion.
 */
export function FlowSteps({ steps }: { steps: readonly Step[] }) {
  // -1 = static; otherwise the index of the active step (steps.length = all done).
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    let timer: number;
    const tick = () => {
      setActive(i);
      const done = i >= steps.length;
      i = done ? 0 : i + 1;
      timer = window.setTimeout(tick, done ? HOLD_MS : STEP_MS);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, [steps.length]);

  return (
    <ol className={cn('grid gap-4 sm:grid-cols-2', columnClass[steps.length] ?? 'lg:grid-cols-3')}>
      {steps.map((step, i) => {
        const isActive = i === active;
        const isDone = active > i;
        return (
          <li
            key={step.title}
            className={cn(
              'rounded-card border bg-white p-5 transition-all duration-500',
              isActive ? 'border-blue-600 shadow-[0_0_0_4px_rgba(19,88,208,0.12)]' : 'border-gray-200',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-pill text-small font-semibold transition-colors duration-500',
                isDone ? 'bg-success-soft text-success-strong' : isActive ? 'bg-blue-600 text-white' : 'bg-gray-50 text-ink-700',
              )}
            >
              {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </span>
            <h3 className="mt-4 font-semibold text-ink-950">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-1 text-small text-ink-700">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
