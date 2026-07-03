import BlogCard from '@/components/blog/BlogCard';
import type { BlogPostListItem } from '@/sanity/types';

export default function BlogGrid({ posts }: { posts: BlogPostListItem[] }) {
  return (
    <div className="blog-list-grid">
      {posts.map((post, idx) => (
        <BlogCard key={post._id} post={post} index={idx} flat />
      ))}
    </div>
  );
}
