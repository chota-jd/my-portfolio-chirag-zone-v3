'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChrHover } from '@/components/ui/ChrHover';

const POOLS = [
  ' ',
  '·.,',
  ':;`-~^',
  '=+<>?!:;',
  '|/\\()[]{}«»',
  '÷×±≈≠≤≥∞∑∏√∫',
  '¤†‡§¶©®™°¬',
  '%&#$@¥€£¢',
];

function imageToAscii(img: HTMLImageElement, cols: number) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  };

  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  if (!ctx) return { text: '', poolGrid: [] as number[][] };

  const aspect = img.height / img.width;
  const charAspect = 1.0;
  const rows = Math.round(cols * aspect * charAspect);
  c.width = cols;
  c.height = rows;
  ctx.drawImage(img, 0, 0, cols, rows);
  const data = ctx.getImageData(0, 0, cols, rows).data;
  const lines: string[] = [];
  const poolGrid: number[][] = [];

  for (let y = 0; y < rows; y++) {
    let line = '';
    const poolRow: number[] = [];
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];
      if (a < 15) {
        line += ' ';
        poolRow.push(-1);
        continue;
      }
      let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      brightness *= a / 255;
      let pi = Math.floor(brightness * (POOLS.length - 1) * 0.8);
      pi = Math.min(pi, POOLS.length - 1);
      const pool = POOLS[pi];
      line += pool[Math.floor(rand() * pool.length)];
      poolRow.push(pi);
    }
    lines.push(line);
    poolGrid.push(poolRow);
  }
  return { text: lines.join('\n'), poolGrid };
}

function setupAsciiHover(preEl: HTMLPreElement, poolGrid: number[][]) {
  let origLines: string[] | null = null;
  let origGrid: string[][] | null = null;
  let mxC = -1000,
    myC = -1000;
  const radius = 2.5;
  const cols = poolGrid[0] ? poolGrid[0].length : 1;
  const rows = poolGrid.length;
  const noise: number[][] = [];
  const hitTime: number[][] = [];
  const cellDuration: number[][] = [];

  for (let ny = 0; ny < rows; ny++) {
    const nr: number[] = [],
      ht: number[] = [],
      cd: number[] = [];
    for (let nx = 0; nx < cols; nx++) {
      const h = (Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453 % 1 + 1) % 1;
      nr.push(h * 5 - 2.5);
      ht.push(0);
      cd.push(h > 0.5 ? 200 : 100);
    }
    noise.push(nr);
    hitTime.push(ht);
    cellDuration.push(cd);
  }

  let animating = false;

  const initGrid = () => {
    origLines = preEl.textContent ? preEl.textContent.split('\n') : [];
    origGrid = origLines.map((l) => l.split(''));
  };

  const esc = (ch: string) => {
    if (ch === '<') return '&lt;';
    if (ch === '>') return '&gt;';
    if (ch === '&') return '&amp;';
    return ch;
  };

  const tick = () => {
    const now = performance.now();
    let anyActive = false;
    let html = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const pi = poolGrid[y][x];
        if (pi < 0 || pi === 0) {
          html += ' ';
          continue;
        }
        const elapsed = now - hitTime[y][x];
        if (hitTime[y][x] > 0 && elapsed < cellDuration[y][x]) {
          anyActive = true;
          const idx = POOLS.length - 1 - pi;
          const pool = POOLS[idx];
          const ch = pool[Math.floor(Math.random() * pool.length)];
          html += `<span style="color:#0a0a0a;background:#ff3b14">${esc(ch)}</span>`;
        } else if (origGrid?.[y]) {
          html += esc(origGrid[y][x]);
        } else {
          html += ' ';
        }
      }
      html += '\n';
    }
    preEl.innerHTML = html;
    if (anyActive) {
      requestAnimationFrame(tick);
    } else {
      animating = false;
      if (origLines) preEl.textContent = origLines.join('\n');
    }
  };

  preEl.addEventListener('mousemove', (e) => {
    if (!origGrid) initGrid();
    const rect = preEl.getBoundingClientRect();
    const charW = rect.width / cols;
    const charH = rect.height / rows;
    mxC = (e.clientX - rect.left) / charW;
    myC = (e.clientY - rect.top) / charH;

    const now = performance.now();
    const maxR = radius + 3;
    const yMin = Math.max(0, Math.floor(myC - maxR));
    const yMax = Math.min(rows - 1, Math.ceil(myC + maxR));
    const xMin = Math.max(0, Math.floor(mxC - maxR));
    const xMax = Math.min(cols - 1, Math.ceil(mxC + maxR));

    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        const dx = x - mxC,
          dy = y - myC;
        if (dx * dx + dy * dy < (radius + noise[y][x]) * (radius + noise[y][x])) {
          hitTime[y][x] = now;
        }
      }
    }
    if (!animating) {
      animating = true;
      tick();
    }
  });

  preEl.addEventListener('mouseleave', () => {
    mxC = -1000;
    myC = -1000;
  });
}

