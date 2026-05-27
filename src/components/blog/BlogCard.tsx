/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getImageUrl } from '@/sanity/image';
import type { BlogPostListItem } from '@/sanity/types';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogCard({ post, index }: { post: BlogPostListItem; index: number }) {
  const imageUrl = getImageUrl(post.mainImage, { width: 800, height: 1060 }); // 3:4 aspect ratio optimized
  const categoryTitle = post.categories?.[0]?.title ?? 'DEVELOPMENT';

  // Staggered angles and displacements to recreate the casual magazine cover deck of fromanother.love
  const isEven = index % 2 === 0;
  const rotation = isEven ? -1.8 - (index % 3) * 0.4 : 1.5 + (index % 4) * 0.3;
  const translateVal = isEven ? -8 - (index % 2) * 4 : 6 + (index % 3) * 3;

  const cardStyle = {
    transform: `rotate(${rotation}deg) translateY(${translateVal}px)`,
  } as React.CSSProperties;

  return (
    <article className="blog-card-custom" style={cardStyle}>
      <Link href={`/blog/${post.slug.current}`} className="absolute inset-0 z-10" aria-label={post.title} />

      <div className="blog-card-img-wrap">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            className="blog-card-img"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
            <span className="text-2xl font-light text-zinc-800 tracking-wider font-breton">BLOG</span>
          </div>
        )}
      </div>

      <div className="blog-card-info">
        <div className="blog-card-meta">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="blog-card-tag">{categoryTitle}</span>
        </div>

        <h3 className="blog-card-title">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="blog-card-excerpt">{post.excerpt}</p>
        )}

        <div className="blog-card-link">
          READ ARTICLE <span style={{ fontSize: '1.2em', verticalAlign: '-0.05em', fontFamily: 'sans-serif' }}>→</span>
        </div>
      </div>
    </article>
  );
}
