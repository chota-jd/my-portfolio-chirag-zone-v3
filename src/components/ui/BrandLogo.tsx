/* eslint-disable react-hooks/exhaustive-deps */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BrandLogo({ scrollToSection }: { scrollToSection: (href: string) => void }) {
  const captions = [
    'Infinite artistry and innovation',
    'Cinematic. Creative. Coded.',
    'Where imagination compiles'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % captions.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
  className="flex flex-col items-center sm:items-start cursor-pointer tablet:hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => scrollToSection('#home')}
    >
      <motion.span
        className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-teal-300 to-cyan-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {`<Creavium />`}
      </motion.span>

      <div className="h-5 mt-0.5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={captions[currentIndex]}
            className="text-xs text-gray-400 uppercase tracking-[0.15em] block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            {captions[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
