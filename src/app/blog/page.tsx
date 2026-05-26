import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import BlogSection from '@/components/sections/BlogSection';
import SectionHeading from '@/components/ui/SectionHeading';

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
          <SectionHeading
            as="h1"
            spacing="sm"
            titleClassName="text-5xl text-white md:text-7xl"
            subtitle="Practical reads on building products, writing better code, and what I learn while shipping real work."
          >
            Stories from the <span className="gradient-text">stack</span>
          </SectionHeading>

          <BlogSection hideHeader hideViewMore />
        </div>
      </main>

      <Footer />
    </div>
  );
}
