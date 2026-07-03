import { projects } from '@/data/projects';
import JsonLd from '@/components/seo/JsonLd';
import { buildProjectMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd, buildProjectJsonLd } from '@/lib/seo/json-ld';

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

export default async function ProjectSlugLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return children;
  }

  const description = project.fullDescription || project.description;

  return (
    <>
      <JsonLd
        data={[
          buildProjectJsonLd({
            title: project.title,
            description,
            slug: project.slug,
            image: project.image,
            liveUrl: project.liveUrl,
          }),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      {children}
    </>
  );
}
