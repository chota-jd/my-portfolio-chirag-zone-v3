import Footer from '@/components/ui/Footer';
import ProductsGrid from '@/components/products/ProductsGrid';

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <main className="relative z-10">
        <section id="products" className="blog-section blog-section--grid">
          <div className="blog-section-inner relative z-10">
            <div className="blog-section-header">
              <h1 className="blog-section-title">
                Product <span className="other-accent">contributions.</span>
              </h1>
              <p className="blog-section-subtitle">
                Collaborating on enterprise-grade solutions and high-impact digital products.
                Explore the professional projects where I&apos;ve contributed as a core team member.
              </p>
            </div>

            <ProductsGrid />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
