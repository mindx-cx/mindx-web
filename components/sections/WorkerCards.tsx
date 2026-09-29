import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { WorkerTile } from '@/components/ui/WorkerTile';
import type { WorkerCard } from '@/content/home';

/** Worker cards (A7): status chip Live (green dot) or Coming (violet-style soft chip). */
export function WorkerCards({ items }: { items: readonly WorkerCard[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.worker}>
          <Card className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3">
              <WorkerTile worker={item.worker} />
              <Chip tone={item.status === 'live' ? 'live' : 'soon'}>{item.statusLabel}</Chip>
            </div>
            <h3 className="t-h3 mt-5">{item.name}</h3>
            <p className="mt-2 flex-1 text-ink-700">{item.description}</p>
            <Button href={item.cta.href} variant="ghost" tone="light" className="mt-6 self-start">
              {item.cta.label}
            </Button>
          </Card>
        </li>
      ))}
    </ul>
  );
}
