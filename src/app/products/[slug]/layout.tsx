import { products } from '@/data/products';
import JsonLd from '@/components/seo/JsonLd';
import { buildProductMetadata } from '@/lib/seo/metadata';
import { buildBreadcrumbJsonLd, buildProductJsonLd } from '@/lib/seo/json-ld';

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

export default async function ProductSlugLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return children;
  }

  const description = product.fullDescription || product.description;

  return (
    <>
      <JsonLd
        data={[
          buildProductJsonLd({
            title: product.title,
            description,
            slug: product.slug,
            image: product.image,
            productLink: product.productLink,
          }),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: product.title, path: `/products/${product.slug}` },
          ]),
        ]}
      />
      {children}
    </>
  );
}
