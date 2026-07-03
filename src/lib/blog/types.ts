import type { BlogSection } from '@/lib/blog/portable-text';

export type { BlogSection };

export type GeneratedBlogSeo = {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
};

export type GeneratedBlogContent = {
  excerpt: string;
  slug: string;
  sections: BlogSection[];
  seo: GeneratedBlogSeo;
  /** Short visual subject from Gemini (fed into buildCoverImagePrompt). */
  coverImageSubject: string;
  /** Full prompt sent to the image model — stored in Sanity for reference. */
  coverImagePrompt?: string;
  /** Base64 image data for preview + publish (not from Gemini JSON). */
  coverImageBase64?: string;
  coverImageMimeType?: string;
};

export type BlogPostSeo = {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
};
