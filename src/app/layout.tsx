import type { Metadata, Viewport } from "next";
import { Jost, Geist_Mono, Playfair_Display } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
// import AnimatedBackground from '@/components/ui/AnimatedBackground';

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Chirag Prajapati",
  description: "Passionate • Curious • Innovative - Crafting world-class digital experiences with cutting-edge technologies. I transform ideas into powerful, scalable solutions that make a difference.",
  keywords: ["Developer", "Portfolio", "Next.js", "React", "Full Stack", "Web Development"],
  authors: [{ name: "Chirag" }],
  creator: "Chirag",
    metadataBase: new URL('https://chirag-prajapati.vercel.app/'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chirag-prajapati.vercel.app/',
    title: 'Chirag Prajapati',
    description: 'Passionate • Curious • Innovative - Crafting world-class digital experiences with cutting-edge technologies. I transform ideas into powerful, scalable solutions that make a difference.',
    siteName: 'Chirag Prajapati',
    images: [
      {
        url: '/meta-image.webp',
        width: 1200,
        height: 630,
        alt: 'Chirag Prajapati',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chirag Prajapati',
    description: 'Passionate • Curious • Innovative - Crafting world-class digital experiences with cutting-edge technologies. I transform ideas into powerful, scalable solutions that make a difference.',
    images: ['/meta-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
};

export const viewport: Viewport = {
  width: "device-width",
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
      <body
        className={`${jost.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="relative min-h-screen">
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
