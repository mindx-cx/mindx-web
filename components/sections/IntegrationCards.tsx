import Image from 'next/image';
import { Mail, MessageSquare } from 'lucide-react';
import { cardLabels, levels, type Integration, type Level } from '@/content/integrations';
import { ctas } from '@/content/site';
import { cn } from '@/lib/cn';

/** Brand logo from /public/logos, our own icon for chat and email, or a letter badge. */
export function IntegrationLogo({ item, size = 40 }: { item: Integration; size?: 32 | 40 | 48 }) {
  const box = { 32: 'h-8 w-8', 40: 'h-10 w-10', 48: 'h-12 w-12' }[size];
  const inner = { 32: 'h-[18px] w-[18px]', 40: 'h-[22px] w-[22px]', 48: 'h-[26px] w-[26px]' }[size];
  const Icon = item.icon === 'mail' ? Mail : item.icon === 'chat' ? MessageSquare : null;
  return (
    <span aria-hidden="true" className={cn('inline-flex shrink-0 items-center justify-center rounded-row border border-line bg-white', box)}>
      {item.logo ? (
        <Image src={`/logos/${item.logo}.svg`} alt="" width={26} height={26} className={inner} />
      ) : Icon ? (
        <Icon className={cn(inner, 'text-brand')} />
      ) : (
        <span className="text-[15px] font-semibold text-muted-fg">{item.name.charAt(0)}</span>
      )}
    </span>
  );
}

const pillTone: Record<Level, string> = {
  brain: 'bg-signal-live/10 text-signal-live',
  support: 'bg-brand/10 text-brand',
  soon: 'bg-surface text-muted-fg',
};

export function LevelPill({ level }: { level: Level }) {
  return (
    <span className={cn('inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-semibold', pillTone[level])}>
      {levels[level].label}
    </span>
  );
}

/** A connectable integration: logo, name, level, what it does and a Connect button. */
export function IntegrationCard({ item, large = false }: { item: Integration; large?: boolean }) {
  return (
    <li className={cn('flex flex-col rounded-card border border-line bg-white shadow-card', large ? 'p-7 md:p-8' : 'p-5')}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <IntegrationLogo item={item} size={large ? 48 : 40} />
          <div>
            <h3 className={cn('font-semibold text-fg', large && 'text-[19px]')}>{item.name}</h3>
            <p className="text-xs text-muted-fg">{item.category}</p>
          </div>
        </div>
        <LevelPill level={item.level} />
      </div>
      {item.oneLine && <p className={cn('mt-4 flex-1 text-fg', large ? 'text-[16px]' : 'text-small')}>{item.oneLine}</p>}
      {item.reads && (
        <p className="mt-4 rounded-row bg-cream p-3 text-xs text-muted-fg">
          <span className="font-semibold text-fg">{cardLabels.reads}:</span> {item.reads}
        </p>
      )}
      <a
        href={ctas.brainScan.href}
        className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-ctl bg-surface text-[14px] font-medium text-fg transition-colors hover:bg-muted-bg"
      >
        {cardLabels.connect}
        <span className="sr-only"> {item.name}</span>
      </a>
    </li>
  );
}
