import type { BlogCategoryName } from '@/lib/blog/categories';

export type BlogGenerationInput = {
  title: string;
  description?: string;
  category: BlogCategoryName | string;
};

/**
 * Allowed Lucide icon names for callouts, key points, and stats.
 * Gemini must pick from this list only.
 */
export const BLOG_ALLOWED_ICONS = [
  'Lightbulb',
  'TrendingUp',
  'Rocket',
  'Target',
  'Globe',
  'Cpu',
  'Users',
  'Zap',
  'BarChart3',
  'MapPin',
  'Brain',
  'Code2',
  'Briefcase',
  'LineChart',
  'Shield',
  'Sparkles',
  'Building2',
  'GraduationCap',
  'Network',
  'Layers',
] as const;

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

Write in clear, modern English. Be practical, specific, and engaging. Avoid fluff, clichés, and generic AI phrases like "In today's fast-paced world" or "Let's dive in".

Return ONLY valid JSON matching this schema (no markdown fences):
{
  "excerpt": "string, 2-3 compelling sentences for cards",
  "slug": "string, lowercase url slug with hyphens only, max 80 chars",
  "coverImageSubject": "string, 1-2 sentences describing a compelling hero image scene (subject only, no style)",
  "seo": {
    "metaTitle": "string, 50-60 chars, include focus keyword naturally",
    "metaDescription": "string, 140-160 chars, compelling click-worthy summary",
    "focusKeyword": "string, primary keyword phrase",
    "keywords": ["string", "5-8 relevant long-tail keywords"],
    "ogTitle": "string",
    "ogDescription": "string, 1-2 sentences for social shares"
  },
  "sections": [
    { "type": "paragraph", "content": "string, 3-5 sentences" },
    { "type": "h2", "content": "string, section heading" },
    { "type": "h3", "content": "string, subsection heading" },
    { "type": "blockquote", "content": "string, 1-2 punchy sentences" },
    { "type": "bulletList", "items": ["string", "3-6 items, each 1-2 sentences max"] },
    { "type": "numberedList", "items": ["string", "3-5 steps or ranked points"] },
    {
      "type": "callout",
      "variant": "tip" | "insight" | "highlight",
      "title": "string, short headline",
      "content": "string, 2-3 sentences",
      "icon": "string, one of: ${BLOG_ALLOWED_ICONS.join(', ')}"
    },
    {
      "type": "keyPoints",
      "title": "string, e.g. Why this matters",
      "items": [
        { "icon": "Lucide name from allowed list", "text": "string, one clear point" }
      ]
    },
    {
      "type": "stats",
      "items": [
        { "icon": "Lucide name", "value": "string e.g. 40%", "label": "string, short label" }
      ]
    },
    { "type": "divider" }
  ]
}

SEO rules:
- metaTitle and metaDescription must be unique and specific
- focusKeyword in metaTitle, first h2, and naturally in body
- keywords: lowercase, no duplicates

Content rules (IMPORTANT — rich, scannable article):
- Target 1,400–2,000 words total across all text fields
- Use 18–28 sections with varied types — never only paragraphs
- Structure: intro paragraphs → stats or keyPoints early → 4–6 h2 sections, each with h3, bullets, and at least one callout
- Include exactly 2–3 callout blocks (mix tip, insight, highlight)
- Include 1 keyPoints block (4–5 items with icons) and 1 stats block (3–4 stats with icons)
- Include 3+ bulletList or numberedList sections
- Include 2 blockquotes at meaningful moments
- Use 1–2 divider sections between major parts
- Use icons that match the topic (tech: Cpu, Code2; growth: TrendingUp; people: Users)
- Add concrete examples, numbers, India/global context when category fits
- If author description is provided, use it as the thesis — do not ignore it
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
