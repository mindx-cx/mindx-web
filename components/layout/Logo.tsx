import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

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
      {/* The mark is a navy outline on transparent; render it white for dark backgrounds. */}
      <Image src="/brand/mx-mark.png" alt="" width={32} height={32} priority className="brightness-0 invert" />
      <span className="whitespace-nowrap text-[22px] font-bold leading-none tracking-tight">MindX AI</span>
    </Link>
  );
}
