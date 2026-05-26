import { sanityWriteClient } from '@/sanity/write-client';

export async function uploadImageAsset(
  base64: string,
  mimeType: string,
  filename: string
): Promise<string> {
  if (!sanityWriteClient) {
    throw new Error('Sanity write client is not configured');
  }

  const buffer = Buffer.from(base64, 'base64');
  const extension = mimeType.includes('jpeg') ? 'jpg' : mimeType.includes('webp') ? 'webp' : 'png';

  const asset = await sanityWriteClient.assets.upload('image', buffer, {
    filename: filename.endsWith(extension) ? filename : `${filename}.${extension}`,
    contentType: mimeType,
  });

  return asset._id;
}
