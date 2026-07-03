import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata({
  title: 'Blog',
  description:
    'Articles on building products, performance engineering, and shipping ideas with clarity.',
  path: '/blog',
  keywords: ['Blog', 'Web Development', 'Next.js', 'Product Engineering'],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
