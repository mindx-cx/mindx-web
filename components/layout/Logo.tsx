import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

// The MindX AI logo (3 Oct 2026): the MX outline monogram and wordmark,
// traced to SVG from the original artwork. The nav, mobile menu and footer
// are all on navy, so this is the all-white version; the blue-and-navy
// version (public/brand/mindx-ai-logo-color.svg) is for light backgrounds.
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="MindX AI home"
      className={cn('inline-flex shrink-0 items-center rounded-sm', className)}
    >
      <Image src="/brand/mindx-ai-logo-white.svg" alt="MindX AI" width={140} height={26} priority className="h-[26px] w-auto" />
    </Link>
  );
}
