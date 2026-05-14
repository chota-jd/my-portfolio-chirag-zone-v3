'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import type { IconType } from 'react-icons';
import { FaJsSquare } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiFirebase,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiAdobelightroom,
  SiCanva,
  SiAdobe,
} from 'react-icons/si';
import VN from '@/assets/vn.png';

type Skill = {
  name: string;
  icon: IconType | StaticImageData;
  color: string;
};

function isStaticImage(icon: IconType | StaticImageData): icon is StaticImageData {
  return typeof icon === 'object' && icon !== null && 'src' in icon;
}

const techStack: Record<string, Skill[]> = {
  'Code & Creativity': [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#e4e4e7' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Angular', icon: SiAngular, color: '#DD0031' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Github', icon: SiGithub, color: '#e4e4e7' },
    { name: 'Lightroom', icon: SiAdobelightroom, color: '#31A8FF' },
    { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
    { name: 'Adobe', icon: SiAdobe, color: '#FF0000' },
    { name: 'VN Editor', icon: VN, color: '#e4e4e7' },
  ],
};

function SkillTile({ skill }: { skill: Skill }) {
  return (
    <div className="group flex h-full flex-col items-center justify-center gap-3.5 px-2 py-3 sm:gap-4 sm:py-4">
      <div className="flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-[3.75rem] sm:w-[3.75rem]">
        {isStaticImage(skill.icon) ? (
          <Image
            src={skill.icon}
            alt=""
            aria-hidden
            className="h-11 w-11 object-contain opacity-90 invert transition-opacity duration-300 group-hover:opacity-100 sm:h-12 sm:w-12"
          />
        ) : (
          <skill.icon
            className="h-10 w-10 opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:h-12 sm:w-12"
            style={{ color: skill.color }}
          />
        )}
      </div>
      <span className="text-center text-base font-medium tracking-wide text-zinc-300 transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>
    </div>
  );
}

const slideClass =
  'w-[min(46vw,12.75rem)] shrink-0 sm:w-[11.75rem] md:w-[12.25rem]';

export default function TechStackSection() {
  const skills = techStack['Code & Creativity'];
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <section id="techstack" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[320px] max-w-3xl rounded-full bg-[#4fc1c6]/[0.06] blur-[100px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="pb-4 text-4xl font-bold gradient-text sm:text-5xl">Technologies &amp; Skills</h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-accent" />
          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            A comprehensive overview of my technical expertise and the tools I use to build exceptional digital
            experiences.
          </p>
        </div>

        <div className="mb-10 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#4fc1c6]/25" />
          <h3 className="shrink-0 text-lg font-semibold text-zinc-200 sm:text-xl">Code &amp; Creativity</h3>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4fc1c6]/25" />
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-black/80 to-transparent sm:w-14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-black/80 to-transparent sm:w-14"
            aria-hidden
          />

          {reducedMotion ? (
            <div className="flex flex-wrap justify-center gap-3 py-2 sm:gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className={slideClass}>
                  <SkillTile skill={skill} />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden py-2" role="presentation">
              <div className="flex w-max gap-3 sm:gap-4 animate-tech-marquee hover:[animation-play-state:paused]">
                {[...skills, ...skills].map((skill, i) => (
                  <div key={`${skill.name}-${i}`} className={slideClass}>
                    <SkillTile skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* {!reducedMotion && (
            <p className="mt-3 text-center text-xs text-zinc-600">Infinite scroll · hover to pause</p>
          )} */}
        </div>

        <div className="relative mt-16 mb-16 flex w-full flex-col items-center justify-center md:mt-24 md:mb-20">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden>
            <div className="h-[140px] w-[130%] rounded-[100%] bg-[#4fc1c6] opacity-[0.12] mix-blend-screen blur-[100px] md:h-[280px] md:w-[70%] md:blur-[160px]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-12 md:flex-row md:gap-24">
            <div className="group flex cursor-default flex-col items-center">
              <div className="relative">
                <span className="text-7xl font-black leading-none tracking-tighter text-transparent bg-gradient-to-b from-white to-white/20 bg-clip-text drop-shadow-[0_0_28px_rgba(255,255,255,0.08)] transition-all duration-700 group-hover:drop-shadow-[0_0_44px_rgba(255,255,255,0.15)] md:text-[100px]">
                  2
                  <span className="text-[#4fc1c6] drop-shadow-[0_0_22px_rgba(79,193,198,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_0_36px_rgba(79,193,198,0.5)]">
                    +
                  </span>
                </span>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <span className="text-xs font-extrabold uppercase tracking-[0.45em] text-[#4fc1c6] drop-shadow-[0_0_12px_rgba(79,193,198,0.25)] md:text-sm">
                  Years
                </span>
                <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.35em] text-gray-500 transition-colors duration-300 group-hover:text-gray-400 md:text-xs">
                  Experience
                </span>
              </div>
            </div>

            <div className="hidden h-[140px] w-px bg-gradient-to-b from-transparent via-[#4fc1c6] to-transparent opacity-50 md:block" aria-hidden />

            <div className="my-3 h-px w-[160px] bg-gradient-to-r from-transparent via-[#4fc1c6] to-transparent opacity-50 md:hidden" aria-hidden />

            <div className="group flex cursor-default flex-col items-center">
              <div className="relative">
                <span className="text-7xl font-black leading-none tracking-tighter text-transparent bg-gradient-to-b from-white to-white/20 bg-clip-text drop-shadow-[0_0_28px_rgba(255,255,255,0.08)] transition-all duration-700 group-hover:drop-shadow-[0_0_44px_rgba(255,255,255,0.15)] md:text-[100px]">
                  30
                  <span className="text-[#4fc1c6] drop-shadow-[0_0_22px_rgba(79,193,198,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_0_36px_rgba(79,193,198,0.5)]">
                    +
                  </span>
                </span>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <span className="text-xs font-extrabold uppercase tracking-[0.45em] text-[#4fc1c6] drop-shadow-[0_0_12px_rgba(79,193,198,0.25)] md:text-sm">
                  Projects
                </span>
                <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.35em] text-gray-500 transition-colors duration-300 group-hover:text-gray-400 md:text-xs">
                  Delivered
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="group inline-flex cursor-pointer items-center space-x-2 font-medium text-accent transition-colors hover:text-white">
            <span>🚀</span>
            <span>Always learning, always growing</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
