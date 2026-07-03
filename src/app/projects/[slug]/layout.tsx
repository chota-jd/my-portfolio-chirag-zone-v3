import { projects } from '@/data/projects';
import { buildProjectMetadata } from '@/lib/seo/metadata';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Pick<LayoutProps, 'params'>) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return buildProjectMetadata({
    title: project.title,
    description: project.fullDescription || project.description,
    slug: project.slug,
    image: project.image,
    category: project.category,
    technologies: project.technologies,
  });
}

export default function ProjectSlugLayout({ children }: LayoutProps) {
  return children;
}
