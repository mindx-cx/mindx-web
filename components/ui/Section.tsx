import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** hero and cta are the signature gradients; keep text in their dark part. */
export type SectionTheme = 'dark' | 'light' | 'gray' | 'hero' | 'cta';

type SectionProps = {
  theme?: SectionTheme;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Accessible name when the section has no visible heading. */
  label?: string;
  /** Fade the content up when it scrolls into view. */
  reveal?: boolean;
  children: ReactNode;
};

const themes: Record<SectionTheme, string> = {
  dark: 'bg-navy-950 text-white',
  light: 'bg-white text-ink-950',
  gray: 'bg-gray-50 text-ink-950',
  hero: 'bg-hero text-white',
  cta: 'bg-cta text-white',
};

/** Page section with the A5 padding (112 px desktop, 72 px mobile) and container. */
export function Section({
  theme = 'light',
  id,
  className,
  containerClassName,
  label,
  reveal = false,
  children,
}: SectionProps) {
  return (
    <section id={id} aria-label={label} className={cn('py-section-m md:py-section', themes[theme], className)}>
      <div className={cn('container-x', containerClassName)} data-reveal={reveal ? '' : undefined}>
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'left' | 'center';
  onDark?: boolean;
  /** Heading level; pages keep one h1, so sections default to h2. */
  as?: 'h1' | 'h2';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = 'left',
  onDark = false,
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('max-w-text', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cn('t-eyebrow mb-3', onDark ? 'text-mint-400' : 'text-blue-600')}>{eyebrow}</p>}
      <Heading className={Heading === 'h1' ? 't-h1' : 't-h2'}>{title}</Heading>
      {body && <p className={cn('mt-4', onDark ? 'text-gray-300' : 'text-gray-500')}>{body}</p>}
    </div>
  );
}
