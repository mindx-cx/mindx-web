import { cn } from '@/lib/cn';

/**
 * The MX monogram, echoing the circle in the hero.
 *
 * What was here before was a headset-and-speech-bubble icon carried over from
 * the helpdesk product -- the wrong symbol for an Ecommerce Brain, and nothing
 * like the blue MX circle the hero leads with. It was also a 386px PNG scaled
 * to 26px and flattened with `brightness(0) invert(1)`, so it rendered as a
 * soft white blob.
 *
 * Drawn in markup rather than shipped as an asset: at this size it is two
 * letters in a rounded square, and the same two tokens the rest of the chrome
 * uses. The product's top bar renders the identical mark.
 */
export function MxMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex items-center justify-center rounded-[7px] bg-brand font-bold leading-none text-white',
        className,
      )}
    >
      MX
    </span>
  );
}
