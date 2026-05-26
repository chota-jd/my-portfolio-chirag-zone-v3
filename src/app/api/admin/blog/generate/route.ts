import { NextResponse } from 'next/server';

import { BLOG_CATEGORIES } from '@/lib/blog/categories';
import { verifyAdminSecret } from '@/lib/blog/admin-auth';
import { generateBlogWithGemini } from '@/lib/blog/gemini';
import { generateCoverImageWithGemini } from '@/lib/blog/gemini-image';
import { buildCoverImagePrompt } from '@/lib/blog/prompts/blog-generation';

export async function POST(request: Request) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, category } = body ?? {};

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    if (!category?.trim()) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedDescription = description?.trim() || undefined;

    const generated = await generateBlogWithGemini({
      title: trimmedTitle,
      description: trimmedDescription,
      category: trimmedCategory,
    });

    const coverImagePrompt = buildCoverImagePrompt({
      title: trimmedTitle,
      category: trimmedCategory,
      subject: generated.coverImageSubject,
      excerpt: generated.excerpt,
    });

    const coverImage = await generateCoverImageWithGemini(coverImagePrompt);

    return NextResponse.json({
      generated: {
        ...generated,
        coverImagePrompt,
        coverImageBase64: coverImage.base64,
        coverImageMimeType: coverImage.mimeType,
      },
      categories: BLOG_CATEGORIES,
    });
  } catch (err) {
    console.error('Blog generate error', err);
    const message = err instanceof Error ? err.message : 'Failed to generate blog';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
