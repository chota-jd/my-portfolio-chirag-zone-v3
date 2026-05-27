'use client';

import Image, { StaticImageData } from 'next/image';
import type { IconType } from 'react-icons';
import { FaJsSquare } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiSvelte,
  SiTypescript,
  SiTailwindcss,
  SiAngular,
  SiHtml5,
  SiCss,
  SiFirebase,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiN8N,
} from 'react-icons/si';
import VN from '@/assets/vn.png';
import SectionHeading from '@/components/ui/SectionHeading';

type Skill = {
  name: string;
  icon: IconType | StaticImageData | string;
  color: string;
};

function isStaticImage(icon: IconType | StaticImageData | string): icon is StaticImageData {
  return typeof icon === 'object' && icon !== null && 'src' in icon;
}

function isIconComponent(icon: IconType | StaticImageData | string): icon is IconType {
  return typeof icon === 'function';
}

const skills: Skill[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#e4e4e7' },
  { name: 'Svelte', icon: SiSvelte, color: '#FF3E00' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6' },
  { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#e4e4e7' },
  { name: 'n8n', icon: SiN8N, color: '#EA4B71' },
  { name: 'Lightroom', icon: '/icons/adobelightroom.svg', color: '#31A8FF' },
  { name: 'Canva', icon: '/icons/canva.svg', color: '#00C4CC' },
  { name: 'Adobe', icon: '/icons/adobe.svg', color: '#FF0000' },
  { name: 'VN Editor', icon: VN, color: '#e4e4e7' },
];

function SkillIcon({ skill }: { skill: Skill }) {
  return (
    <div className="group/tile relative flex justify-center" aria-label={skill.name} title={skill.name}>
      <span
        className="pointer-events-none absolute top-full left-1/2 z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-200 group-hover/tile:opacity-100 sm:text-xs"
        role="tooltip"
      >
        {skill.name}
      </span>
      <div className="flex h-16 w-16 items-center justify-center transition-transform duration-200 group-hover/tile:scale-110 sm:h-20 sm:w-20 md:h-[5.5rem] md:w-[5.5rem]">
        {isStaticImage(skill.icon) ? (
          <Image
            src={skill.icon}
            alt=""
            className="h-10 w-10 object-contain invert opacity-95 transition-transform sm:h-12 sm:w-12 md:h-14 md:w-14"
          />
        ) : typeof skill.icon === 'string' ? (
          <span
            aria-hidden
            className="h-10 w-10 opacity-95 transition-transform sm:h-12 sm:w-12 md:h-14 md:w-14"
            style={{
              backgroundColor: skill.color,
              WebkitMaskImage: `url(${skill.icon})`,
              maskImage: `url(${skill.icon})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
            }}
          />
        ) : isIconComponent(skill.icon) ? (
          <skill.icon
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            style={{ color: skill.color }}
            aria-hidden
          />
        ) : null}
      </div>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section id="techstack" className="relative overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-[#4fc1c6]/5 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute bottom-1/4 -right-24 h-72 w-72 rounded-full bg-[#a78bfa]/5 blur-[100px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading titleClassName="gradient-text" subtitle="Tools and platforms I work with every day.">
          Technologies &amp; Skills
        </SectionHeading>

        <div className="grid grid-cols-4 place-items-center gap-5 sm:grid-cols-6 sm:gap-6 md:grid-cols-11 md:gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={index === 11 ? 'md:col-start-3' : undefined}
            >
              <SkillIcon skill={skill} />
            </div>
          ))}
        </div>

        <div className="relative mt-12 mb-10 flex w-full flex-col items-center justify-center md:mt-16 md:mb-12">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden>
            <div className="h-[120px] w-[130%] rounded-[100%] bg-[#4fc1c6] opacity-[0.12] mix-blend-screen blur-[100px] md:h-[220px] md:w-[70%] md:blur-[140px]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 md:flex-row md:gap-20">
            <div className="group flex cursor-default flex-col items-center">
              <span className="bg-gradient-to-b from-white to-white/20 bg-clip-text text-6xl font-black leading-none tracking-tighter text-transparent md:text-[88px]">
                2<span className="text-[#4fc1c6]">+</span>
              </span>
              <div className="mt-3 flex flex-col items-center">
                <span className="text-xs font-extrabold uppercase tracking-[0.45em] text-[#4fc1c6] md:text-sm">
                  Years
                </span>
                <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.35em] text-gray-500 md:text-xs">
                  Experience
                </span>
              </div>
            </div>

            <div
              className="hidden h-[120px] w-px bg-gradient-to-b from-transparent via-[#4fc1c6] to-transparent opacity-50 md:block"
              aria-hidden
            />
            <div
              className="my-2 h-px w-[140px] bg-gradient-to-r from-transparent via-[#4fc1c6] to-transparent opacity-50 md:hidden"
              aria-hidden
            />

            <div className="group flex cursor-default flex-col items-center">
              <span className="bg-gradient-to-b from-white to-white/20 bg-clip-text text-6xl font-black leading-none tracking-tighter text-transparent md:text-[88px]">
                30<span className="text-[#4fc1c6]">+</span>
              </span>
              <div className="mt-3 flex flex-col items-center">
                <span className="text-xs font-extrabold uppercase tracking-[0.45em] text-[#4fc1c6] md:text-sm">
                  Projects
                </span>
                <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.35em] text-gray-500 md:text-xs">
                  Delivered
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
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
