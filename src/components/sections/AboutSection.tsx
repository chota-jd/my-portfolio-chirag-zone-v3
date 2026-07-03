'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChrHover } from '@/components/ui/ChrHover';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      // Word fade reveal triggers
      const wordElements = document.querySelectorAll('#about-text .word');
      wordElements.forEach((word) => {
        gsap.to(word, {
          opacity: 1,
          filter: isMobile ? 'none' : 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: word,
            start: 'top 85%',
            end: 'top 70%',
            scrub: true,
          },
        });
      });

      // Subtext fade reveal
      const aboutSub = document.getElementById('about-sub');
      if (aboutSub) {
        gsap.set(aboutSub, { opacity: 0, filter: isMobile ? 'none' : 'blur(12px)' });
        gsap.to(aboutSub, {
          opacity: 1,
          filter: isMobile ? 'none' : 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: aboutSub,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        });
      }

      // Parallax photo scroll
      const photo = document.querySelector('.about-photo');
      const photoWrap = document.getElementById('about-photo-wrap');
      if (photo && photoWrap) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: photoWrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        tl.fromTo(photo, { y: '-25%' }, { y: '25%', ease: 'none' }, 0);
        tl.fromTo(
          photo,
          { opacity: 0, filter: 'blur(20px)' },
          { opacity: 1, filter: 'blur(0px)', ease: 'none', duration: 0.3 },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const textToWordsSpans = (text: string) => {
    return text.split(/(\s+)/).map((word, idx) => {
      if (/^\s+$/.test(word)) {
        return word;
      }
      const isOtherAccent =
        word.toLowerCase().includes('lead') ||
        word.toLowerCase().includes('developer') ||
        word.toLowerCase().includes('technical') ||
        word.toLowerCase().includes('scaling') ||
        word.toLowerCase().includes('intuition');
      return (
        <span
          key={idx}
          className={`word ${isOtherAccent ? 'other-accent' : ''}`}
          style={{ display: 'inline-block', opacity: 0, filter: 'blur(8px)' }}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <section className="section-after" id="about" ref={containerRef}>
      <div className="about">
        <div className="about-text" id="about-text">
          {textToWordsSpans(
            'As a developer with a love for creating innovative digital solutions. My journey in technology started with curiosity and has evolved into a career dedicated to building exceptional user experiences.'
          )}
        </div>

        <div className="about-sub" id="about-sub">
          I specialize in full-stack development, with expertise in modern JavaScript frameworks, cloud technologies, and scalable architecture design. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
          <p className="about-sub-small">
            {`When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm always eager to take on new challenges and collaborate on exciting projects.`}
          </p>
        </div>

        <div className="about-btn">
          <ChrHover text="Info🡺" href="#contact" aria-label="En savoir plus sur moi" />
        </div>

        <div className="about-photo-wrap" id="about-photo-wrap">
          <img
            className="about-photo"
            src="/profile-photo.png"
            alt="Chirag Prajapati"
            decoding="async"
            width="2500"
            height="3001"
          />
        </div>
      </div>
    </section>
  );
}
