'use client';

import { products } from '@/data/products';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="ed-label">
      <span className="ed-label-index">{index}</span>
      <span>{children}</span>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const productIndex = products.findIndex((p) => p.slug === slug);
  const product = products[productIndex];

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink">
        <div className="text-center">
          <h1 className="ed-display mb-6 text-5xl">Product not found.</h1>
          <Link href="/products" className="ed-link inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to products
          </Link>
        </div>
      </div>
    );
  }

  const next = products[(productIndex + 1) % products.length];
  const sections: { key: string; label: string; render: () => React.ReactNode }[] = [];

  if (product.narrative) {
    sections.push({
      key: 'story',
      label: 'Story',
      render: () => (
        <div className="ed-prose">
          <p className="ed-dropcap">{product.narrative!.overview}</p>
          <p>{product.narrative!.impact}</p>
        </div>
      ),
    });
  }

  if (product.pillars) {
    sections.push({
      key: 'features',
      label: 'Key features',
      render: () => (
        <ul className="ed-feature-list">
          {product.pillars!.map((pillar) => (
            <li key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (product.process) {
    sections.push({
      key: 'process',
      label: 'How it works',
      render: () => (
        <ol className="ed-steps">
          {product.process!.map((step) => (
            <li key={step.step}>
              <span className="ed-step-num">{step.step}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    });
  }

  if (product.platformInsights) {
    sections.push({
      key: 'insights',
      label: 'At a glance',
      render: () => (
        <dl className="ed-facts">
          {product.platformInsights!.map((insight) => (
            <div key={insight.label}>
              <dt>{insight.label}</dt>
              <dd>{insight.value}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }

  return (
    <main className="ed-page">
      <div className="ed-container">
        <nav className="ed-topbar" aria-label="Product navigation">
          <button type="button" onClick={() => router.back()} className="ed-link inline-flex items-center gap-2">
            <ArrowLeft size={15} /> Back
          </button>
          <Link href="/products" className="ed-link">
            All products
          </Link>
        </nav>

        <header className="ed-masthead">
          <p className="ed-kicker">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.role}</span>
          </p>
          <h1 className="ed-display ed-title">{product.title}</h1>
          <p className="ed-lede">{product.description}</p>
          <div className="ed-masthead-actions">
            {product.productLink && product.productLink !== '#' && (
              <a href={product.productLink} target="_blank" rel="noopener noreferrer" className="ed-button">
                Visit {product.title} <ArrowUpRight size={16} />
              </a>
            )}
            <ul className="ed-tags" aria-label="Technologies">
              {product.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </header>

        <figure className="ed-figure">
          <a href={product.productLink} target="_blank" rel="noopener noreferrer">
            <img src={product.image} alt={`${product.title} preview`} width={1200} height={630} />
          </a>
          <figcaption>
            Fig. 1 — {product.title}, {product.category.toLowerCase()}.
          </figcaption>
        </figure>

        {sections.map((section, i) => (
          <section key={section.key} className="ed-section">
            <SectionLabel index={String(i + 1).padStart(2, '0')}>{section.label}</SectionLabel>
            <div className="ed-section-body">{section.render()}</div>
          </section>
        ))}

        {next && next.slug !== product.slug && (
          <Link href={`/products/${next.slug}`} className="ed-next">
            <span className="ed-kicker">Next product</span>
            <span className="ed-display ed-next-title">
              {next.title} <ArrowUpRight className="inline-block align-baseline" size={36} strokeWidth={1.25} />
            </span>
            <span className="ed-next-desc">{next.description}</span>
          </Link>
        )}
      </div>
    </main>
  );
}
