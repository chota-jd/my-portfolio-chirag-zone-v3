import type { Metadata, Viewport } from 'next';
import { Jost, Geist_Mono, Playfair_Display } from 'next/font/google';

import { buildRootMetadata } from '@/lib/seo/metadata';
import SiteChrome from '@/components/layout/SiteChrome';
import ScrollToTop from '@/components/ui/ScrollToTop';

import './globals.css';

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = buildRootMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script defer src="/js/core-renderer.js"></script>
        <script defer src="/js/hero-project.js"></script>
      </head>
      <body
        className={`${jost.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        <ScrollToTop />
        <SiteChrome>
          <div className="relative min-h-screen">
            <div className="relative z-10">{children}</div>
          </div>
        </SiteChrome>
      </body>
    </html>
  );
}
