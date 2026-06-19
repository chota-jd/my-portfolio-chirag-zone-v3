'use client';

import React, { useEffect } from 'react';
import { ChrHover } from '@/components/ui/ChrHover';

type HeroWindow = Window & {
  _heroProjectData?: unknown;
  CoreRenderer?: {
    init: () => Promise<void>;
  };
};

export default function HeroSection() {
  useEffect(() => {
    let checkInterval: NodeJS.Timeout;
    const w = window as HeroWindow;

    const initShader = () => {
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
          .catch((err: unknown) => {
            console.error('CoreRenderer init failed:', err);
          });
      }
    };
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
      <section className="hero" id="hero">
        {/* WebGL background canvas container */}
        <div className="hero-canvas" id="hero-canvas"></div>

        <div className="hero-content">
          {/* Redesigned Clean Single Column Editorial Layout */}
          <div className="hero-content-left">
            <h1 className="hero-heading">
              SOFTWARE <span className="other-accent text-accent-orange">ENGINEER.</span>
            </h1>
            <p className="hero-bio">
              Hi, I&apos;m Chirag. Crafting high-performance web systems, interactive user experiences, and scalable cloud solutions.
            </p>
            <p className="hero-collaborate">
              Collaborating globally with brands and engineering teams to build fast, robust, and scalable products.
            </p>

            <div className="hero-bar" id="hero-bar">
              <nav className="hero-nav" aria-label="Hero navigation">
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
                <ChrHover text="Email" href="mailto:chirag.work@gmail.com" />
                <ChrHover text="Work" href="#projects" />
                <ChrHover text="Info" href="#about" />
                <ChrHover text="Contact" href="#contact" />
              </nav>
            </div>

            <div className="hero-details-row">
              <div className="details-group actions-group">
                <div className="status-pill">
                  <span className="status-dot"></span>
                  <span className="status-text">Status: Available Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
