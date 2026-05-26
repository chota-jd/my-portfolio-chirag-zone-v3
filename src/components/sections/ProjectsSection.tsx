/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';

import { projects } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProjectsSection({
  showAllDefault = false,
  hideViewMore = false,
  hideHeader = false,
}: {
  showAllDefault?: boolean;
  hideViewMore?: boolean;
  hideHeader?: boolean;
}) {
  const [activeCategory] = useState('All');
  const [showStats, setShowStats] = useState(false);
  const [showAll] = useState(showAllDefault);

  const filteredProjects =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {!hideHeader && (
          <SectionHeading
            spacing="lg"
            titleClassName="sm:text-6xl"
            subtitle={
              <>
                A curated portfolio of high-impact projects I&apos;ve contributed to with cross-functional teams,
                spanning civic platforms, inclusive learning, and public AI literacy.
              </>
            }
          >
            Selected <span className="gradient-text">projects</span>
          </SectionHeading>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div key={project.id} className="group relative">
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:border-[#4fc1c6]/50 group-hover:shadow-[0_0_40px_rgba(79,193,198,0.15)]">
                <Link
                  href={project.isSpecial ? '#' : `/projects/${project.slug}`}
                  onClick={(e) => {
                    if (project.isSpecial) {
                      e.preventDefault();
                      setShowStats(true);
                    }
                  }}
                  className="absolute inset-0 z-10"
                />
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 h-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#4fc1c6] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-4">{project.description}</p>
                  </div>

                  <div className="flex items-center justify-center pt-4 border-t border-white/5 relative z-20">
                    {project.isSpecial ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowStats(true);
                        }}
                        className="flex items-center gap-1 text-xs font-bold tracking-widest text-[#4fc1c6] uppercase hover:underline"
                      >
                        Details <ArrowUpRight size={14} />
                      </button>
                    ) : (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1 text-xs font-bold tracking-widest text-[#4fc1c6] uppercase hover:underline"
                      >
                        Details
                      </Link>
                    )}
                  </div>
                </div>

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${project.color}`}
                />
              </div>
            </div>
          ))}
        </div>

        {!hideViewMore && !showAll && filteredProjects.length > 3 && (
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="group relative inline-block overflow-hidden px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs uppercase hover:bg-[#4fc1c6] hover:text-black hover:border-[#4fc1c6] transition-all duration-500 shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">View All Projects</span>
            </Link>
          </div>
        )}

        {showStats && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
              role="presentation"
              onClick={() => setShowStats(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <div className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 pb-0 flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Portfolio Metrics</h3>
                  <p className="text-zinc-400 text-sm">Key performance indicators and professional milestones.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowStats(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center py-12 border-y border-white/5 bg-white/[0.02] rounded-3xl">
                  <StatItem value="3+" label="Years" sublabel="Experience" />
                  <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#4fc1c6]/30 to-transparent" />
                  <StatItem value="20+" label="Projects" sublabel="Delivered" />
                  <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#4fc1c6]/30 to-transparent" />
                  <StatItem value="∞" label="Curiosity" sublabel="Driving Force" />
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowStats(false)}
                    className="px-8 py-3 rounded-full bg-[#4fc1c6] text-black font-bold tracking-widest text-xs uppercase hover:scale-105 transition-transform"
                  >
                    Close Overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatItem({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
  return (
    <div className="flex flex-col items-center group">
      <span className="text-5xl font-black text-white group-hover:text-[#4fc1c6] transition-colors duration-500 mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        {value}
      </span>
      <div className="flex flex-col items-center">
        <span className="text-[#4fc1c6] font-bold tracking-[0.3em] uppercase text-[10px]">{label}</span>
        <span className="text-zinc-500 font-medium tracking-[0.2em] uppercase text-[8px]">{sublabel}</span>
      </div>
    </div>
  );
}
