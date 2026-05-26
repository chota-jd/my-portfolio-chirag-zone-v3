import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import BlogSection from '@/components/sections/BlogSection';

export const metadata = {
  title: 'Blog | Chirag Prajapati',
  description:
    'Stories from the stack — practical reads on building products, writing better code, and lessons from shipping.',
};

export default function BlogPage() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <AnimatedBackground />

      <main className="relative z-10 pt-20">
        <div className="container-custom py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
              Stories from the <span className="gradient-text">stack</span>
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Practical reads on building products, writing better code, and what I learn while
              shipping real work.
            </p>
          </div>

          <BlogSection hideHeader hideViewMore />
        </div>
      </main>

      <Footer />
    </div>
  );
}
