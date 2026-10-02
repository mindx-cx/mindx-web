import Link from 'next/link';
import { cn } from '@/lib/cn';
import { MxMark } from './MxMark';

// Uses the existing MX mark from the current site. Swap for public/logo.svg
// (spec A3) when a vector logo is available.
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="MindX AI home"
      className={cn('inline-flex shrink-0 items-center gap-2 rounded-sm text-white', className)}
    >
      <MxMark className="h-[26px] w-[26px] text-[10px] tracking-tight" />
      {/* The brand dot after the wordmark, as in the prototype: the only piece
          of brand colour in the nav, so the eye lands on it first. */}
      <span className="whitespace-nowrap text-[17px] font-bold leading-none tracking-tight">
        MindX<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