function loadAsciiArt(
  src: string,
  preEl: HTMLPreElement | null,
  cols: number
) {
  if (!preEl) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const result = imageToAscii(img, cols);
    preEl.textContent = result.text;
    setupAsciiHover(preEl, result.poolGrid);
  };
  img.src = src;
}

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const footerRef = useRef<HTMLDivElement>(null);
  const asciiLeftRef = useRef<HTMLPreElement>(null);
  const asciiRightRef = useRef<HTMLPreElement>(null);

  // ASCII art on every page
  useEffect(() => {
    loadAsciiArt('/images/footer/left.png', asciiLeftRef.current, 80);
    loadAsciiArt('/images/footer/right.png', asciiRightRef.current, 80);
  }, [pathname]);

  // Homepage scroll-driven reveal + parallax
  useEffect(() => {
    if (!isHomePage) return;

    gsap.registerPlugin(ScrollTrigger);

    const asciiLeftWrap = document.querySelector('.footer-ascii.left');
    const asciiRightWrap = document.querySelector('.footer-ascii.right');

    if (asciiLeftWrap && asciiRightWrap) {
      gsap.fromTo(
        asciiLeftWrap,
        { xPercent: -100 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#footer-transition',
            start: 'top bottom+=500',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        asciiRightWrap,
        { xPercent: 100 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#footer-transition',
            start: 'top bottom+=500',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }

    const leftPre = asciiLeftRef.current;
    const rightPre = asciiRightRef.current;
    let mx = 0,
      my = 0,
      sx = 0,
      sy = 0;
    let footerVisible = false;

    const visibilityTrigger = ScrollTrigger.create({
      trigger: '#footer-transition',
      start: 'top bottom',
      end: 'bottom bottom',
      onEnter: () => {
        footerVisible = true;
      },
      onLeaveBack: () => {
        footerVisible = false;
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    document.addEventListener('mousemove', handleMouseMove);

    let rafId = 0;
    const parallaxLoop = () => {
      if (footerVisible) {
        sx += (mx - sx) * 0.05;
        sy += (my - sy) * 0.05;
        const lx = Math.min(0, sx * -15 - 15);
        const rx = Math.max(0, sx * 15 + 15);
        const py = sy * -10;
        if (leftPre) leftPre.style.transform = `translate(${lx}px, ${py}px)`;
        if (rightPre) rightPre.style.transform = `translate(${rx}px, ${py}px)`;
      }
      rafId = requestAnimationFrame(parallaxLoop);
    };
    parallaxLoop();

    const footerEl = document.getElementById('footer');
    const createdTriggers: ScrollTrigger[] = [visibilityTrigger];

    if (footerEl) {
      createdTriggers.push(
        ScrollTrigger.create({
          trigger: '#footer-transition',
          start: 'top bottom',
          end: 'bottom bottom',
          onEnter: () => {
            footerEl.style.visibility = 'visible';
          },
          onLeaveBack: () => {
            footerEl.style.visibility = 'hidden';
          },
        })
      );
    }

    const footerRoot = footerRef.current;
    const footerCenter = document.querySelector('.footer-center');

    if (footerRoot) {
      createdTriggers.push(
        ScrollTrigger.create({
          trigger: '#footer-transition',
          start: 'top bottom',
          end: 'bottom bottom',
          onUpdate: (self) => {
            footerRoot.classList.toggle('footer-vivid', self.progress > 0.52);
          },
          onLeaveBack: () => {
            footerRoot.classList.remove('footer-vivid');
          },
        })
      );
    }

    if (footerCenter) {
      const centerTween = gsap.fromTo(
        footerCenter,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#footer-transition',
            start: 'top bottom-=120',
            end: 'top center',
            scrub: true,
          },
        }
      );
      const centerSt = centerTween.scrollTrigger;
      if (centerSt) createdTriggers.push(centerSt);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      createdTriggers.forEach((st) => st.kill());
    };
  }, [isHomePage]);

  const homeSectionHref = (id: string) => (isHomePage ? `#${id}` : `/#${id}`);

  const primaryNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: homeSectionHref('about') },
    { label: 'Contact', href: homeSectionHref('contact') },
  ] as const;

  const secondaryNavLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Products', href: '/products' },
    { label: 'Blog', href: '/blog' },
  ] as const;

  return (
    <>
      {isHomePage && <div className="footer-transition" id="footer-transition" />}

      <footer
        className={`footer${isHomePage ? '' : ' footer--static footer-vivid'}`}
        id="footer"
        ref={footerRef}
      >
        <div className="footer-content" id="footer-content">
          <div className="footer-center-wrap">
            <div className="footer-center">
              <h2 className="footer-title">
                LET&apos;S CREATE <br />
                <span className="other-accent text-accent-orange">SOMETHING NEW.</span>
              </h2>
              <p className="footer-subtitle">
                Have an idea, a freelance proposal, or just want to collaborate? My inbox is always
                open. Let&apos;s build something exceptional together.
              </p>
              <div className="footer-cta">
                <ChrHover
                  text="GET IN TOUCH 🡺"
                  href="mailto:chirag.wok@gmail.com"
                  className="footer-cta-btn"
                />
              </div>
            </div>
          </div>

          <div className="footer-top">
            <div className="footer-top-col">
              <span className="footer-col-label">INQUIRIES</span>
              <ChrHover text="chirag.wok@gmail.com" href="mailto:chirag.wok@gmail.com" className="footer-mail" />
              <span className="footer-date-text">© 2026 Chirag Prajapati</span>
            </div>

            <div className="footer-top-right">
              <nav className="footer-top-col" aria-label="Primary pages">
                {primaryNavLinks.map((link) => (
                  <ChrHover key={link.href} text={link.label} href={link.href} />
                ))}
              </nav>

              <nav className="footer-top-col" aria-label="Work pages">
                {secondaryNavLinks.map((link) => (
                  <ChrHover key={link.href} text={link.label} href={link.href} />
                ))}
              </nav>

              <nav className="footer-top-col" aria-label="Social links">
                <ChrHover text="GitHub" href="https://github.com/chota-jd" target="_blank" rel="noopener noreferrer" />
                <ChrHover
                  text="LinkedIn"
                  href="https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <ChrHover text="Email" href="mailto:chirag.wok@gmail.com" />
              </nav>
            </div>
          </div>

          <div className="footer-ascii-wrap">
            <div className="footer-ascii left">
              <pre id="ascii-left" ref={asciiLeftRef}></pre>
            </div>
            <div className="footer-ascii right">
              <pre id="ascii-right" ref={asciiRightRef}></pre>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
