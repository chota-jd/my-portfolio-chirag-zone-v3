import BlogGrid from '@/components/blog/BlogGrid';
import BlogScroller from '@/components/blog/BlogScroller';
import { HomeSectionViewMoreLink } from '@/components/ui/HomeSectionViewMoreLink';
import { getPosts } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/env';

export const HOMEPAGE_BLOG_LIMIT = 6;

export default async function BlogSection({
  limit,
  hideViewMore = false,
  hideHeader = false,
  variant = 'scroller',
}: {
  /** When set, only show this many posts (e.g. homepage preview). Omit on /blog for all posts. */
  limit?: number;
  hideViewMore?: boolean;
  hideHeader?: boolean;
  /** Scroller = homepage horizontal deck; grid = full listing on /blog */
  variant?: 'scroller' | 'grid';
}) {
  let posts;
  let hasMore = false;

  if (typeof limit === 'number') {
    const fetched = await getPosts(limit + 1);
    hasMore = fetched.length > limit;
    posts = fetched.slice(0, limit);
  } else {
    posts = await getPosts();
  }

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
    <section
      id="blog"
      className={`blog-section${variant === 'grid' ? ' blog-section--grid' : ''}`}
    >
      <div className="blog-section-inner relative z-10">
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

        {variant === 'grid' ? (
          <BlogGrid posts={posts} />
        ) : (
          <BlogScroller posts={posts} />
        )}

        {!hideViewMore && hasMore && variant === 'scroller' && (
          <div className="mt-16 text-center">
            <HomeSectionViewMoreLink href="/blog" sectionId="blog" />
          </div>
        )}
      </div>
    </section>
  );
}
