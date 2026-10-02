import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** inverse = white button for blue gradient backgrounds, where blue would blend in. */
type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'brand' | 'nav';
/** The background the button sits on. Affects secondary and ghost colors. */
type Tone = 'dark' | 'light';

type CommonProps = {
  variant?: Variant;
  tone?: Tone;
  /** Trailing arrow icon. Defaults to true for ghost buttons. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >;

export type ButtonProps = LinkProps | NativeButtonProps;

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-[filter,background-color] duration-150 disabled:pointer-events-none disabled:opacity-40';

// The old variants share one size; `brand` and `nav` set their own, so the
// shared size must not be in `base` or it would win on specificity order.
const legacySize = 'text-btn font-semibold';

function variantClasses(variant: Variant, tone: Tone): string {
  switch (variant) {
    // Prototype v3. These two carry YouSpot's own measurements rather than our
    // scale: 9px radius on both, but the main CTA is bigger and heavier
    // (15px/700, 14x28) than the nav button (14px/500, 8x16). The size gap is
    // what makes one read as the page's action and the other as chrome.
    case 'brand':
      return 'rounded-ctl bg-brand px-7 py-3.5 text-[15px] font-bold leading-5 text-white hover:bg-brand-dark';
    case 'nav':
      return 'rounded-ctl bg-brand px-4 py-2 text-[14px] font-medium leading-5 text-white hover:bg-brand-dark';
    case 'primary':
      // #1358D0 with white text passes AA (6.3:1). Hover: 6% darker (A5).
      return 'h-12 rounded-btn bg-blue-600 px-5 text-white hover:brightness-[.94]';
    case 'inverse':
      return 'h-12 rounded-btn bg-white px-5 text-navy-950 hover:brightness-[.94]';
    case 'secondary':
      return cn(
        'h-12 rounded-btn border-[1.5px] bg-transparent px-5',
        tone === 'dark'
          ? 'border-white text-white hover:bg-white/[.06]'
          : 'border-ink-950 text-ink-950 hover:bg-navy-950/[.06]',
      );
    case 'ghost':
      return cn('rounded-sm hover:brightness-[.94]', tone === 'dark' ? 'text-mint-400' : 'text-blue-600');
  }
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', tone = 'dark', arrow, className, children, ...rest } = props;
  const showArrow = arrow ?? variant === 'ghost';
  const sized = variant === 'brand' || variant === 'nav' ? '' : legacySize;
  const classes = cn(base, sized, variantClasses(variant, tone), className);
  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
