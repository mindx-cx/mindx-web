import type { ReactNode } from 'react';
import { showPlaceholders } from '@/lib/config';

/**
 * Wraps [bracketed] placeholder text from the spec so it is easy to find and
 * replace. Highlighted in preview when NEXT_PUBLIC_SHOW_PLACEHOLDERS=true.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span
      data-placeholder=""
      className={
        showPlaceholders
          ? 'rounded-sm bg-[#FFF3A3] px-0.5 text-ink-950 outline-dashed outline-2 outline-offset-1 outline-[#B08900]'
          : undefined
      }
    >
      {children}
    </span>
  );
}

const PLACEHOLDER = /(\[[^\]]+\])/g;

/** Renders a copy string, wrapping every [bracketed] part in <Placeholder>. */
export function withPlaceholders(text: string): ReactNode {
  const parts = text.split(PLACEHOLDER);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? <Placeholder key={i}>{part}</Placeholder> : part,
  );
}

/** Copy without its [bracketed] placeholders, for structured data. */
export function stripPlaceholders(text: string): string {
  return text.replace(/\s*\[[^\]]+\]/g, '').trim();
}
