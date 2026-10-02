'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ctas, mainNav, isLive } from '@/content/site';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

const navLinkClass =
  'rounded-sm px-3 py-2 text-[14px] font-medium text-white/80 transition-colors hover:text-white';

/**
 * Prototype v3 nav: 56px tall, flat `chrome`, and deliberately no bottom
 * border -- the bar and the page meet as two blocks of colour, which is what
 * stops the site reading as a header stuck on top of a document.
 *
 * It is not sticky and not a floating pill any more. The product's top bar is
 * the same height and the same colour, so a merchant signing in sees the bar
 * stay put while the page under it changes. That continuity is the whole point
 * of the three-colour system; a pill that floats and shrinks on scroll breaks
 * it the moment the product's fixed bar appears.
 */
export function Header() {
  return (
    <header className="bg-chrome">
      <div className="mx-auto flex h-14 max-w-container items-center justify-between gap-4 px-4 md:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {mainNav.filter(isLive).map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {/* A plain anchor, not next/link: /app is a different application behind the
          same nginx, not a route in this Next.js site. <Link> client-routes to it
          and prefetches an RSC payload at /app/signin/index.txt, which does not
          exist -- the login button 404ed on a file nobody asked for. */}
          <a href={ctas.login.href} className={navLinkClass}>
            Sign in
          </a>
          <Button href={ctas.brainScan.href} variant="nav" arrow={false}>
            {ctas.brainScan.label}
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
