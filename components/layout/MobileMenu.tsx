'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WorkerTile } from '@/components/ui/WorkerTile';
import { companyNav, ctas, isLive, mainNav, productNav, type NavLink } from '@/content/site';
import { Logo } from './Logo';

function MenuGroup({ title, items, onNavigate }: { title: string; items: NavLink[]; onNavigate: () => void }) {
  return (
    <div className="border-b border-navy-700 py-4">
      <p className="t-eyebrow mb-2 text-gray-300">{title}</p>
      <ul>
        {items.filter(isLive).map((item) => (
          <li key={item.href}>
            <Link href={item.href} onClick={onNavigate} className="flex items-start gap-3 rounded-btn py-2.5">
              {item.worker && <WorkerTile worker={item.worker} className="mt-0.5" />}
              <span>
                <span className="block text-body-l-m font-semibold text-white">{item.label}</span>
                {item.description && <span className="block text-small text-gray-300">{item.description}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full-screen menu below lg (A6), with the primary button pinned at the bottom. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-white lg:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[60] flex flex-col bg-navy-950 text-white lg:hidden"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-navy-700">
            <Logo onClick={close} />
            <Dialog.Close
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-white"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pb-6">
            <MenuGroup title="Product" items={productNav} onNavigate={close} />
            <ul className="border-b border-navy-700 py-4">
              {mainNav.filter(isLive).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} className="block rounded-btn py-2.5 text-body-l-m font-semibold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MenuGroup title="Company" items={companyNav} onNavigate={close} />
            <a href={ctas.login.href} onClick={close} className="mt-4 block rounded-btn py-2.5 text-body-l-m font-semibold">
              {ctas.login.label}
            </a>
          </nav>

          <div className="container-x shrink-0 border-t border-navy-700 py-4">
            <Button href={ctas.brainScan.href} onClick={close} className="w-full">
              {ctas.brainScan.label}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
