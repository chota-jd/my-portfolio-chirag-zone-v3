import type { Metadata, Viewport } from 'next';
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Portfolio Blog Studio',
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] w-full overflow-hidden bg-[#101112]">
      {children}
    </div>
  );
}
