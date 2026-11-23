import BlogSection from '@/components/sections/BlogSection';

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-paper">
      <main className="relative z-10">
        <BlogSection variant="grid" hideViewMore />
      </main>
    </div>
  );
}
