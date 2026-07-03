import { sanityClient } from './client';
import { isSanityConfigured } from './env';
import type { BlogPost, BlogPostListItem } from './types';

const postFields = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author,
  seo {
    metaTitle,
    metaDescription,
    focusKeyword,
    keywords,
    ogTitle,
    ogDescription
  },
  mainImage {
    asset->{ _id, url },
    alt
  },
  categories[]->{
    _id,
    title,
    slug
  }
`;

export async function getPosts(limit?: number): Promise<BlogPostListItem[]> {
  if (!isSanityConfigured() || !sanityClient) return [];

  const limitClause = typeof limit === 'number' ? `[0...${limit}]` : '';

  return sanityClient.fetch<BlogPostListItem[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${limitClause} {
      ${postFields}
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured() || !sanityClient) return null;

  return sanityClient.fetch<BlogPost | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body
    }`,
    { slug }
  );
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured() || !sanityClient) return [];

  return sanityClient.fetch<string[]>(
    `*[_type == "post" && defined(slug.current)].slug.current`
  );
}
