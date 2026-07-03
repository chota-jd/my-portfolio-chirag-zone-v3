import type { Metadata } from 'next';

import { buildPageMetadata } from '@/lib/seo/metadata';
import { SITE_NAME } from '@/lib/seo/site';
import type { BlogPost, BlogPostListItem } from '@/sanity/types';
import { getImageUrl, hasImageAsset } from '@/sanity/image';

export function buildBlogPostMetadata(post: BlogPost | BlogPostListItem): Metadata {
  const seo = post.seo;
  const title = seo?.metaTitle?.trim() || post.title;
  const description =
    seo?.metaDescription?.trim() ||
    post.excerpt?.trim() ||
    `Read ${post.title} on ${SITE_NAME}'s blog.`;
  const ogTitle = seo?.ogTitle?.trim() || title;
  const ogDescription = seo?.ogDescription?.trim() || description;
  const slug = post.slug?.current;
  const keywords = seo?.keywords?.filter(Boolean);

  const ogImageUrl = hasImageAsset(post.mainImage)
    ? getImageUrl(post.mainImage, { width: 1200, height: 630 })
    : undefined;

  return buildPageMetadata({
    title: ogTitle,
    description: ogDescription,
    path: slug ? `/blog/${slug}` : '/blog',
    keywords: keywords?.length ? keywords : undefined,
    ogImage: ogImageUrl ?? undefined,
    ogType: 'article',
    absoluteTitle: true,
    publishedTime: 'publishedAt' in post ? post.publishedAt : undefined,
  });
}
