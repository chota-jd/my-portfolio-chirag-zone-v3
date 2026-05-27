import Link from 'next/link';

import BlogScroller from '@/components/blog/BlogScroller';
import { getPosts } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/env';
import { ChrHover } from '@/components/ui/ChrHover';

export default async function BlogSection({
  limit,
  hideViewMore = false,
  hideHeader = false,
}: {
  /** When set, only show this many posts (e.g. homepage preview). Omit on /blog for all posts. */
  limit?: number;
  hideViewMore?: boolean;
  hideHeader?: boolean;
}) {
  const posts = typeof limit === 'number' ? await getPosts(limit) : await getPosts();

  if (!isSanityConfigured()) {
    return (
      <section id="blog" className="blog-section">
        <div className="text-center">
          <p className="text-zinc-400 text-lg">
            Blog is almost ready. Add your Sanity project ID in{' '}
            <code className="text-[#ff1e00]">.env.local</code> to load posts.
          </p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="blog-section flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          {!hideHeader && (
            <div className="blog-section-header" style={{ textAlign: 'center', margin: '0 auto' }}>
              <h2 className="blog-section-title">
                Latest <span className="other-accent">articles.</span>
              </h2>
            </div>
          )}
          <p className="text-zinc-400 text-lg">No articles available yet</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog-section">
      <div className="relative z-10">
        {!hideHeader && (
          <div className="blog-section-header">
            <h2 className="blog-section-title">
              Latest <span className="other-accent">articles.</span>
            </h2>
            <p className="blog-section-subtitle">
              Thoughts on building products, performance, and shipping ideas with clarity.
            </p>
          </div>
        )}

        <BlogScroller posts={posts} />

        {!hideViewMore && (
          <div className="mt-16 text-center">
            <Link href="/blog" style={{ display: 'inline-flex' }}>
              <ChrHover text="VIEW ALL ARTICLES 🡺" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
