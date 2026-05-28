'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChrHover } from '@/components/ui/ChrHover';

type SkillCategory = {
  id: string;
  name: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Angular', 'Svelte', 'Tailwind'],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    skills: ['Node.js', 'Express', 'Firebase', 'PostgreSQL', 'MySQL', 'REST APIs', 'GraphQL', 'n8n'],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Vercel', 'Netlify', 'Cloudflare', 'Linux'],
  },
  {
    id: 'creative',
    name: 'Design & Media',
    skills: ['Photoshop', 'Lightroom', 'Figma', 'Canva', 'Adobe Suite', 'VN Video Editor'],
  },
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [openCategory, setOpenCategory] = useState<string>('frontend');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const arrow = arrowRef.current;
    if (arrow) {
      gsap.fromTo(
        arrow,
        { xPercent: 0 },
        {
          xPercent: 100,
          x: () => {
            const left = arrow.parentElement;
            if (!left) return 0;
            const pad =
              parseFloat(getComputedStyle(left).paddingLeft) +
              parseFloat(getComputedStyle(left).paddingRight);
            return left.clientWidth - pad - arrow.offsetWidth;
          },
          ease: 'none',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top top',
            endTrigger: '#experience',
            end: 'top center',
            scrub: 0.5,
          },
        }
      );
    }
  }, []);

  const toggleCategory = (id: string) => {
    if (openCategory === id) return;

    // Toggle heights using GSAP for smooth layout updates
    const currentOpenBody = document.querySelector(
      `.skill-group[data-id="${openCategory}"] .skill-body`
    ) as HTMLElement;
    const targetOpenBody = document.querySelector(
      `.skill-group[data-id="${id}"] .skill-body`
    ) as HTMLElement;

    if (currentOpenBody) {
      gsap.to(currentOpenBody, { height: 0, duration: 0.45, ease: 'power3.inOut' });
    }

    if (targetOpenBody) {
      gsap.to(targetOpenBody, {
        height: targetOpenBody.scrollHeight,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    }

    setOpenCategory(id);
  };

  useEffect(() => {
    // Set initial open category height
    const initialBody = document.querySelector(
      `.skill-group[data-id="${openCategory}"] .skill-body`
    ) as HTMLElement;
    if (initialBody) {
      initialBody.style.height = `${initialBody.scrollHeight}px`;
    }
  }, []);

  return (
    <section className="skills" id="skills" ref={containerRef}>
      <div className="skills-inner">
        <div className="skills-left">
          <div className="skills-subtitle">Skills & Toolkit</div>
          <div className="skills-text">
            Lead Developer & Full-Stack Architect, specialized in modern Web Systems and cloud engineering.
          </div>
          <div className="skills-separator"></div>
          <div>
            <ChrHover text="Contact me🞣" href="#contact" className="skills-contact" />
          </div>
          <div className="skills-arrow" id="skills-arrow" ref={arrowRef}>
            <svg
              style={{ width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' }}
              viewBox="0 0 84 85"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z" />
            </svg>
          </div>
        </div>

        <div className="skills-right" id="skills-right">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className={`skill-group ${openCategory === cat.id ? 'open' : ''}`}
              data-id={cat.id}
            >
              <div className="skill-header" onClick={() => toggleCategory(cat.id)}>
                <span className="skill-header-title">{cat.name}</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body" style={{ height: 0 }}>
                <ul className="skill-body-inner">
                  {cat.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
