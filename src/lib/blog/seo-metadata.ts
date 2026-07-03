import type { Metadata } from 'next';

import type { BlogPost, BlogPostListItem } from '@/sanity/types';
import { getImageUrl, hasImageAsset } from '@/sanity/image';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chirag-prajapati.vercel.app';

export function buildBlogPostMetadata(post: BlogPost | BlogPostListItem): Metadata {
  const seo = post.seo;
  const title = seo?.metaTitle?.trim() || post.title;
  const description =
    seo?.metaDescription?.trim() || post.excerpt?.trim() || `Read ${post.title} on Chirag Prajapati's blog.`;
  const ogTitle = seo?.ogTitle?.trim() || title;
  const ogDescription = seo?.ogDescription?.trim() || description;
  const slug = post.slug?.current;
  const canonical = slug ? `${SITE_URL}/blog/${slug}` : `${SITE_URL}/blog`;
  const keywords = seo?.keywords?.filter(Boolean);

  const ogImageUrl = hasImageAsset(post.mainImage)
    ? getImageUrl(post.mainImage, { width: 1200, height: 630 })
    : undefined;

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: 'Chirag Prajapati',
      publishedTime: 'publishedAt' in post ? post.publishedAt : undefined,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630, alt: post.mainImage?.alt || title }]
        : undefined,
    },
    twitter: {
      card: ogImageUrl ? 'summary_large_image' : 'summary',
      title: ogTitle,
      description: ogDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}
