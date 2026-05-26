'use client';

import '@/sanity/ensure-react-effect-event';
import { Suspense, lazy, useEffect, useState } from 'react';

import StudioLoader from '@/components/studio/StudioLoader';
import config from '../../../../sanity.config';

const NextStudio = lazy(() =>
  import('next-sanity/studio/client-component').then((mod) => ({ default: mod.NextStudio })),
);

function isSanityStudioMounted() {
  return Boolean(
    document.querySelector('#sanity [data-testid="studio-layout"]') ||
      document.querySelector('#sanity [data-ui="Navbar"]') ||
      document.querySelector('#sanity [data-ui="CollapseMenuButton"]'),
  );
}

export default function StudioClient() {
  const [studioReady, setStudioReady] = useState(false);

  useEffect(() => {
    if (isSanityStudioMounted()) {
      setStudioReady(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (isSanityStudioMounted()) {
        setStudioReady(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const fallback = window.setTimeout(() => setStudioReady(true), 25000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      {!studioReady && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#101112]"
          role="status"
          aria-live="polite"
          aria-label="Loading Sanity Studio"
        >
          <StudioLoader fullScreen={false} />
        </div>
      )}

      <Suspense fallback={null}>
        <NextStudio config={config} />
      </Suspense>
    </>
  );
}
