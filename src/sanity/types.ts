import type { PortableTextBlock } from '@portabletext/types';

export type SanitySlug = {
  current: string;
};

export type SanityImageAsset = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  alt?: string;
};

export type BlogCategory = {
  _id: string;
  title: string;
  slug: SanitySlug;
};

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt: string;
  mainImage?: SanityImageAsset;
  categories?: BlogCategory[];
};

export type BlogPost = BlogPostListItem & {
  body?: PortableTextBlock[];
  author?: string;
};
