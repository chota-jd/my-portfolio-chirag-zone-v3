'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Stethoscope,
  GraduationCap,
  Gavel,
  ShoppingBag,
  Trophy,
  TentTree,
  CalendarDays,
  Heart,
  UtensilsCrossed,
  Store,
} from 'lucide-react';

const industries = [
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Sports', icon: Trophy },
  { name: 'Travel', icon: TentTree },
  { name: 'Education', icon: GraduationCap },
  { name: 'Legal', icon: Gavel },
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Event', icon: CalendarDays },
  { name: 'Wedding', icon: Heart },
  { name: 'Restaurant and Cafe', icon: UtensilsCrossed },
  { name: 'E-commerce', icon: Store },
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.industry-card');
      const title = document.querySelector('.industries-title');
      const grid = document.querySelector('.industries-grid');
      const isMobile = window.innerWidth <= 768;

      if (!cards.length) return;

      if (isMobile) {
        if (title) {
          gsap.fromTo(
            title,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              duration: 0.7,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
                end: 'top 62%',
                scrub: true,
              },
            }
          );
        }

        cards.forEach((card, index) => {
          const fromX = index % 2 === 0 ? -60 : 60;
          gsap.fromTo(
            card,
            { x: fromX, y: 24, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 68%',
                scrub: true,
              },
            }
          );
        });
        return;
      }

      gsap.set(cards, { opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.92 });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=125%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (title) gsap.set(title, { opacity: 1, y: 0, filter: 'none' });
      if (grid) gsap.set(grid, { opacity: 1, y: 0 });

      cards.forEach((card, index) => {
        const fromX = index % 2 === 0 ? -180 : 180;
        const fromY = index % 2 === 0 ? 52 : -52;
        const fromRotate = index % 2 === 0 ? -10 : 10;

        master.fromTo(
          card,
          {
            x: fromX,
            y: fromY,
            rotate: fromRotate,
            opacity: 0,
            scale: 0.92,
            filter: 'blur(8px)',
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.34,
            ease: 'power3.out',
          },
          0.03 + index * 0.11
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="industries" className="industries-section" ref={sectionRef}>
      <div className="relative z-10">
        <h2 className="industries-title">
          Industries I <span className="other-accent">Worked In.</span>
        </h2>
        
        <div className="industries-grid">
          {industries.map((industry) => (
            <div key={industry.name} className="industry-card">
              <div className="industry-icon-wrap">
                <industry.icon size={60} strokeWidth={1.25} />
              </div>
              <div className="industry-name">{industry.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
