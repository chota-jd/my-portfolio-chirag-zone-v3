import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import BlogSection from '@/components/sections/BlogSection';

export const metadata = {
  title: 'Blog | Chirag Prajapati',
  description: 'Articles on product development, performance, and building scalable software.',
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
              Writing & <span className="gradient-text">insights</span>
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Notes from the workbench — product thinking, engineering craft, and lessons from shipping.
            </p>
          </div>

          <BlogSection hideHeader hideViewMore />
        </div>
      </main>

      <Footer />
    </div>
  );
}
