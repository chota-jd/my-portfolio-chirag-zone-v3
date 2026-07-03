import HomePage from '@/components/HomePage';
import BlogSection, { HOMEPAGE_BLOG_LIMIT } from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <HomePage>
      <BlogSection limit={HOMEPAGE_BLOG_LIMIT} />
    </HomePage>
  );
}
