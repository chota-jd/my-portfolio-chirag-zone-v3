import { buildBlogGenerationPrompt, type BlogGenerationInput } from '@/lib/blog/prompts/blog-generation';
import type { GeneratedBlogContent } from '@/lib/blog/types';

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';

export async function generateBlogWithGemini(
  input: BlogGenerationInput
): Promise<GeneratedBlogContent> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in .env');
  }

  const prompt = buildBlogGenerationPrompt(input);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${errorText}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Gemini returned an empty response');
  }

  const parsed = JSON.parse(rawText) as GeneratedBlogContent;

  if (
    !parsed.excerpt ||
    !parsed.slug ||
    !Array.isArray(parsed.sections) ||
    !parsed.seo?.metaTitle ||
    !parsed.coverImageSubject
  ) {
    throw new Error('Gemini response missing required fields (content, seo, or coverImageSubject)');
  }

  if (!input.includeStats) {
    parsed.sections = parsed.sections.filter((section) => section.type !== 'stats');
  }

  return parsed;
}
