'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ProjectsSection from '@/components/sections/ProjectsSection';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <AnimatedBackground />
      
      <main className="relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-custom py-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4 pb-4">
              Digital Innovations
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Turning complex challenges into elegant, high-performance digital solutions. 
              Explore a curated collection of my most impactful works and technical experiments.
            </p>
          </div>

          {/* We'll pass a prop to ProjectsSection to show all by default if needed, 
              but since it's a separate page, we can just let it render. 
              However, the current ProjectsSection has 'show 3' logic. 
              I should update ProjectsSection to accept a prop to show all. */}
          <ProjectsSection showAllDefault={true} hideViewMore={true} hideHeader={true} />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
