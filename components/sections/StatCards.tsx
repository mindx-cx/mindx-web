import { Card } from '@/components/ui/Card';

type Stat = { value: string; unit?: string; label: string; footnote?: string };

/** Stat cards (A7). Only for sourced numbers. */
export function StatCards({ items }: { items: readonly Stat[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {items.map((stat) => (
        <li key={stat.label}>
          <Card className="h-full">
            <p>
              <span className="t-stat text-ink-950">{stat.value}</span>
              {stat.unit && <span className="ml-2 text-small font-semibold text-gray-500">{stat.unit}</span>}
            </p>
            <p className="mt-3 text-ink-700">{stat.label}</p>
            {stat.footnote && <p className="mt-3 text-xs text-gray-500">{stat.footnote}</p>}
          </Card>
        </li>
      ))}
    </ul>
  );
}
