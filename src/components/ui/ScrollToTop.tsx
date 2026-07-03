'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

function resetScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Resets window scroll on route change (e.g. homepage → /blog). */
export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    resetScroll();
  }, [pathname]);

  // Fallback: Next.js can restore scroll position after layout paint.
  useEffect(() => {
    resetScroll();
    const raf = requestAnimationFrame(resetScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
