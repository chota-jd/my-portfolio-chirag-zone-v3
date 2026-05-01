'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Github, ExternalLink, ArrowUpRight, Code2, Layers, Cpu, Globe, Smartphone, Sparkles, X } from 'lucide-react';

import { projects } from '@/data/projects';

export default function ProjectsSection({ 
  showAllDefault = false, 
  hideViewMore = false,
  hideHeader = false
}: { 
  showAllDefault?: boolean;
  hideViewMore?: boolean;
  hideHeader?: boolean;
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [showStats, setShowStats] = useState(false);

  const [showAll, setShowAll] = useState(showAllDefault);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4fc1c6]/30 bg-[#4fc1c6]/5 text-[11px] font-mono tracking-widest text-[#4fc1c6] mb-4"
            >
              <Sparkles size={12} />
              SELECTED WORKS
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight"
            >
              Building <span className="gradient-text">digital futures</span>
            </motion.h2>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#4fc1c6] to-transparent mx-auto mb-8"
            />
          </div>
        )}

        {/* Categories */}
        {/* <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4"
          >
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  if (!showAllDefault) setShowAll(false);
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-[#4fc1c6] text-black shadow-[0_0_20px_rgba(79,193,198,0.3)]' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div> */}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:border-[#4fc1c6]/50 group-hover:shadow-[0_0_40px_rgba(79,193,198,0.15)]">
                  <Link href={project.isSpecial ? '#' : `/projects/${project.slug}`} onClick={(e) => { if (project.isSpecial) { e.preventDefault(); setShowStats(true); } }} className="absolute inset-0 z-10" />
                  {/* Image Container */}
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest text-white uppercase">
                        {project.icon}
                        {project.category}
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 h-1/2 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#4fc1c6] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-20">
                      <div className="flex gap-4">
                        {!project.isSpecial && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        <a 
                          href={project.isSpecial ? '#' : project.liveUrl} 
                          onClick={(e) => {
                            if (project.isSpecial) {
                              e.preventDefault();
                              setShowStats(true);
                            }
                          }}
                          target={project.isSpecial ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-[#4fc1c6] transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                      
                      {project.isSpecial ? (
                        <button 
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
                          Details <ArrowUpRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Hover Overlay Gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${project.color}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        {!hideViewMore && !showAll && filteredProjects.length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <Link
              href="/projects"
              className="group relative inline-block overflow-hidden px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs uppercase hover:bg-[#4fc1c6] hover:text-black hover:border-[#4fc1c6] transition-all duration-500 shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Projects <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-500" />
              </span>
            </Link>
          </motion.div>
        )}

        {/* Stats Modal */}
        <AnimatePresence>
          {showStats && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowStats(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                {/* Modal Header */}
                <div className="p-8 pb-0 flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Portfolio Metrics</h3>
                    <p className="text-zinc-400 text-sm">Key performance indicators and professional milestones.</p>
                  </div>
                  <button 
                    onClick={() => setShowStats(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>

                {/* Modal Content */}
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
                      onClick={() => setShowStats(false)}
                      className="px-8 py-3 rounded-full bg-[#4fc1c6] text-black font-bold tracking-widest text-xs uppercase hover:scale-105 transition-transform"
                    >
                      Close Overview
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


      </div>
    </section>
  );
}

function StatItem({ value, label, sublabel }: { value: string, label: string, sublabel: string }) {
  return (
    <div className="flex flex-col items-center group">
      <span className="text-5xl font-black text-white group-hover:text-[#4fc1c6] transition-colors duration-500 mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        {value}
      </span>
      <div className="flex flex-col items-center">
        <span className="text-[#4fc1c6] font-bold tracking-[0.3em] uppercase text-[10px]">
          {label}
        </span>
        <span className="text-zinc-500 font-medium tracking-[0.2em] uppercase text-[8px]">
          {sublabel}
        </span>
      </div>
    </div>
  );
}