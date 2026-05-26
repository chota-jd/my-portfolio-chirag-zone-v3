import type { BlogCategoryName } from '@/lib/blog/categories';

export type BlogGenerationInput = {
  title: string;
  description?: string;
  category: BlogCategoryName | string;
};

/**
 * Edit this template to change cover art style across all generated posts.
 * `{subject}` is replaced with Gemini's coverImageSubject.
 */
export const BLOG_COVER_IMAGE_STYLE_PROMPT = `Create a stunning, editorial-quality blog hero image.

Visual style:
- Modern, cinematic, high contrast, magazine-quality
- Rich depth, subtle grain, professional color grading
- No text, no logos, no watermarks, no faces unless essential to the story
- 16:9 composition with clear focal point and negative space for title overlay
- Category-appropriate mood (tech: sleek neon accents; travel: vivid landscapes; AI: abstract neural light)

Subject to illustrate: {subject}`;

export const BLOG_GENERATION_SYSTEM_PROMPT = `You are an expert blog writer and SEO strategist for a personal portfolio by Chirag Prajapati, a developer who ships useful products.

Write in clear, modern English. Be practical and specific. Avoid fluff, clichés, and generic AI phrases like "In today's fast-paced world" or "Let's dive in".

Return ONLY valid JSON matching this schema (no markdown fences):
{
  "excerpt": "string, 1-2 sentences for cards",
  "slug": "string, lowercase url slug with hyphens only, max 80 chars",
  "coverImageSubject": "string, 1-2 sentences describing a compelling hero image scene (no style instructions — subject only)",
  "seo": {
    "metaTitle": "string, 50-60 chars, include focus keyword naturally",
    "metaDescription": "string, 140-160 chars, compelling click-worthy summary",
    "focusKeyword": "string, primary keyword phrase",
    "keywords": ["string", "5-8 relevant long-tail keywords"],
    "ogTitle": "string, can match metaTitle or be slightly more social",
    "ogDescription": "string, 1-2 sentences for social shares"
  },
  "sections": [
    {
      "type": "paragraph" | "h2" | "h3" | "blockquote",
      "content": "string"
    }
  ]
}

SEO rules:
- metaTitle and metaDescription must be unique and specific to this post
- focusKeyword should appear in metaTitle, first h2, and naturally in body
- keywords must be lowercase phrases, no duplicates
- ogDescription should work standalone on Twitter/LinkedIn

Content rules:
- Write 6-10 sections total
- Include at least 2 h2 headings
- Paragraphs: 2-4 sentences each
- Tailor depth and examples to the category
- If author description is provided, use it as the angle — do not ignore it
- slug derived from title`;

export type CoverImagePromptInput = {
  title: string;
  category: string;
  subject: string;
  excerpt?: string;
};

export function buildCoverImagePrompt(input: CoverImagePromptInput): string {
  const { title, category, subject, excerpt } = input;

  const base = BLOG_COVER_IMAGE_STYLE_PROMPT.replace('{subject}', subject.trim());

  return `${base}

Blog title: ${title}
Category: ${category}
${excerpt ? `Article summary: ${excerpt}` : ''}

The image must feel premium and scroll-stopping for a developer portfolio blog.`;
}

export function buildBlogGenerationPrompt(input: BlogGenerationInput): string {
  const { title, description, category } = input;

  return `${BLOG_GENERATION_SYSTEM_PROMPT}

---
Generate a blog post with these inputs:

Title: ${title}
Category: ${category}
${description ? `Author notes / description: ${description}` : 'Author notes / description: (none — infer a strong angle from the title and category)'}

Return JSON only.`;
}
