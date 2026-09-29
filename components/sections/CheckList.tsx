import { CircleCheck } from 'lucide-react';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { cn } from '@/lib/cn';

/** A short list of rules or promises, each with a check icon. */
export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
          <span className="text-ink-950">{withPlaceholders(item)}</span>
        </li>
      ))}
    </ul>
  );
}
