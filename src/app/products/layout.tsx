import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata({
  title: 'Products',
  description:
    'Enterprise-grade product contributions — document AI, collaboration tools, learning platforms, and more.',
  path: '/products',
  keywords: ['Products', 'SaaS', 'Enterprise', 'Contributions'],
});

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
