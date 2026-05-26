'use server';

import { revalidatePath } from 'next/cache';

import { generateBlogWithGemini } from '@/lib/blog/gemini';
import { generateCoverImageWithGemini } from '@/lib/blog/gemini-image';
import { buildCoverImagePrompt } from '@/lib/blog/prompts/blog-generation';
import { publishBlogToSanity } from '@/lib/blog/sanity-publish';
import type { GeneratedBlogContent } from '@/lib/blog/types';

export type GenerateBlogResult =
  | { success: true; generated: GeneratedBlogContent }
  | { success: false; error: string };

export type PublishBlogResult =
  | { success: true; url: string; slug: string }
  | { success: false; error: string };

export async function generateBlogAction(input: {
  title: string;
  description?: string;
  category: string;
}): Promise<GenerateBlogResult> {
  try {
    const title = input.title?.trim();
    const category = input.category?.trim();
    const description = input.description?.trim() || undefined;

    if (!title) {
      return { success: false, error: 'Title is required' };
    }
    if (!category) {
      return { success: false, error: 'Category is required' };
    }

    const generated = await generateBlogWithGemini({ title, description, category });

    const coverImagePrompt = buildCoverImagePrompt({
      title,
      category,
      subject: generated.coverImageSubject,
      excerpt: generated.excerpt,
    });

    const coverImage = await generateCoverImageWithGemini(coverImagePrompt);

    return {
      success: true,
      generated: {
        ...generated,
        coverImagePrompt,
        coverImageBase64: coverImage.base64,
        coverImageMimeType: coverImage.mimeType,
      },
    };
  } catch (err) {
    console.error('generateBlogAction', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to generate blog',
    };
  }
}

export async function publishBlogAction(input: {
  title: string;
  description?: string;
  category: string;
  generated: GeneratedBlogContent;
}): Promise<PublishBlogResult> {
  try {
    const title = input.title?.trim();
    const category = input.category?.trim();
    const description = input.description?.trim() || undefined;

    if (!title) {
      return { success: false, error: 'Title is required' };
    }
    if (!category) {
      return { success: false, error: 'Category is required' };
    }
    if (!input.generated?.sections?.length) {
      return { success: false, error: 'Generated content is required. Run generate first.' };
    }

    const result = await publishBlogToSanity({
      title,
      description,
      category,
      generated: input.generated,
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${result.slug}`);
    revalidatePath('/');

    return {
      success: true,
      url: `/blog/${result.slug}`,
      slug: result.slug,
    };
  } catch (err) {
    console.error('publishBlogAction', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to publish blog',
    };
  }
}
