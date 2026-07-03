import type { PortableTextBlock } from '@portabletext/types';

import { slugify } from '@/lib/blog/slug';
import { uploadImageAsset } from '@/lib/blog/sanity-asset';
import { sectionsToPortableText } from '@/lib/blog/portable-text';
import type { GeneratedBlogContent } from '@/lib/blog/types';
import { sanityWriteClient, isSanityWriteConfigured } from '@/sanity/write-client';

function blockKey() {
  return Math.random().toString(36).slice(2, 11);
}

async function getOrCreateCategoryId(categoryTitle: string): Promise<string> {
  if (!sanityWriteClient) {
    throw new Error('Sanity write client is not configured');
  }

  const existingId = await sanityWriteClient.fetch<string | null>(
    `*[_type == "category" && title == $title][0]._id`,
    { title: categoryTitle }
  );

  if (existingId) {
    return existingId;
  }

  const created = await sanityWriteClient.create({
    _type: 'category',
    title: categoryTitle,
    slug: {
      _type: 'slug',
      current: slugify(categoryTitle),
    },
  });

  return created._id;
}

export type PublishBlogInput = {
  title: string;
  category: string;
  description?: string;
  generated: GeneratedBlogContent;
};

export type PublishBlogResult = {
  documentId: string;
  slug: string;
};

export async function publishBlogToSanity(input: PublishBlogInput): Promise<PublishBlogResult> {
  if (!isSanityWriteConfigured() || !sanityWriteClient) {
    throw new Error('SANITY_API_WRITE_TOKEN is not configured in .env');
  }

  const categoryId = await getOrCreateCategoryId(input.category);
  const slug = input.generated.slug?.trim() || slugify(input.title);
  const excerpt =
    input.generated.excerpt?.trim() ||
    input.description?.trim() ||
    `An article about ${input.title}.`;

  const body: PortableTextBlock[] = sectionsToPortableText(input.generated.sections);
  const seo = input.generated.seo;

  let mainImage:
    | {
        _type: 'image';
        asset: { _type: 'reference'; _ref: string };
        alt: string;
      }
    | undefined;

  if (input.generated.coverImageBase64 && input.generated.coverImageMimeType) {
    const assetId = await uploadImageAsset(
      input.generated.coverImageBase64,
      input.generated.coverImageMimeType,
      `${slug}-cover`
    );

    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
      alt: `${input.title} — ${input.category} blog cover`,
    };
  }

  const document = await sanityWriteClient.create({
    _type: 'post',
    title: input.title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    author: 'Chirag Prajapati',
    publishedAt: new Date().toISOString(),
    excerpt,
    seo: seo
      ? {
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          focusKeyword: seo.focusKeyword,
          keywords: seo.keywords,
          ogTitle: seo.ogTitle,
          ogDescription: seo.ogDescription,
        }
      : undefined,
    coverImagePrompt: input.generated.coverImagePrompt,
    mainImage,
    body,
    categories: [
      {
        _type: 'reference',
        _ref: categoryId,
        _key: blockKey(),
      },
    ],
  });

  return {
    documentId: document._id,
    slug,
  };
}
