import Link from 'next/link';

import BlogCard from '@/components/blog/BlogCard';
import { getPosts } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/env';
import SectionHeading from '@/components/ui/SectionHeading';

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
      <section
        id="blog"
        className="flex min-h-[50vh] items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden bg-black/20"
      >
        <div className="max-w-3xl mx-auto text-center">
          {!hideHeader && (
            <SectionHeading spacing="lg" titleClassName="sm:text-6xl" className="mb-8">
              Latest <span className="gradient-text">articles</span>
            </SectionHeading>
          )}
          <p className="text-zinc-400 text-lg sm:text-xl">No blog available</p>
          {!hideHeader && (
            <p className="mt-3 text-sm text-zinc-500">
              Publish your first article in Sanity Studio to see it here.
            </p>
          )}
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
          <SectionHeading
            spacing="lg"
            titleClassName="sm:text-6xl"
            subtitle="Thoughts on building products, performance, and shipping ideas with clarity."
          >
            Latest <span className="gradient-text">articles</span>
          </SectionHeading>
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
