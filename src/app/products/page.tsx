'use client';

import Footer from '@/components/ui/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ProductsSection from '@/components/sections/ProductsSection';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <main className="relative z-10">
        <div className="container-custom py-12">
          <SectionHeading
            as="h1"
            spacing="sm"
            titleClassName="gradient-text text-5xl md:text-7xl"
            subtitle="Collaborating on enterprise-grade solutions and high-impact digital products. Explore the professional projects where I&apos;ve contributed as a core team member."
          >
            Product Contributions
          </SectionHeading>

          <ProductsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
