import { cn } from '@/lib/cn';

/**
 * "Illustrative" pill for any mock that shows sample data (A0 rules).
 * The parent must be position: relative.
 */
export function Illustrative({ label = 'Illustrative', className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute right-3 top-3 z-10 rounded-pill bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-500',
        className,
      )}
    >
      {label}
    </span>
  );
}
