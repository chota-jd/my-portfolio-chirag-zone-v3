'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Github, ExternalLink, ArrowUpRight, Package, Sparkles, Eye, Image as ImageIcon } from 'lucide-react';

import { products } from '@/data/products';

export default function ProductsSection({
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
  const [showAll, setShowAll] = useState(showAllDefault);

  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden bg-black/20">
      {/* Background Glows */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-[11px] font-mono tracking-widest text-purple-400 mb-4"
            >
              <Package size={12} />
              PRODUCT CONTRIBUTIONS
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight"
            >
              I am <span className="gradient-text-purple">contributing</span> to
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-24 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 max-w-2xl mx-auto text-lg"
            >
              Beyond personal projects, I collaborate on high-impact digital products that serve millions of users across various industries.
            </motion.p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                  <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" />
                  {/* Image Container */}
                  <div className="aspect-video overflow-hidden relative">
                    <a 
                      href={product.productLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-20"
                    >
                      <img 
                        src={product.thumbnailImage} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </a>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Hover Overlay with Links */}
                    <div className="absolute inset-0 z-30 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px] pointer-events-none">
                      <a 
                        href={product.productLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-purple-500 text-black hover:scale-110 transition-transform shadow-xl pointer-events-auto"
                        title="View Product"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a 
                        href={product.thumbnailImage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-110 transition-transform shadow-xl backdrop-blur-md pointer-events-auto"
                        title="View Preview"
                      >
                        <Eye size={20} />
                      </a>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest text-white uppercase">
                        {product.icon}
                        {product.category}
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20 backdrop-blur-sm">
                        {product.role}
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col justify-between h-1/2">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.technologies.map(tech => (
                          <span key={tech} className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-20">
                      <a
                        href={product.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-400 uppercase hover:text-purple-400 transition-colors"
                      >
                        Visit Product <ExternalLink size={14} />
                      </a>

                      <Link
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-1 text-xs font-bold tracking-widest text-purple-400 uppercase hover:underline"
                      >
                        Details <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Hover Overlay Gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${product.color}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        {!hideViewMore && !showAll && products.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <Link
              href="/products"
              className="group relative inline-block overflow-hidden px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs uppercase hover:bg-purple-500 hover:text-black hover:border-purple-500 transition-all duration-500 shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Products <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-500" />
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
