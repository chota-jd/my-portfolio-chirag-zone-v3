import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { publishBlogToSanity } from '@/lib/blog/sanity-publish';
import type { GeneratedBlogContent } from '@/lib/blog/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, generated } = body ?? {};

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    if (!category?.trim()) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    if (!generated?.sections?.length) {
      return NextResponse.json(
        { error: 'Generated content is required. Run generate first.' },
        { status: 400 }
      );
    }

    const result = await publishBlogToSanity({
      title: title.trim(),
      description: description?.trim() || undefined,
      category: category.trim(),
      generated: generated as GeneratedBlogContent,
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${result.slug}`);
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      ...result,
      url: `/blog/${result.slug}`,
    });
  } catch (err) {
    console.error('Blog publish error', err);
    const message = err instanceof Error ? err.message : 'Failed to publish blog';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
