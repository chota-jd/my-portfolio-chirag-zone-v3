/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Calendar, ArrowUpRight } from 'lucide-react';

import { getImageUrl } from '@/sanity/image';
import type { BlogPostListItem } from '@/sanity/types';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogCard({ post }: { post: BlogPostListItem }) {
  const imageUrl = getImageUrl(post.mainImage, { width: 800, height: 450 });

  return (
    <article className="group relative h-full">
      <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:border-[#4fc1c6]/50 group-hover:shadow-[0_0_40px_rgba(79,193,198,0.15)]">
        <Link href={`/blog/${post.slug.current}`} className="absolute inset-0 z-10" aria-label={post.title} />

        <div className="aspect-video overflow-hidden relative bg-zinc-950">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.mainImage?.alt ?? post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
              <span className="text-4xl font-bold text-[#4fc1c6]/30">Blog</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} className="text-[#4fc1c6]" />
              {formatDate(post.publishedAt)}
            </span>
            {post.categories?.slice(0, 2).map((cat) => (
              <span
                key={cat._id}
                className="px-2 py-0.5 rounded-full border border-[#4fc1c6]/20 text-[#4fc1c6] text-[10px] uppercase tracking-wider"
              >
                {cat.title}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4fc1c6] transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-4">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-1 text-xs font-bold tracking-widest text-[#4fc1c6] uppercase relative z-20">
            <Link href={`/blog/${post.slug.current}`} className="inline-flex items-center gap-1 hover:underline">
              Read article
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
