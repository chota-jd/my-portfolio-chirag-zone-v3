import { notFound } from 'next/navigation';

import BlogPostView from '@/components/blog/BlogPostView';
import JsonLd from '@/components/seo/JsonLd';
import { buildBlogPostMetadata } from '@/lib/blog/seo-metadata';
import { buildBlogPostJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo/json-ld';
import { getPostBySlug, getPostSlugs } from '@/sanity/queries';
import { getImageUrl } from '@/sanity/image';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverUrl = getImageUrl(post.mainImage, { width: 1400, height: 700 });
  const description =
    post.seo?.metaDescription?.trim() ||
    post.excerpt?.trim() ||
    `Read ${post.title} on Chirag Prajapati's blog.`;
  const ogImageUrl = getImageUrl(post.mainImage, { width: 1200, height: 630 });

  return (
    <>
      <JsonLd
        data={[
          buildBlogPostJsonLd({
            title: post.title,
            description,
            slug,
            publishedAt: post.publishedAt,
            author: post.author,
            imageUrl: ogImageUrl,
          }),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <BlogPostView post={post} coverUrl={coverUrl} />
    </>
  );
}
