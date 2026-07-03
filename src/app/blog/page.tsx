import Footer from '@/components/ui/Footer';
import BlogSection from '@/components/sections/BlogSection';

export const metadata = {
  title: 'Blog | Chirag Prajapati',
  description:
    'Latest articles — thoughts on building products, performance, and shipping ideas with clarity.',
};

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <main className="relative z-10">
        <BlogSection variant="grid" hideViewMore />
      </main>
      <Footer />
    </div>
  );
}
