/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';

import { products } from '@/data/products';

export default function ProductsSection({
  showAllDefault = false,
  hideViewMore = false,
  hideHeader = false,
}: {
  showAllDefault?: boolean;
  hideViewMore?: boolean;
  hideHeader?: boolean;
}) {
  const [showAll] = useState(showAllDefault);

  const displayedProducts = showAll ? products : products.slice(0, 3);

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden bg-black/20">
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {!hideHeader && (
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
              I am <span className="gradient-text">contributing</span> to
            </h2>

            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#4fc1c6] to-transparent mx-auto mb-8" />

            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              I collaborate on high-impact digital products that serve millions of users across various industries.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:border-[#4fc1c6]/50 group-hover:shadow-[0_0_40px_rgba(79,193,198,0.15)]">
                <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" />
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={product.thumbnailImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 flex flex-col justify-between h-1/2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#4fc1c6] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-4">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-center pt-4 border-t border-white/5 relative z-20">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-1 text-xs font-bold tracking-widest text-[#4fc1c6] uppercase hover:underline"
                    >
                      Details
                    </Link>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${product.color}`}
                />
              </div>
            </div>
          ))}
        </div>

        {!hideViewMore && !showAll && products.length > 3 && (
          <div className="mt-16 text-center">
            <Link
              href="/products"
              className="group relative inline-block overflow-hidden px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs uppercase hover:bg-[#4fc1c6] hover:text-black hover:border-[#4fc1c6] transition-all duration-500 shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">View All Products</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
