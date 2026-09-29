import { Brain, Headset, ShoppingBag, TrendingUp, type LucideIcon } from 'lucide-react';
import type { WorkerId } from '@/content/site';
import { cn } from '@/lib/cn';

// One color and icon per AI Worker, like a product tile in an app switcher.
const workerStyles: Record<WorkerId, { icon: LucideIcon; bg: string }> = {
  brain: { icon: Brain, bg: 'bg-worker-brain' },
  resolve: { icon: Headset, bg: 'bg-worker-resolve' },
  convert: { icon: ShoppingBag, bg: 'bg-worker-convert' },
  grow: { icon: TrendingUp, bg: 'bg-worker-grow' },
};

const sizes = {
  sm: { box: 'h-8 w-8 rounded-[8px]', icon: 'h-4 w-4' },
  md: { box: 'h-10 w-10 rounded-[10px]', icon: 'h-5 w-5' },
  lg: { box: 'h-14 w-14 rounded-[14px]', icon: 'h-7 w-7' },
} as const;

type WorkerTileProps = {
  worker: WorkerId;
  size?: keyof typeof sizes;
  className?: string;
};

/** Decorative: always pair with the worker's name in text. */
export function WorkerTile({ worker, size = 'md', className }: WorkerTileProps) {
  const { icon: Icon, bg } = workerStyles[worker];
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex shrink-0 items-center justify-center text-white', bg, sizes[size].box, className)}
    >
      <Icon className={sizes[size].icon} strokeWidth={2} />
    </span>
  );
}
