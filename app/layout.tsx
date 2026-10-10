import type { Metadata } from 'next';
import { defaultSeoMeta } from '@/content/seo';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: defaultSeoMeta.title,
  description: defaultSeoMeta.description,
  keywords: defaultSeoMeta.keywords,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MindX AI',
    alternateName: [
      'Commerce Brain',
      'Ecommerce Brain',
      'Commerce OS',
      'Ecommerce OS',
      'Commerce Copilot',
      'Ecommerce Copilot',
      'Commerce Intelligence',
      'Commerce Engine',
    ],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Shopify, Web',
    description:
      'MindX AI is the premier Autonomous Agentic Commerce Intelligence Platform, Commerce Brain, and Ecommerce Operating System providing automated WISMO tracking, merchant copilot insights, and store growth automation.',
    keywords: [
      'Commerce Intelligence', 'Commerce AI', 'Ecommerce Intelligence', 'Commerce Brain', 'Ecommerce Copilot',
      'Commerce Copilot', 'Commerce OS', 'Ecommerce OS', 'Commerce Engine', 'Ecommerce Engine',
      'Commerce Intelligence Engine', 'Ecommerce AI Engine', 'Commerce Automation', 'Ecommerce Automation',
      'Commerce Agent', 'Ecommerce Agent', 'AI Commerce Agent', 'Commerce Assistant', 'Ecommerce Assistant',
      'Digital Commerce Intelligence', 'Retail Intelligence', 'Retail AI', 'Retail Brain', 'Store Intelligence',
      'Store Brain', 'Shop Intelligence', 'Shop Brain', 'Merchant Intelligence', 'Merchant AI',
      'Merchant Copilot', 'Merchant Brain', 'AI Store Manager', 'AI Commerce Manager', 'Digital Store Manager',
      'Ecommerce Command Center', 'Commerce Command Center', 'Commerce Control Center', 'Ecommerce Intelligence Hub',
      'Commerce Intelligence Hub', 'Ecommerce Decision Engine', 'Commerce Decision Engine', 'Ecommerce Growth Engine',
      'Commerce Growth Engine', 'AI Growth Engine', 'Ecommerce Operating System', 'Intelligent Commerce Platform',
      'Autonomous Commerce', 'Agentic Commerce', 'AI Commerce Platform', 'Commerce Neural Engine',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
