import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata({
  title: 'Projects',
  description:
    'Case studies and shipped work — AI platforms, national-scale products, and adventure travel experiences.',
  path: '/projects',
  keywords: ['Projects', 'Case Studies', 'Full Stack', 'Portfolio'],
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
