'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChrHover } from '@/components/ui/ChrHover';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const blobWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);
  
  const dispoRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameImgRef = useRef<HTMLImageElement>(null);
  
  const dispo2Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);
  const frameImg2Ref = useRef<HTMLImageElement>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      // Toggle visibility of contact layers
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top bottom',
        endTrigger: '#footer',
        end: 'bottom bottom',
        onEnter: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'visible';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'block';
        },
        onLeave: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'hidden';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'none';
        },
        onLeaveBack: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'hidden';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'none';
        },
        onEnterBack: () => {
          if (blobWrapRef.current) blobWrapRef.current.style.visibility = 'visible';
          const bg = document.getElementById('contact-bg');
          if (bg) bg.style.display = 'block';
        },
      });

      if (blobWrapRef.current) {
        blobWrapRef.current.style.visibility = 'hidden';
      }

      // Master scrubbing timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Scale up the beautiful white blob background
      tl.fromTo(
        blobRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: 'none' },
        0
      );

      // Hide the scroll timeline markers on entry
      tl.to(['#scroll-timeline', '#scroll-pct'], { opacity: 0, duration: 0.08 }, 0.1);

      // Title slides in from the right edge
      gsap.set(titleRef.current, {
        yPercent: 0,
        x: () => window.innerWidth * 1.1,
      });
      tl.to(
        titleRef.current,
        {
          x: 0,
          duration: 0.3,
          ease: 'power3.out',
        },
        0.18
      );

      // Reveal socials and direct mail
      tl.fromTo(
        socialsRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.2, ease: 'none' },
        0.28
      );

      tl.fromTo(
        mailRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.2, ease: 'none' },
        0.36
      );

      // Parallax flying items
      const pairStart = 0.22;
      const frameDur = 0.65;
      const frameY = () => window.innerHeight * 1.1;
      const frameYEnd = () => -window.innerHeight * 1.4;
      const dispoY = () => window.innerHeight * 1.1;
      const dispoYEnd = () => -window.innerHeight * 1.65;

      // Picture Frame 1 Parallax
      gsap.set(frameRef.current, { yPercent: -50, y: frameY });
      gsap.set(frameImgRef.current, { yPercent: -30 });
      tl.to(frameRef.current, { y: frameYEnd, duration: frameDur, ease: 'none' }, pairStart);
      tl.to(frameImgRef.current, { yPercent: 30, duration: frameDur, ease: 'none' }, pairStart);

      // Availability card 1 Parallax
      gsap.set(dispoRef.current, { yPercent: -50, y: dispoY, opacity: 1, clipPath: 'inset(0% 0 0% 0)' });
      tl.to(dispoRef.current, { y: dispoYEnd, duration: frameDur, ease: 'none' }, pairStart);
      tl.to(
        dispoRef.current,
        { opacity: 0, clipPath: 'inset(100% 0 0% 0)', duration: 0.15, ease: 'power2.in' },
        pairStart + 0.45
      );

      // Picture Frame 2 Parallax
      gsap.set(frame2Ref.current, { yPercent: -50, y: () => window.innerHeight * 1.3 });
      gsap.set(frameImg2Ref.current, { yPercent: -30 });
      tl.to(frame2Ref.current, { y: frameYEnd, duration: frameDur, ease: 'none' }, pairStart + 0.07);
      tl.to(frameImg2Ref.current, { yPercent: 30, duration: frameDur, ease: 'none' }, pairStart + 0.07);

      // Availability card 2 Parallax
      gsap.set(dispo2Ref.current, { yPercent: -50, y: frameY, opacity: 1, clipPath: 'inset(0% 0 0% 0)' });
      tl.to(dispo2Ref.current, { y: frameYEnd, duration: frameDur, ease: 'none' }, pairStart);
      tl.to(
        dispo2Ref.current,
        { opacity: 0, clipPath: 'inset(100% 0 0% 0)', duration: 0.15, ease: 'power2.in' },
        pairStart + 0.45
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div ref={containerRef}>
      <div className="contact-bg" id="contact-bg" />
      
      <div className="contact-blob-wrap" id="contact-blob-wrap" ref={blobWrapRef}>
        <div className="contact-blob" id="contact-blob" ref={blobRef} />
      </div>

      <section className="contact" id="contact">
        <div className="contact-pin" id="contact-pin">
          <div className="contact-title" id="contact-title" ref={titleRef}>
            Contact
          </div>

          <div className="contact-dispo" id="contact-dispo" ref={dispoRef}>
            <p>
              Available for <span className="other-accent">strategic full-stack consulting</span> or enterprise integration
              contracts starting globally.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame" ref={frameRef}>
            <img
              className="contact-frame-img"
              id="contact-frame-img"
              ref={frameImgRef}
              src="/art/Untitled2.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>

          <div className="contact-dispo" id="contact-dispo-2" ref={dispo2Ref}>
            <p>
              Always seeking <span className="other-accent">ambitious software problems</span> to build robust pipelines and
              scalable architectures.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame-2" ref={frame2Ref}>
            <img
              className="contact-frame-img"
              id="contact-frame-img-2"
              ref={frameImg2Ref}
              src="/art/Untitled1.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>

          <div className="contact-bottom" id="contact-bottom">
            <nav className="contact-socials" id="contact-socials" ref={socialsRef} aria-label="Réseaux sociaux">
              <ChrHover text="GitHub" href="https://github.com/chota-jd" target="_blank" rel="noopener noreferrer" />
              <ChrHover
                text="LinkedIn"
                href="https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/"
                target="_blank"
                rel="noopener noreferrer"
              />
              <ChrHover text="Email" href="mailto:chirag.work@gmail.com" />
            </nav>
            <a className="contact-mail" id="contact-mail" ref={mailRef} href="mailto:chirag.work@gmail.com">
              chirag.work@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}