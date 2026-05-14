/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { Home, User, Briefcase, FolderOpen, Mail, Package } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Product', href: '#products', icon: Package },
  { name: 'Projects', href: '#projects', icon: FolderOpen },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.substring(1));
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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          isScrolled
            ? 'bg-black/50 backdrop-blur-xl border-b border-white/5 py-0'
            : 'bg-black/20 backdrop-blur-md py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <BrandLogo scrollToSection={scrollToSection} />

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors hover:scale-105 active:scale-95 ${activeSection === item.href.substring(1) ? 'text-[#4fc1c6]' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4fc1c6]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16 md:block hidden" />
    </>
  );
}
