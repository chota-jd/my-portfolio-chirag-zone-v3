import { products } from '@/data/products';

import ProductCard from './ProductCard';

export default function ProductsGrid() {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
