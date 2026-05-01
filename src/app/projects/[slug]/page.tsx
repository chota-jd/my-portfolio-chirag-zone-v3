'use client';

import { projects } from '@/data/projects';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Globe, Sparkles, Smartphone, Calendar, User, BarChart3, CheckCircle2, Target, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export default function ProjectDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-[#4fc1c6] hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={20} /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#4fc1c6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Back Button and Socials */}
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase">Back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Main Content (8 cols) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4fc1c6]/30 bg-[#4fc1c6]/5 text-[11px] font-mono tracking-widest text-[#4fc1c6] mb-6 uppercase">
                {project.icon}
                {project.category}
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? '' : 'gradient-text'}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <p className="text-base lg:text-lg text-zinc-400 leading-relaxed mb-16 font-light">
                {project.fullDescription || project.description}
              </p>

              {/* Pillars Section */}
              {project.pillars && (
                <section className="mb-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-px flex-1 bg-white/10" />
                    <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-500">Key Pillars</h2>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.pillars.map((pillar, i) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#4fc1c6]/30 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-[#4fc1c6]/10 flex items-center justify-center text-[#4fc1c6] mb-6 group-hover:scale-110 transition-transform">
                          {i === 0 ? <ShieldCheck size={20} /> : i === 1 ? <Target size={20} /> : i === 2 ? <Zap size={20} /> : <Globe size={20} />}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Process/How it works */}
              {project.process && (
                <section className="mb-20">
                  <h2 className="text-2xl font-bold mb-10">Campaign Journey</h2>
                  <div className="space-y-4">
                    {project.process.map((step, i) => (
                      <div key={i} className="flex items-start gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
                        <span className="text-3xl font-black text-white/10 font-mono">{step.step}</span>
                        <div>
                          <h4 className="text-base font-bold text-white mb-1">{step.title}</h4>
                          <p className="text-zinc-500 text-xs">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          </div>

          {/* Right Column: Visuals & Stats (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Smaller Image Card */}
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex flex-col gap-1 mb-6">
                    <span className="text-[#4fc1c6] font-mono text-[9px] tracking-widest uppercase">Inaugurated By</span>
                    <span className="text-base font-bold text-white uppercase leading-tight">{project.inauguratedBy}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {project.detailedStats?.map((stat, i) => (
                      <div key={i} className="flex justify-between items-center p-3 px-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">{stat.label}</span>
                        <span className="text-[#4fc1c6] text-sm font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Card */}
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                <h4 className="text-sm font-mono tracking-widest uppercase text-zinc-500 mb-6">Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-xs font-medium hover:border-[#4fc1c6]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External CTA */}
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 rounded-full bg-[#4fc1c6] text-black font-bold tracking-widest text-[10px] uppercase text-center hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(79,193,198,0.15)]"
              >
                Visit Live Portal
              </a>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
