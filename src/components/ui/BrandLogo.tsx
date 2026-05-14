/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';

export default function BrandLogo({ scrollToSection }: { scrollToSection: (href: string) => void }) {
  const captions = [
    'Infinite artistry and innovation',
    'Cinematic. Creative. Coded.',
    'Where imagination compiles',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % captions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center sm:items-start cursor-pointer tablet:hidden transition-transform hover:scale-105 active:scale-95"
      onClick={() => scrollToSection('#home')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToSection('#home');
        }
      }}
    >
      <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-teal-300 to-cyan-500 bg-clip-text text-transparent">
        {`<Creavium />`}
      </span>

      <div className="h-5 mt-0.5 overflow-hidden relative w-full max-w-[20rem] sm:max-w-none">
        <span
          key={captions[currentIndex]}
          className="text-xs text-gray-400 uppercase tracking-[0.15em] block transition-opacity duration-300"
        >
          {captions[currentIndex]}
        </span>
      </div>
    </div>
  );
}
