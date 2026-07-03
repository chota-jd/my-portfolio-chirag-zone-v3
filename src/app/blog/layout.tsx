import { buildPageMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { buildBlogListingJsonLd } from '@/lib/seo/json-ld';

export const metadata = buildPageMetadata({
  title: 'Blog',
  description:
    'Articles on building products, performance engineering, and shipping ideas with clarity.',
  path: '/blog',
  keywords: ['Blog', 'Web Development', 'Next.js', 'Product Engineering'],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildBlogListingJsonLd()} />
      {children}
    </>
  );
}
