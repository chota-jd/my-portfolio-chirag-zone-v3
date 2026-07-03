'use client';

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CinematicIntro from '@/components/CinematicIntro';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';
import {
  consumeSkipIntro,
  hasPendingHomeScroll,
  runPendingHomeScroll,
} from '@/lib/homeNavigation';

export default function HomePage({ children }: { children?: React.ReactNode }) {
  const [introFinished, setIntroFinished] = useState(false);
  const [introGateReady, setIntroGateReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = useCallback(() => {
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('is-ready');
    const heroBar = document.getElementById('hero-bar');
    if (heroBar) {
      gsap.set(heroBar, { opacity: 1, clipPath: 'inset(0 0 0% 0)' });
    }
    setIntroFinished(true);
  }, []);

  useLayoutEffect(() => {
    if (consumeSkipIntro()) {
      handleIntroComplete();
    }
    setIntroGateReady(true);
  }, [handleIntroComplete]);

  useLayoutEffect(() => {
    if (!introFinished) {
      document.documentElement.style.overflow = 'hidden';
      if (!hasPendingHomeScroll()) {
        window.scrollTo(0, 0);
      }
    } else {
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [introFinished]);

  useEffect(() => {
    if (!introFinished) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const lenis = new Lenis(
      isMobile
        ? {
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.1,
            touchMultiplier: 1.5,
            smoothWheel: false,
          }
        : { lerp: 0.06 }
    );
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cancelPendingScroll = runPendingHomeScroll(lenis, () => {
      ScrollTrigger.refresh();
    });

    // Fade out and translate up the preloader name signature as you scroll away from the Hero
    gsap.to('#name-layer', {
      opacity: 0,
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    const heroEl = document.getElementById('hero');
    if (heroEl) {
      ScrollTrigger.create({
        trigger: heroEl,
        start: 'bottom top',
        onEnter: () => heroEl.classList.add('is-offscreen'),
        onLeaveBack: () => heroEl.classList.remove('is-offscreen'),
      });
    }

    // Dynamic Scroll Timeline Indicators layout
    const sections = [
      { id: 'about', name: 'About' },
      { id: 'industries', name: 'Industries' },
      { id: 'skills', name: 'Skills' },
      { id: 'experience', name: 'Experience' },
      { id: 'projects', name: 'Projects' },
      { id: 'products', name: 'Products' },
      { id: 'blog', name: 'Blog' },
      { id: 'contact', name: 'Contact' },
    ];

    const timeline = timelineRef.current;
    const bar = barRef.current;
    const label = labelRef.current;
    const pctEl = pctRef.current;

    if (timeline && bar && label && pctEl && !isMobile) {
      bar.innerHTML = '';
      const segEls: { seg: HTMLDivElement; fill: HTMLDivElement }[] = [];

      const scrollY0 = window.scrollY || window.pageYOffset;
      const firstEl = document.getElementById(sections[0].id);
      const lastEl = document.getElementById(sections[sections.length - 1].id);

      if (firstEl && lastEl) {
        const zoneTop = firstEl.getBoundingClientRect().top + scrollY0;
        const zoneBottom = lastEl.getBoundingClientRect().top + lastEl.offsetHeight + scrollY0;
        const zoneH = zoneBottom - zoneTop;

        sections.forEach((sec) => {
          const el = document.getElementById(sec.id);
          if (el) {
            const ratio = el.offsetHeight / zoneH;

            const seg = document.createElement('div');
            seg.className = 'st-seg';
            seg.style.flex = ratio.toFixed(4);
            seg.title = sec.name;

            const fill = document.createElement('div');
            fill.className = 'st-seg-fill';
            
            seg.appendChild(fill);
            bar.appendChild(seg);

            seg.addEventListener('click', () => {
              const target = document.getElementById(sec.id);
              if (target) {
                lenis.scrollTo(target, { offset: 0, duration: 1.2 });
              }
            });

            segEls.push({ seg, fill });
          }
        });

        let currentActiveIdx = -1;

        // Scrubbing percentages and bars on tick
        ScrollTrigger.create({
          trigger: `#${sections[0].id}`,
          start: 'top bottom',
          endTrigger: `#${sections[sections.length - 1].id}`,
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress;

            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const pageP = docH > 0 ? Math.round((window.scrollY / docH) * 100) : 0;
            pctEl.textContent = `(${pageP})`;

            let activeIdx = 0;
            const viewportMid = window.innerHeight / 2;
            let found = false;

            // 1. Detect active index in viewport based on center crossing
            for (let i = 0; i < sections.length; i++) {
              const el = document.getElementById(sections[i].id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
                  activeIdx = i;
                  found = true;
                  break;
                }
              }
            }

            // Fallback: if no section crosses the middle, find the closest one
            if (!found) {
              let closestDist = Infinity;
              sections.forEach((sec, i) => {
                const el = document.getElementById(sec.id);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  const dist = Math.abs((rect.top + rect.bottom) / 2 - viewportMid);
                  if (dist < closestDist) {
                    closestDist = dist;
                    activeIdx = i;
                  }
                }
              });
            }

            const activeSectionId = sections[activeIdx]?.id;

            // Smoothly hide the scroll timeline and percentage indicator in the Products and Blog sections
            // to avoid layout overlaps on laptops (just like at the top/bottom of the page)
            if (progress <= 0 || progress >= 0.9 || activeSectionId === 'products' || activeSectionId === 'blog') {
              timeline.classList.remove('visible');
              pctEl.classList.remove('visible');
            } else {
              timeline.classList.add('visible');
              pctEl.classList.add('visible');
            }

            // 2. Update all segment fills based on actual viewport progress
            sections.forEach((sec, i) => {
              if (!segEls[i]) return;
              
              if (i < activeIdx) {
                segEls[i].fill.style.height = '100%';
              } else if (i > activeIdx) {
                segEls[i].fill.style.height = '0%';
              } else {
                // Currently active section fill
                const el = document.getElementById(sec.id);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  const totalH = rect.height || 1;
                  const passed = viewportMid - rect.top;
                  const inner = Math.min(1, Math.max(0, passed / totalH));
                  segEls[i].fill.style.height = `${(inner * 100).toFixed(1)}%`;
                }
              }
            });

            if (activeIdx !== currentActiveIdx) {
              if (currentActiveIdx === -1) {
                label.textContent = sections[activeIdx].name;
              } else {
                label.classList.add('changing');
                setTimeout(() => {
                  label.textContent = sections[activeIdx].name;
                  label.classList.remove('changing');
                }, 150);
              }
              currentActiveIdx = activeIdx;
            }

            label.style.top = `${(progress * 100).toFixed(1)}%`;
          },
        });
      }
    }

    return () => {
      cancelPendingScroll?.();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [introFinished]);

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      {introGateReady && !introFinished && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      <main className={`relative z-10 ${!introFinished ? 'pointer-events-none' : ''}`}>
        <HeroSection />
        <AboutSection />
        <IndustriesSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ProductsSection showPageLink />
        {children}
        <ContactSection />
      </main>

      <Footer />

      {/* Left Percentage Indicator */}
      <div className="scroll-pct hidden" id="scroll-pct" ref={pctRef}>
        (0)
      </div>

      {/* Right Scroll Segment Indicator */}
      <div className="scroll-timeline" id="scroll-timeline" ref={timelineRef}>
        <span className="st-label" id="st-label" ref={labelRef}></span>
        <div className="st-bar" id="st-bar" ref={barRef}></div>
      </div>
    </div>
  );
}
