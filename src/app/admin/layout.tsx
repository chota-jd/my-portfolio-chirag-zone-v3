import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata({
  title: 'Admin',
  description: 'Internal admin area.',
  path: '/admin',
  noIndex: true,
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin keeps the original dark look: scope the dark tokens to this subtree.
  return (
    <div data-theme="dark" className="min-h-screen bg-paper text-ink">
      {children}
    </div>
  );
}
