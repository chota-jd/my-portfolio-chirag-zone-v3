/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, User, Briefcase, FolderOpen, Mail, Package, FileText } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Product', href: '/products', icon: Package },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

function isPageHref(href: string) {
  return href.startsWith('/');
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith('/products')) {
      setActiveSection('products');
    } else if (pathname.startsWith('/projects')) {
      setActiveSection('projects');
    } else if (pathname.startsWith('/blog')) {
      setActiveSection('blog');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname !== '/') return;

      const sections = navItems
        .filter((item) => !isPageHref(item.href))
        .map((item) => item.href.substring(1));
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
  }, [pathname]);

  const scrollToSection = (href: string) => {
    if (isPageHref(href)) {
      router.push(href);
      return;
    }

    if (pathname !== '/') {
      router.push(`/${href}`);
      return;
    }

    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isItemActive = (href: string) => {
    if (isPageHref(href)) {
      return pathname.startsWith(href);
    }
    return activeSection === href.substring(1);
  };

  const isBlogPostPage = Boolean(pathname?.match(/^\/blog\/[^/]+$/));
  const isBlogListing = pathname === '/blog';

  const navSurfaceClass = isBlogPostPage
    ? isScrolled
      ? 'border-b border-white/5 bg-black/80 py-0 backdrop-blur-xl'
      : 'border-b border-white/10 bg-black/25 py-0 backdrop-blur-xl'
    : isBlogListing
      ? 'border-b border-white/5 bg-black/80 py-0 backdrop-blur-xl'
      : isScrolled
        ? 'border-b border-white/5 bg-black/50 py-0 backdrop-blur-xl'
        : 'bg-black/20 py-2 backdrop-blur-md';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 hidden transition-all duration-300 md:block ${navSurfaceClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <BrandLogo scrollToSection={scrollToSection} />

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                const linkClass = `relative px-3 py-2 text-sm font-medium transition-colors hover:scale-105 active:scale-95 ${
                  active ? 'text-[#4fc1c6]' : 'text-gray-300 hover:text-white'
                }`;

                if (isPageHref(item.href)) {
                  return (
                    <Link key={item.name} href={item.href} className={linkClass}>
                      {item.name}
                      {active && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4fc1c6]" />
                      )}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className={linkClass}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4fc1c6]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Post hero sits under nav — listing/other pages keep spacer */}
      {!isBlogPostPage && <div className="hidden h-16 md:block" />}
    </>
  );
}
