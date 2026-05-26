import Link from 'next/link';

import BlogCard from '@/components/blog/BlogCard';
import { getPosts } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/env';

export default async function BlogSection({
  limit = 3,
  hideViewMore = false,
  hideHeader = false,
}: {
  limit?: number;
  hideViewMore?: boolean;
  hideHeader?: boolean;
}) {
  const posts = limit !== undefined ? await getPosts(limit) : await getPosts();

  if (!isSanityConfigured()) {
    return (
      <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden bg-black/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-400 text-lg">
            Blog is almost ready. Add your Sanity project ID in{' '}
            <code className="text-[#4fc1c6]">.env.local</code> to load posts.
          </p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden bg-black/20">
        <div className="max-w-3xl mx-auto text-center">
          {!hideHeader && (
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
              Latest <span className="gradient-text">articles</span>
            </h2>
          )}
          <p className="text-zinc-400 text-lg">No posts yet. Publish your first article in Sanity Studio.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden bg-black/20">
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#4fc1c6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {!hideHeader && (
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
              Latest <span className="gradient-text">articles</span>
            </h2>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#4fc1c6] to-transparent mx-auto mb-8" />
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Thoughts on building products, performance, and shipping ideas with clarity.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>

        {!hideViewMore && (
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="group relative inline-block overflow-hidden px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs uppercase hover:bg-[#4fc1c6] hover:text-black hover:border-[#4fc1c6] transition-all duration-500 shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">View All Articles</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
