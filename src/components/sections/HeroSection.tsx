'use client';

import React, { useEffect } from 'react';
import { ChrHover } from '@/components/ui/ChrHover';

export default function HeroSection() {
  useEffect(() => {
    let checkInterval: NodeJS.Timeout;

    const initShader = () => {
      const w = window as any;
      const projectData = w._heroProjectData;
      if (!projectData) return;

      const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
      const blobUrl = URL.createObjectURL(blob);
      const container = document.getElementById('hero-canvas');

      if (container && w.CoreRenderer) {
        container.setAttribute('data-cr-project-src', blobUrl);
        w.CoreRenderer.init()
          .then(() => {
            URL.revokeObjectURL(blobUrl);
          })
          .catch((err: any) => {
            console.error('CoreRenderer init failed:', err);
          });
      }
    };

    const w = window as any;
    if (w.CoreRenderer && w._heroProjectData) {
      initShader();
    } else {
      checkInterval = setInterval(() => {
        if (w.CoreRenderer && w._heroProjectData) {
          initShader();
          clearInterval(checkInterval);
        }
      }, 100);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  return (
    <>
      <section className="hero" id="hero" style={{ opacity: 0 }}>
        {/* WebGL background canvas container */}
        <div className="hero-canvas" id="hero-canvas"></div>

        <div className="hero-content">
          <div className="hero-tagline" id="hero-tagline">
            Quiet developer, <span className="other-accent">I shape the future</span> of web interfaces,
            <br />
            balancing robust code, fluid animations, and absolute precision.
          </div>

          <div className="hero-line" id="hero-line"></div>
          <div className="hero-bar" id="hero-bar">
            <div className="hero-bar-left">
              <ChrHover text="🡺V3.0" />
            </div>

            <nav className="hero-bar-center" aria-label="Réseaux sociaux">
              <ChrHover
                text="GitHub"
                href="https://github.com/chota-jd"
                target="_blank"
                rel="noopener noreferrer"
              />
              <span className="sep" aria-hidden="true">
                /
              </span>
              <ChrHover
                text="LinkedIn"
                href="https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/"
                target="_blank"
                rel="noopener noreferrer"
              />
              <span className="sep" aria-hidden="true">
                /
              </span>
              <ChrHover text="Email" href="mailto:chirag.prajapati@example.com" />
            </nav>

            <nav className="hero-bar-right" aria-label="Navigation principale">
              <ChrHover text="Work" href="#projects" />
              <ChrHover text="Info" href="#about" />
              <ChrHover text="Contact" href="#contact" />
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
