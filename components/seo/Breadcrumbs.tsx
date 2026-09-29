import { siteUrl } from '@/lib/config';
import { JsonLd } from './JsonLd';

/** BreadcrumbList structured data for inner pages (A11): Home › Page. */
export function Breadcrumbs({ name, path }: { name: string; path: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name, item: `${siteUrl}${path}` },
        ],
      }}
    />
  );
}
