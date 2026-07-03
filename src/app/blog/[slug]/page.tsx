import { notFound } from 'next/navigation';

import BlogPostView from '@/components/blog/BlogPostView';
import { buildBlogPostMetadata } from '@/lib/blog/seo-metadata';
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

  return <BlogPostView post={post} coverUrl={coverUrl} />;
}
