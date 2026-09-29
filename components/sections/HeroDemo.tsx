'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { Illustrative } from '@/components/ui/Illustrative';
import { WorkerTile } from '@/components/ui/WorkerTile';
import { heroDemo, type DemoStep } from '@/content/home';
import type { WorkerId } from '@/content/site';
import { cn } from '@/lib/cn';

const STEP_MS = 1100;
const PAUSE_MS = 3500; // pause on the finished scenario before auto-advancing

type Scenario = (typeof heroDemo.scenarios)[number];

const workerSoftBg: Record<WorkerId, string> = {
  brain: 'bg-worker-brain-soft',
  resolve: 'bg-worker-resolve-soft',
  convert: 'bg-worker-convert-soft',
  grow: 'bg-worker-grow-soft',
};

const workerDot: Record<WorkerId, string> = {
  brain: 'bg-worker-brain',
  resolve: 'bg-worker-resolve',
  convert: 'bg-worker-convert',
  grow: 'bg-worker-grow',
};

const workerBar: Record<WorkerId, string> = workerDot;

function reveal(visible: boolean) {
  return cn('transition-all duration-300', visible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0');
}

/**
 * Hero product view (A7 ChatActionMock, extended): three auto-playing
 * scenarios, one per worker, in a MindX app frame. Conversation on the left,
 * action log on the right, outcome row, and an Ask/Work composer. Every step
 * stays in the DOM (hidden with opacity) so the layout doesn't jump and screen
 * readers get the full example.
 */
export function HeroDemo({ only }: { only?: readonly Scenario['id'][] } = {}) {
  const onlyKey = only?.join(',');
  const scenarios = useMemo(
    () => (onlyKey ? heroDemo.scenarios.filter((s) => onlyKey.split(',').includes(s.id)) : [...heroDemo.scenarios]),
    [onlyKey],
  );
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(1);
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const scenario = scenarios[active];
  const total = scenario.steps.length + 1; // steps + result row

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setShown(total);
      return;
    }
    if (shown < total) {
      const t = window.setTimeout(() => setShown((s) => s + 1), STEP_MS);
      return () => window.clearTimeout(t);
    }
    if (auto) {
      // With one scenario this replays it; with several it moves to the next.
      const t = window.setTimeout(() => {
        setActive((a) => (a + 1) % scenarios.length);
        setShown(1);
      }, PAUSE_MS);
      return () => window.clearTimeout(t);
    }
  }, [shown, total, auto, reduced, scenarios.length]);

  function select(index: number) {
    setAuto(false);
    setActive(index);
    setShown(reduced ? scenarios[index].steps.length + 1 : 1);
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + scenarios.length) % scenarios.length;
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="relative">
      {/* Soft glow behind the product frame. */}
      <div aria-hidden="true" className="absolute -inset-6 rounded-[32px] bg-blue-500/30 blur-3xl" />

      <div className="relative overflow-hidden rounded-card border border-white/20 bg-white text-ink-950 shadow-mock">
        <div
          role="tablist"
          aria-label="MindX examples"
          className={cn('flex gap-1 border-b border-gray-200 bg-gray-50 p-1.5', scenarios.length < 2 && 'hidden')}
        >
          {scenarios.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`demo-tab-${s.id}`}
                aria-selected={selected}
                aria-controls="demo-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onTabKeyDown}
                className={cn(
                  'relative flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-btn px-2 py-2 text-xs font-semibold transition-colors sm:text-small',
                  selected ? 'bg-white text-ink-950 shadow-[0_1px_2px_rgba(15,26,58,0.14)]' : 'text-gray-500 hover:text-ink-950',
                )}
              >
                <span className={cn('h-2 w-2 shrink-0 rounded-pill', workerDot[s.worker])} aria-hidden="true" />
                <span className="truncate">{s.tab}</span>
                {selected && !reduced && (
                  <span
                    aria-hidden="true"
                    className={cn('absolute bottom-0 left-0 h-0.5 transition-[width] duration-1000 ease-linear', workerBar[s.worker])}
                    style={{ width: `${Math.round((shown / total) * 100)}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${scenario.id}`} className="relative">
          <Illustrative />

          <div className="flex items-center gap-3 border-b border-gray-200 py-3 pl-4 pr-28">
            <WorkerTile worker={scenario.worker} size="sm" />
            <div className="min-w-0">
              <p className="text-small font-semibold leading-5">{scenario.workerName}</p>
              <p className="truncate text-xs text-gray-500">{scenario.header}</p>
            </div>
          </div>

          <div className="grid md:min-h-[420px] md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <ol className="space-y-3 p-4" aria-label="Conversation">
              {scenario.steps.map((step, i) => (
                <ConversationStep key={`${scenario.id}-${i}`} step={step} visible={i < shown} scenario={scenario} />
              ))}
            </ol>

            <div className="border-t border-gray-200 bg-gray-50 p-4 md:border-l md:border-t-0">
              <p className="t-eyebrow text-gray-500">{heroDemo.actionLogLabel}</p>
              <ol className="mt-3 space-y-2.5">
                {scenario.steps.map((step, i) =>
                  step.kind === 'action' ? (
                    <li key={`${scenario.id}-a${i}`} className={cn('flex items-start gap-2 text-small', reveal(i < shown))}>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-pill bg-success-soft text-success-strong">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1 leading-5">{step.text}</span>
                      <span className="shrink-0 text-xs leading-5 text-gray-500">{step.system}</span>
                    </li>
                  ) : null,
                )}
              </ol>
            </div>
          </div>

          <p
            className={cn(
              'flex flex-wrap gap-x-5 gap-y-1 border-t border-gray-200 px-4 py-3 text-small font-semibold',
              reveal(shown >= total),
            )}
          >
            {scenario.result.map((item, i) => (
              <span key={item} className={i === scenario.result.length - 1 ? 'text-success' : undefined}>
                {item}
              </span>
            ))}
          </p>

          {/* Decorative composer: the product's Ask/Work entry point. */}
          <div aria-hidden="true" className="flex items-center gap-2 border-t border-gray-200 px-3 py-3">
            <span className="flex shrink-0 rounded-pill bg-gray-50 p-0.5 text-xs font-semibold">
              {heroDemo.modes.map((mode) => (
                <span
                  key={mode}
                  className={cn(
                    'rounded-pill px-2.5 py-1 transition-colors',
                    mode === scenario.mode ? 'bg-white text-ink-950 shadow-[0_1px_2px_rgba(15,26,58,0.14)]' : 'text-gray-500',
                  )}
                >
                  {mode}
                </span>
              ))}
            </span>
            <span className="min-w-0 flex-1 truncate rounded-pill border border-gray-200 px-4 py-1.5 text-small text-gray-500">
              {heroDemo.composerPlaceholder}
            </span>
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-blue-600 text-white">
              <ArrowUp className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationStep({ step, visible, scenario }: { step: DemoStep; visible: boolean; scenario: Scenario }) {
  if (step.kind === 'action') return null;

  if (step.kind === 'chart') {
    return (
      <li className={cn('rounded-[14px] border border-gray-200 p-3', reveal(visible))}>
        <p className="text-xs font-semibold text-ink-700">{step.title}</p>
        <ul className="mt-2 space-y-1.5">
          {step.bars.map((bar) => (
            <li key={bar.label} className="grid grid-cols-[112px_minmax(0,1fr)_36px] items-center gap-2 text-xs">
              <span className="truncate text-ink-700">{bar.label}</span>
              <span className="h-2 overflow-hidden rounded-pill bg-gray-50">
                <span
                  className="block h-full rounded-pill bg-worker-brain transition-[width] duration-700 ease-out"
                  style={{ width: visible ? `${bar.value}%` : '0%' }}
                />
              </span>
              <span className="text-right font-semibold">{bar.value}%</span>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  if (step.kind === 'approval') {
    return (
      <li aria-hidden="true" className={cn('flex gap-2 pl-1', reveal(visible))}>
        <span className="rounded-btn bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">Approve</span>
        <span className="rounded-btn border border-gray-200 px-3 py-1.5 text-xs font-semibold text-ink-950">Edit</span>
      </li>
    );
  }

  const fromWorker = step.from === 'worker';
  return (
    <li className={cn('flex', fromWorker ? 'justify-start' : 'justify-end', reveal(visible))}>
      <div
        className={cn(
          'max-w-[90%] rounded-[14px] px-3 py-2 text-small',
          fromWorker ? cn('rounded-bl-sm', workerSoftBg[scenario.worker]) : 'rounded-br-sm border border-gray-200 bg-gray-50',
        )}
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-700">
          {fromWorker && <span className={cn('h-1.5 w-1.5 rounded-pill', workerDot[scenario.worker])} aria-hidden="true" />}
          {fromWorker ? scenario.workerName : step.from === 'merchant' ? 'You' : 'Customer'}
        </span>
        {step.text}
      </div>
    </li>
  );
}
