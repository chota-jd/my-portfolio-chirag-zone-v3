'use client';

/* eslint-disable @next/next/no-img-element */
import { ChrHover } from '@/components/ui/ChrHover';
import type { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
  const image = product.thumbnailImage || product.image;

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        {image ? (
          <img src={image} alt={product.title} className="product-card-image" loading="lazy" />
        ) : (
          <div className="product-card-image-fallback">SAAS PRODUCT</div>
        )}
      </div>

      <div className="product-card-body">
        <span className="product-card-role">{product.role}</span>
        <h2 className="product-card-title">{product.title}</h2>
        <p className="product-card-desc">{product.description}</p>

        {product.productLink && product.productLink !== '#' && (
          <div className="product-card-action">
            <ChrHover
              text="PRODUCT LINK 🡺"
              href={product.productLink}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        )}
      </div>
    </article>
  );
}
