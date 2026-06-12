export type GeneratedCoverImage = {
  base64: string;
  mimeType: string;
};

export async function generateCoverImageWithGemini(
  prompt: string
): Promise<GeneratedCoverImage> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL_IMAGE;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in .env');
  }

  if (!model) {
    throw new Error('GEMINI_MODEL_IMAGE is not configured in .env');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini image API error: ${errorText}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          inlineData?: { mimeType?: string; data?: string };
        }>;
      };
    }>;
  };

  const parts = data.candidates?.[0]?.content?.parts ?? [];

  for (const part of parts) {
    if (part.inlineData?.data) {
      return {
        base64: part.inlineData.data,
        mimeType: part.inlineData.mimeType ?? 'image/png',
      };
    }
  }

  throw new Error(
    'Gemini did not return an image. Check GEMINI_MODEL_IMAGE in .env and API access.'
  );
}
