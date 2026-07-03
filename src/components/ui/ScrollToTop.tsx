'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { hasPendingHomeScroll } from '@/lib/homeNavigation';
import { clearScrollAnimationState, resetPageScroll } from '@/lib/scroll';

/** Resets window scroll on route change (e.g. homepage → /blog). */
export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const isHome = pathname === '/';
    const leftHome = prevPathname.current === '/' && !isHome;
    const restoreHomeSection = isHome && hasPendingHomeScroll();

    if (leftHome || !isHome) {
      clearScrollAnimationState();
    }

    if (!restoreHomeSection) {
      resetPageScroll();
    }

    prevPathname.current = pathname;
  }, [pathname]);

  // Shared layouts keep scroll position; Next.js can also restore after paint.
  useEffect(() => {
    if (pathname === '/' && hasPendingHomeScroll()) {
      return;
    }

    resetPageScroll();

    const raf = requestAnimationFrame(() => {
      resetPageScroll();
      requestAnimationFrame(resetPageScroll);
    });

    const timeouts = [0, 50, 150, 300].map((delay) =>
      window.setTimeout(resetPageScroll, delay)
    );

    return () => {
      cancelAnimationFrame(raf);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
}
