import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * live/beta/soon/neutral: availability labels (A7).
 * success/warning/danger/info/discovery: outcome status in mocks and product UI
 * (resolved, needs approval, escalated, in progress, AI suggestion).
 */
export type ChipTone =
  | 'live'
  | 'beta'
  | 'soon'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'discovery';

type ChipProps = {
  tone?: ChipTone;
  /** Set when the chip sits on a dark (navy) background. */
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

// Live and Beta use a colored dot with high-contrast text: green or amber text
// on a pale background would fail the 4.5:1 contrast rule (A12).
const dotColor: Partial<Record<ChipTone, string>> = {
  live: 'bg-status-live',
  beta: 'bg-status-beta',
};

const semantic: Partial<Record<ChipTone, string>> = {
  soon: 'bg-blue-50 text-blue-600',
  success: 'bg-success-soft text-success-strong',
  warning: 'bg-warning-soft text-warning-strong',
  danger: 'bg-danger-soft text-danger-strong',
  info: 'bg-info-soft text-info-strong',
  discovery: 'bg-discovery-soft text-discovery-strong',
};

export function Chip({ tone = 'neutral', onDark = false, className, children }: ChipProps) {
  const surface =
    semantic[tone] ??
    (onDark
      ? 'border border-navy-700 bg-navy-900 text-white'
      : tone === 'neutral'
        ? 'border border-gray-200 bg-gray-50 text-gray-500'
        : 'border border-gray-200 bg-white text-ink-950');

  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-semibold', surface, className)}
    >
      {dotColor[tone] && <span className={cn('h-1.5 w-1.5 rounded-pill', dotColor[tone])} aria-hidden="true" />}
      {children}
    </span>
  );
}
