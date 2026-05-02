'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ProductsSection from '@/components/sections/ProductsSection';
import { motion } from 'framer-motion';

export default function ProductsPage() {
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
              Product Contributions
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Collaborating on enterprise-grade solutions and high-impact digital products. 
              Explore the professional projects where I've contributed as a core team member.
            </p>
          </div>

          <ProductsSection showAllDefault={true} hideViewMore={true} hideHeader={true} />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
