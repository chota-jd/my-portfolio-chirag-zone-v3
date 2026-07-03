'use client';

import ProjectsSection from '@/components/sections/ProjectsSection';

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <main className="relative z-10">
        <div className="container-custom py-12">
          <ProjectsSection hideHeader />
        </div>
      </main>
    </div>
  );
}
