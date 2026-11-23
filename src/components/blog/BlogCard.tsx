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

/** Editorial article card: numbered, image on top, serif headline below. */
export default function BlogCard({ post, index }: { post: BlogPostListItem; index: number }) {
  const imageUrl = getImageUrl(post.mainImage, { width: 960, height: 720 });

  return (
    <article className="blog-card-custom">
      <Link href={`/blog/${post.slug.current}`} className="absolute inset-0 z-10" aria-label={post.title} />

      <div className="blog-card-img-wrap">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            className="blog-card-img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-paper-3">
            <span className="ed-display text-3xl italic text-ink/30">Journal</span>
          </div>
        )}
      </div>

      <div className="blog-card-info">
        <div className="blog-card-meta">
          <span className="blog-card-num">No. {String(index + 1).padStart(2, '0')}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>

        <h3 className="blog-card-title">{post.title}</h3>

        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}

        <div className="blog-card-link">
          Read article <span aria-hidden="true">→</span>
        </div>
      </div>
    </article>
  );
}
