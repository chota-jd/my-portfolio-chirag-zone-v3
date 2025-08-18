/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Briefcase, FolderOpen, Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Tech Stack', href: '#techstack', icon: Code },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  // { name: 'Projects', href: '#projects', icon: FolderOpen },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Desktop */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${isScrolled ? 'backdrop-blur-md' : ''
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <BrandLogo scrollToSection={scrollToSection} />
            

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.href.substring(1)
                      ? 'text-[#4fc1c6]'
                      : 'text-gray-300 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4fc1c6]"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile */}
      {/* <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass border-b border-gray-800">
          <div className="px-4 py-3">
            <div className="flex justify-center items-center">
              <BrandLogo scrollToSection={scrollToSection} />
            </div>
          </div>
        </div>
      </motion.nav> */}

      {/* Mobile Bottom Tab */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="glass backdrop-blur-md border-t border-gray-800">
          <div className="px-1 py-2 safe-area-pb">
            <div className="grid grid-cols-5 gap-0.5 max-w-sm mx-auto">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.href.substring(1);

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 min-h-[60px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-[#4fc1c6] bg-opacity-10 rounded-lg"
                        layoutId="mobileActiveTab"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    <motion.div
                      className={`relative flex items-center justify-center w-7 h-7 mb-1 ${isActive ? 'text-[#4fc1c6]' : 'text-gray-400'
                        }`}
                      animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent size={18} />

                      {isActive && (
                        <motion.div
                          className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#4fc1c6] rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      )}
                    </motion.div>

                    <motion.span
                      className={`text-xs font-medium transition-colors leading-none ${isActive ? 'text-[#4fc1c6]' : 'text-gray-400'
                        }`}
                      animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                    >
                      {item.name === 'Tech Stack' ? 'Tech' : item.name}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer for desktop to prevent content from hiding behind fixed nav */}
      <div className="h-16 md:block hidden" />

      {/* Spacer for mobile to prevent content from hiding behind top and bottom nav */}
      <div className="pt-14 md:hidden block" /> 
    </>
  );
}