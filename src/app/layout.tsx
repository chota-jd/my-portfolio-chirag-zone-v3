import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono, Instrument_Serif } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';

import { buildRootMetadata } from '@/lib/seo/metadata';
import SiteChrome from '@/components/layout/SiteChrome';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ThemeToggle from '@/components/ui/ThemeToggle';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/** Runs before paint so a saved dark preference never flashes light. */
const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}`;

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
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script defer src="/js/core-renderer.js"></script>
        <script defer src="/js/hero-project.js"></script>
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <ScrollToTop />
        <ThemeToggle />
        <SiteChrome>
          <div className="relative min-h-screen">
            <div className="relative z-10">{children}</div>
          </div>
        </SiteChrome>
        <GoogleAnalytics gaId="G-DLNVPSPP9T" />
      </body>
    </html>
  );
}
