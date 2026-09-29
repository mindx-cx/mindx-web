import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  theme?: 'light' | 'gray' | 'dark';
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'>;

// Light cards use borders, not shadows (A5).
const themes = {
  light: 'border-gray-200 bg-white text-ink-950',
  gray: 'border-gray-200 bg-gray-50 text-ink-950',
  dark: 'border-navy-700 bg-navy-900 text-white',
} as const;

export function Card({ theme = 'light', className, children, ...rest }: CardProps) {
  return (
    <div className={cn('rounded-card border p-6 md:p-8', themes[theme], className)} {...rest}>
      {children}
    </div>
  );
}
