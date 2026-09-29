import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

type Feature = { icon: LucideIcon; title: string; body?: string };

/** Icon + title (+ body) grid (A7 FeatureGrid). */
export function FeatureGrid({ items, columns = 3 }: { items: readonly Feature[]; columns?: 2 | 3 | 4 }) {
  return (
    <ul
      className={cn(
        'grid gap-4 sm:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
        columns === 4 && 'lg:grid-cols-4',
      )}
    >
      {items.map(({ icon: Icon, title, body }) => (
        <li key={title} className="rounded-card border border-gray-200 bg-white p-6">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-4 font-semibold text-ink-950">{title}</p>
          {body && <p className="mt-1 text-small text-ink-700">{body}</p>}
        </li>
      ))}
    </ul>
  );
}
