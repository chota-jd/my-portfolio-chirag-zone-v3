'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChrHover } from '@/components/ui/ChrHover';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const asciiLeftRef = useRef<HTMLPreElement>(null);
  const asciiRightRef = useRef<HTMLPreElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    gsap.registerPlugin(ScrollTrigger);

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

    let seed = 42;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };

    const imageToAscii = (img: HTMLImageElement, cols: number) => {
      seed = 42;
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (!ctx) return { text: '', poolGrid: [] };
      
      const aspect = img.height / img.width;
      const charAspect = 1.0;
      const rows = Math.round(cols * aspect * charAspect);
      c.width = cols;
      c.height = rows;
      ctx.drawImage(img, 0, 0, cols, rows);
      const data = ctx.getImageData(0, 0, cols, rows).data;
      const lines = [];
      const poolGrid = [];

      for (let y = 0; y < rows; y++) {
        let line = '';
        const poolRow = [];
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
    };

    const setupHover = (preEl: HTMLPreElement, poolGrid: number[][]) => {
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
        const nr = [],
          ht = [],
          cd = [];
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
            } else {
              if (origGrid && origGrid[y]) {
                html += esc(origGrid[y][x]);
              } else {
                html += ' ';
              }
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
    };

    const loadAndRender = (src: string, preEl: HTMLPreElement | null, cols: number) => {
      if (!preEl) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const result = imageToAscii(img, cols);
        preEl.textContent = result.text;
        setupHover(preEl, result.poolGrid);
      };
      img.src = src;
    };

    loadAndRender('/images/footer/left.png', asciiLeftRef.current, 80);
    loadAndRender('/images/footer/right.png', asciiRightRef.current, 80);

    // Parallax ASCII art entries
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

    // Scroll parallax wobble effect
    const leftPre = asciiLeftRef.current;
    const rightPre = asciiRightRef.current;
    let mx = 0,
      my = 0,
      sx = 0,
      sy = 0;
    let footerVisible = false;

    ScrollTrigger.create({
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
      requestAnimationFrame(parallaxLoop);
    };
    parallaxLoop();

    // Large signature character stagger reveals
    const lukeEl = document.querySelector('.footer-name-luke') as HTMLElement;
    const baffaitEl = document.querySelector('.footer-name-baffait') as HTMLElement;
    const dotEl = document.querySelector('.footer-name-dot') as HTMLElement;

    if (lukeEl && baffaitEl) {
      const rebuildChars = (el: HTMLElement, keepFirstLetter: boolean) => {
        const text = el.textContent || '';
        el.textContent = '';
        const inners: HTMLElement[] = [];
        for (let i = 0; i < text.length; i++) {
          const outer = document.createElement('span');
          outer.style.cssText =
            'display:inline-block;overflow:hidden;vertical-align:top;padding:0.1em 0.3em;margin:-0.1em -0.3em;';
          if (keepFirstLetter && i === 0) outer.className = 'first-letter';
          const inner = document.createElement('span');
          inner.style.cssText = 'display:inline-block;will-change:transform;';
          inner.textContent = text[i];
          outer.appendChild(inner);
          el.appendChild(outer);
          inners.push(inner);
        }
        return inners;
      };

      const lukeChars = rebuildChars(lukeEl, true);
      const baffaitChars = rebuildChars(baffaitEl, false);
      const dotChars = dotEl ? rebuildChars(dotEl, false) : [];

      const ordered: HTMLElement[] = [];
      const lukeRev = lukeChars.slice().reverse();
      const rightSide = baffaitChars.concat(dotChars);
      const maxLen = Math.max(lukeRev.length, rightSide.length);
      for (let i = 0; i < maxLen; i++) {
        if (rightSide[i]) ordered.push(rightSide[i]);
        if (lukeRev[i]) ordered.push(lukeRev[i]);
      }

      gsap.set(ordered, { yPercent: 110 });
      gsap.to(ordered, {
        yPercent: 0,
        ease: 'power3.out',
        stagger: { each: 0.04, from: 'start' },
        scrollTrigger: {
          trigger: '#footer-transition',
          start: 'center bottom+=500',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    // Toggle entire footer visibility
    const footerEl = document.getElementById('footer');
    if (footerEl) {
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
      });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <>
      <div className="footer-transition" id="footer-transition"></div>

      <footer className="footer" id="footer" ref={footerRef}>
        <div className="footer-content" id="footer-content">
          <div className="footer-top">
            <div className="footer-top-col">
              <ChrHover text="chirag.work@gmail.com" href="mailto:chirag.work@gmail.com" className="footer-mail" />
              <ChrHover text="© 2026" className="footer-date" />
            </div>

            <nav className="footer-top-col" aria-label="Réseaux sociaux">
              <ChrHover text="GitHub" href="https://github.com/chota-jd" target="_blank" rel="noopener noreferrer" />
              <ChrHover
                text="LinkedIn"
                href="https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/"
                target="_blank"
                rel="noopener noreferrer"
              />
              <ChrHover text="Email" href="mailto:chirag.work@gmail.com" />
            </nav>

            <nav className="footer-top-col" aria-label="Navigation pied de page">
              <ChrHover text="Work" href="#projects" />
              <ChrHover text="Info" href="#about" />
              <ChrHover text="Contact" href="#contact" />
            </nav>
          </div>

          <div className="footer-ascii-wrap">
            <div className="footer-ascii left">
              <pre id="ascii-left" ref={asciiLeftRef}></pre>
            </div>
            <div className="footer-ascii right">
              <pre id="ascii-right" ref={asciiRightRef}></pre>
            </div>
          </div>

          <div className="footer-name">
            <span className="footer-name-luke">
              <span className="first-letter">C</span>hirag
            </span>
            <span className="footer-name-baffait-wrap">
              <span className="footer-name-baffait">Prajapati</span>
              <span className="footer-name-dot">.</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
