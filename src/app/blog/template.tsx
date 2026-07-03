'use client';

import ScrollToTop from '@/components/ui/ScrollToTop';

export default function BlogTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
