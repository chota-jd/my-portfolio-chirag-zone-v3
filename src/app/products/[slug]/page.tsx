'use client';

import { products } from '@/data/products';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export default function ProductDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-[#4fc1c6] hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={20} /> Back to Products
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
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4fc1c6]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Back Button */}
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
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                {product.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? '' : 'gradient-text'}>
                    {word}{' '}
                  </span>
                ))}
              </h1>



              <p className="text-base lg:text-lg text-zinc-400 leading-relaxed mb-16 font-light">
                {product.fullDescription || product.description}
              </p>

              {product.narrative && (
                <section className="mb-20">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-white/10" />
                    <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-500">Product Story</h2>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="space-y-6 rounded-[2rem] bg-white/[0.02] border border-white/5 p-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
                      <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">{product.narrative.overview}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Impact</h3>
                      <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">{product.narrative.impact}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Pillars Section */}
              {product.pillars && (
                <section className="mb-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-px flex-1 bg-white/10" />
                    <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-500">Key Features</h2>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.pillars.map((pillar, i) => (
                      <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#4fc1c6]/30 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-[#4fc1c6]/10 flex items-center justify-center text-[#4fc1c6] mb-6 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Process Section */}
              {product.process && (
                <section className="mb-20">
                  <h2 className="text-2xl font-bold mb-10">Development Journey</h2>
                  <div className="space-y-4">
                    {product.process.map((step, i) => (
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

              {product.platformInsights && (
                <section className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-white/10" />
                    <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-500">Product Insights</h2>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.platformInsights.map((insight, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-2">{insight.label}</p>
                        <p className="text-sm text-zinc-200 leading-relaxed">{insight.value}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}


            </div>
          </div>

          {/* Right Column: Visuals & CTAs (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="space-y-8">
              {/* Image Card */}
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                <div className="aspect-video relative overflow-hidden">
                  <a 
                    href={product.productLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4">Product Overview</h3>
                  <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                    A high-impact contribution focusing on modern digital transformation.
                  </p>

                  <a
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#4fc1c6] text-black font-bold tracking-widest text-[10px] uppercase hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(79,193,198,0.15)]"
                  >
                    View Live Product <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Quick Info */}
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                <h4 className="text-sm font-mono tracking-widest uppercase text-zinc-500 mb-6">Contribution Details</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Role</span>
                    <span className="text-white text-sm font-bold">{product.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Category</span>
                    <span className="text-white text-sm font-bold">{product.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </main>
  );
}
