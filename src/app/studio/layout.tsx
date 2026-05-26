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
    <div className="studio-shell fixed inset-0 z-[100] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#101112]">
      {children}
    </div>
  );
}
