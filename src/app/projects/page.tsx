'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <AnimatedBackground />
      
      <main className="relative z-10 pt-20">
        <div className="container-custom py-12">
          <SectionHeading
            as="h1"
            spacing="sm"
            titleClassName="text-5xl text-white md:text-7xl"
            subtitle="A curated portfolio of high-impact projects I&apos;ve contributed to with cross-functional teams, spanning civic platforms, inclusive learning, and public AI literacy."
          >
            Selected <span className="gradient-text">projects</span>
          </SectionHeading>

          {/* We'll pass a prop to ProjectsSection to show all by default if needed, 
              but since it's a separate page, we can just let it render. 
              However, the current ProjectsSection has 'show 3' logic. */}
          <ProjectsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
