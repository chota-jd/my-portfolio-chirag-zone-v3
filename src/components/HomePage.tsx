'use client';

import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';
import CinematicIntro from '@/components/CinematicIntro';

export default function HomePage({ children }: { children?: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#4fc1c6',
          colorBgContainer: '#111111',
          colorBgElevated: '#1a1a1a',
          colorBorder: '#333333',
          colorText: '#ffffff',
          colorTextSecondary: '#a1a1aa',
          borderRadius: 8,
        },
      }}
    >
      <div className="relative min-h-screen">
        <Navigation />
        <AnimatedBackground />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <IndustriesSection />
          <TechStackSection />
          <ExperienceSection />
          {children}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ConfigProvider>
  );
}
