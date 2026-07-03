'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/ui/Footer';

const NON_PUBLIC_PREFIXES = ['/admin', '/studio', '/api'] as const;

function isPublicRoute(pathname: string) {
  return !NON_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const showFooter = isPublicRoute(pathname) && !isHomePage;

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
}
