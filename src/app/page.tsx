import HomePage from '@/components/HomePage';
import BlogSection from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <HomePage>
      <BlogSection limit={3} />
    </HomePage>
  );
}
