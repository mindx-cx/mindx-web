import Link from 'next/link';
import { footer, isLive, site } from '@/content/site';
import { CookieSettingsLink } from './CookieSettingsLink';
import { Logo } from './Logo';
import { GoogleFormEmbed } from '@/components/forms/GoogleFormEmbed';

const linkClass = 'rounded-sm text-small text-gray-300 transition-colors hover:text-white';

/** Footer (A6, B10.2): four link columns, newsletter, bottom line. */
export function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-950 text-white">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-small text-gray-300">{site.tagline}</p>
            <div className="mt-8">
              <GoogleFormEmbed form="newsletter" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="t-eyebrow text-white">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.filter(isLive).map((link) => (
                    <li key={link.label}>
                      {'action' in link && link.action === 'cookie-settings' ? (
                        <CookieSettingsLink label={link.label} className={linkClass} />
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-navy-700 pt-6 text-small text-gray-300">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
