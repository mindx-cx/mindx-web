'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { announcement } from '@/content/site';
import { ANNOUNCEMENT_STORAGE_KEY } from '@/lib/announcement';

export function AnnouncementBar() {
  function dismiss() {
    document.documentElement.setAttribute('data-ann-dismissed', '');
    try {
      window.localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, announcement.id);
    } catch {
      // Storage blocked: the bar stays hidden for this page view only.
    }
  }

  return (
    <div data-announcement="" className="relative border-b border-white/[.08] bg-navy-950 text-small text-gray-300">
      <div className="container-x flex min-h-10 items-center justify-center py-2 pr-12 text-center md:pr-6">
        <p>
          {announcement.text}{' '}
          <Link href={announcement.href} className="whitespace-nowrap rounded-sm font-semibold text-mint-400 hover:brightness-[.94]">
            {announcement.linkLabel}
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-btn text-gray-300 hover:text-white"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
