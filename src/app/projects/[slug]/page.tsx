'use client';

import { projects } from '@/data/projects';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProjectCaseStudyLayout from '@/components/projects/ProjectCaseStudyLayout';
import { markSkipIntroAndScrollTo } from '@/lib/homeNavigation';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[#4fc1c6] hover:underline"
            onClick={(e) => {
              e.preventDefault();
              markSkipIntroAndScrollTo('projects');
              router.push('/');
            }}
          >
            <ArrowLeft size={20} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectCaseStudyLayout project={project} />;
}
