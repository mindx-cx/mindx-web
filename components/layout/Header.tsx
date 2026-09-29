'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WorkerTile } from '@/components/ui/WorkerTile';
import { companyNav, ctas, isLive, mainNav, productNav, type NavLink } from '@/content/site';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

const navLinkClass =
  'inline-flex items-center gap-1 rounded-pill px-3 py-2 text-[15px] font-medium text-white transition-colors hover:text-mint-400';

function NavDropdown({ label, items }: { label: string; items: NavLink[] }) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className={cn(navLinkClass, 'group data-[state=open]:text-mint-400')}>
        {label}
        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={14}
          className="z-50 w-80 rounded-card border border-navy-700 bg-navy-900 p-2 shadow-mock"
        >
          {items.filter(isLive).map((item) => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link
                href={item.href}
                className="flex items-start gap-3 rounded-btn px-3 py-2.5 outline-none data-[highlighted]:bg-navy-700"
              >
                {item.worker && <WorkerTile worker={item.worker} className="mt-0.5" />}
                <span>
                  <span className="block text-[15px] font-semibold text-white">{item.label}</span>
                  {item.description && <span className="block text-small text-gray-300">{item.description}</span>}
                </span>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const SCROLL_THRESHOLD = 24;

/**
 * Floating pill nav from the current themindx.ai site (replaces the spec's
 * full-width header, decision 28 Sep 2026). The pill is a lighter navy with a
 * hairline border so it lifts off the navy hero, and gains its shadow once the
 * page scrolls under it. The wrapper is sticky and click-through; the negative
 * bottom margin lets the first (always dark) section run underneath it.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-40 -mb-[76px] h-[76px] px-3 pt-3 md:px-6">
      <div
        className={cn(
          'pointer-events-auto mx-auto flex h-16 max-w-[1160px] items-center justify-between gap-4 rounded-pill border border-white/[.14] bg-navy-850 pl-5 pr-2 transition-shadow duration-200 md:pl-6',
          scrolled ? 'shadow-nav' : 'shadow-none',
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <NavDropdown label="Product" items={productNav} />
          {mainNav.filter(isLive).map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <NavDropdown label="Company" items={companyNav} />
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href={ctas.login.href} className={navLinkClass}>
            {ctas.login.label}
          </Link>
          <Button href={ctas.brainScan.href} className="rounded-pill">
            {ctas.brainScan.label}
          </Button>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
