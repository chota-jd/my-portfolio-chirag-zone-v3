'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const tRedRef = useRef<HTMLDivElement>(null);
  const tDarkRef = useRef<HTMLDivElement>(null);
  const introBgRef = useRef<HTMLDivElement>(null);
  const nameLayerRef = useRef<HTMLDivElement>(null);

  const [isClient, setIsClient] = useState(false);
  const hasRunRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    // Split text into characters wrapped in outer/inner spans
    const splitIntoChars = (el: HTMLElement | null) => {
      if (!el) return [];
      const raw = el.textContent || '';
      el.innerHTML = '';
      const chars: HTMLElement[] = [];
      raw.split('').forEach((ch) => {
        const outer = document.createElement('span');
        outer.style.cssText =
          'display:inline-block;overflow:hidden;vertical-align:top;padding:0.15em 0.3em;margin:-0.15em -0.3em;';
        const inner = document.createElement('span');
        inner.className = 'char';
        inner.style.display = 'inline-block';
        inner.textContent = ch === ' ' ? '\u00A0' : ch;
        outer.appendChild(inner);
        el.appendChild(outer);
        chars.push(inner);
      });
      return chars;
    };

    const logoChars = splitIntoChars(logoRef.current);
    const firstNameChars = splitIntoChars(firstNameRef.current);
    const lastNameChars = splitIntoChars(lastNameRef.current);
    const allRevealEls = [...logoChars, ...firstNameChars, ...lastNameChars];

    const getCharGap = () => {
      if (!lastNameRef.current) return 0;
      return parseFloat(getComputedStyle(lastNameRef.current).fontSize) * 0.55;
    };

    const getViewportSize = () => {
      const root = document.documentElement;
      return {
        width: root.clientWidth || window.innerWidth,
        height: window.innerHeight,
      };
    };

    const isMobileViewport = () => {
      return getViewportSize().width <= 768;
    };

    const layoutNames = () => {
      if (!firstNameRef.current || !lastNameRef.current || !dotRef.current || !logoRef.current) return;
      const fs = parseFloat(getComputedStyle(lastNameRef.current).fontSize);
      if (!fs) return;
      const baselineOffset = -0.06;

      const firstNameLeft = firstNameRef.current.offsetLeft;
      const firstNameWidth = firstNameRef.current.offsetWidth;
      const gapPx = fs * 0.55;

      const lastNameLeftPx = firstNameLeft + firstNameWidth + gapPx;
      lastNameRef.current.style.left = lastNameLeftPx / fs + 'em';
      lastNameRef.current.style.top = baselineOffset + 'em';

      const dotLeftPx = lastNameLeftPx + lastNameRef.current.offsetWidth;
      dotRef.current.style.left = dotLeftPx / fs + 'em';
      dotRef.current.style.top = baselineOffset + 'em';
    };

    const getTotalWidth = () => {
      if (!logoRef.current || !firstNameRef.current || !lastNameRef.current || !dotRef.current) return 0;
      return (
        logoRef.current.offsetWidth +
        firstNameRef.current.offsetWidth +
        getCharGap() +
        lastNameRef.current.offsetWidth +
        dotRef.current.offsetWidth
      );
    };

    // Initialize layout
    layoutNames();

    gsap.set(logoRef.current, { opacity: 1 });
    gsap.set(firstNameRef.current, { opacity: 1 });
    gsap.set(lastNameRef.current, { opacity: 1 });
    gsap.set(allRevealEls, { yPercent: 110 });
    gsap.set(dotRef.current, { opacity: 0 });

    gsap.set([contentRef.current, tRedRef.current, tDarkRef.current], { willChange: 'transform' });

    let keepIntroNameAnchored = false;
    let nameAnchorRaf = 0;
    let introSettledXvw = 0;

    const placeIntroNameAtBottom = () => {
      if (!contentRef.current || !logoRef.current) return;
      layoutNames();
      const totalW = getTotalWidth();
      const offsetX = -(totalW / 2 - logoRef.current.offsetWidth / 2);
      const offsetX_vw = (offsetX / getViewportSize().width) * 100;
      introSettledXvw = offsetX_vw;
      const newH = contentRef.current.offsetHeight;
      const vh = getViewportSize().height;

      const bottomPad = isMobileViewport() ? Math.max(vh * 0.12, 80) : 80;
      const targetBottom = vh - bottomPad;
      const offsetY = targetBottom - newH / 2 - vh / 2;
      gsap.set(contentRef.current, { x: `${offsetX_vw}vw`, y: offsetY, transformOrigin: '50% 50%' });
    };

    const refreshIntroNameAnchor = () => {
      if (!keepIntroNameAnchored) return;
      if (nameAnchorRaf) cancelAnimationFrame(nameAnchorRaf);
      nameAnchorRaf = requestAnimationFrame(() => {
        nameAnchorRaf = 0;
        placeIntroNameAtBottom();
      });
    };

    window.addEventListener('resize', refreshIntroNameAnchor);

    const master = gsap.timeline({ delay: 0.2 });

    master
      .add(() => {
        layoutNames();
        if (contentRef.current && logoRef.current) {
          gsap.set(contentRef.current, { x: -(getTotalWidth() / 2 - logoRef.current.offsetWidth / 2) });
          gsap.set(firstNameRef.current, { x: 0 });
        }
      })
      .to(allRevealEls, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power3.out',
        stagger: { each: 0.025, from: 'center' },
      })
      .add(() => layoutNames())
      .to(dotRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      })
      .to({}, { duration: 0.3 })
      .add(() => {
        if (!contentRef.current || !logoRef.current || !dotRef.current || !firstNameRef.current || !lastNameRef.current) return;
        const mobile = isMobileViewport();
        const pad = mobile ? 20 : 48;
        const currentW = getTotalWidth();
        const viewportSize = getViewportSize();
        const targetW = viewportSize.width - pad * 2;
        const scale = targetW / currentW;

        const visualCenterX = getTotalWidth() / 2;
        const visualCenterY = contentRef.current.offsetHeight / 2;
        gsap.set(contentRef.current, { transformOrigin: `${visualCenterX}px ${visualCenterY}px` });

        const vh = viewportSize.height;
        const bottomPad = mobile ? Math.max(vh * 0.18, 110) : 80;
        const targetBottom = vh - bottomPad;
        const contentRect = contentRef.current.getBoundingClientRect();
        const curVisualCenterY = contentRect.top + visualCenterY;
        const targetVisualCenterY = targetBottom - (contentRef.current.offsetHeight * scale / 2);
        const deltaY = targetVisualCenterY - curVisualCenterY;

        const baseFontSize = parseFloat(getComputedStyle(logoRef.current).fontSize);
        const newFontSize = baseFontSize * scale;

        const applyFinalState = () => {
          if (!contentRef.current || !logoRef.current || !firstNameRef.current || !lastNameRef.current || !dotRef.current || !nameLayerRef.current) return;
          contentRef.current.style.visibility = 'hidden';
          gsap.set(contentRef.current, { scale: 1, x: 0, y: 0 });
          gsap.set(nameLayerRef.current, { mixBlendMode: 'difference' });
          
          const vwSize = (newFontSize / viewportSize.width) * 100;
          [logoRef.current, firstNameRef.current, lastNameRef.current, dotRef.current].forEach((el) => {
            el.style.fontSize = `${vwSize}vw`;
          });
          
          void contentRef.current.offsetWidth;
          placeIntroNameAtBottom();
          keepIntroNameAnchored = true;
          contentRef.current.style.visibility = 'visible';
        };

        gsap.to(contentRef.current, {
          scale: scale,
          y: `+=${deltaY}`,
          duration: 0.75,
          ease: 'power3.inOut',
          onComplete: () => {
            requestAnimationFrame(applyFinalState);
          },
        });
      })
      .to(tDarkRef.current, {
        y: '0%',
        duration: 0.45,
        ease: 'power3.inOut',
      }, '<+=0.05')
      .to(tRedRef.current, {
        y: '0%',
        duration: 0.45,
        ease: 'power3.inOut',
      }, '-=0.3')
      .add(() => {
        // Expose triggers/actions to the parent page when completed
        if (introBgRef.current) {
          introBgRef.current.style.display = 'none';
        }
        
        // Find hero and trigger fade reveals
        const hero = document.getElementById('hero');
        if (hero) {
          hero.style.opacity = '1';
        }

        // Run standard script reveals for hero content grid
        const introColItems = document.querySelectorAll('.hero-intro-col > *');
        const detailGroups = document.querySelectorAll('.details-group');

        gsap.to('#hero-bar', {
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.0,
          ease: 'power3.inOut',
        });

        if (introColItems.length || detailGroups.length) {
          gsap.fromTo(
            [...Array.from(introColItems), ...Array.from(detailGroups)],
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.08,
              ease: 'power3.out',
            }
          );
        }
      })
      .to(tRedRef.current, {
        y: '-100%',
        duration: 0.55,
        ease: 'power3.inOut',
      }, '+=0.05')
      .to(tDarkRef.current, {
        y: '-100%',
        duration: 0.55,
        ease: 'power3.inOut',
      }, '-=0.4')
      .to(nameLayerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '-=0.35')
      .add(() => {
        // Complete hook
        if (nameLayerRef.current) {
          nameLayerRef.current.style.display = 'none';
        }
        window.removeEventListener('resize', refreshIntroNameAnchor);
        if (nameAnchorRaf) cancelAnimationFrame(nameAnchorRaf);
        onComplete();
      });

    return () => {
      window.removeEventListener('resize', refreshIntroNameAnchor);
      if (nameAnchorRaf) cancelAnimationFrame(nameAnchorRaf);
      master.kill();
    };
  }, [isClient, onComplete]);

  if (!isClient) return null;

  return (
    <div ref={containerRef}>
      <div className="intro-bg" id="intro-bg" ref={introBgRef} />

      <div className="name-layer" id="name-layer" ref={nameLayerRef}>
        <div className="preloader-content" id="preloader-content" ref={contentRef}>
          <div id="preloader-logo" ref={logoRef}>C</div>
          <span id="preloader-luke" ref={firstNameRef}>hirag</span>
          <span id="preloader-baffait" ref={lastNameRef}> Prajapati</span>
          <span id="preloader-dot" ref={dotRef}>.</span>
        </div>
      </div>

      <div className="transition-panel" id="transition-panel">
        <div className="t-panel-dark" id="t-panel-dark" ref={tDarkRef} />
        <div className="t-panel-red" id="t-panel-red" ref={tRedRef} />
      </div>
    </div>
  );
}