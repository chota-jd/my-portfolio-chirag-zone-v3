import { products } from '@/data/products';
import { buildProductMetadata } from '@/lib/seo/metadata';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Pick<LayoutProps, 'params'>) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: 'Product not found' };
  }

  return buildProductMetadata({
    title: product.title,
    description: product.fullDescription || product.description,
    slug: product.slug,
    image: product.image,
    category: product.category,
    technologies: product.technologies,
  });
}

export default function ProductSlugLayout({ children }: LayoutProps) {
  return children;
}
