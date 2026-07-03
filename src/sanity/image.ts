import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { dataset, projectId } from './env';
import type { SanityImageAsset } from './types';

const builder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

/** True when Sanity image has a usable asset (uploaded image, not an empty field). */
export function hasImageAsset(image?: SanityImageAsset | null): boolean {
  if (!image?.asset) return false;
  const { asset } = image;
  return Boolean(asset.url || asset._ref || asset._id);
}

export function urlForImage(source: SanityImageSource | SanityImageAsset | null | undefined) {
  if (!builder || !source || !hasImageAsset(source as SanityImageAsset)) {
    return null;
  }

  try {
    return builder.image(source as SanityImageSource).auto('format').fit('max');
  } catch {
    return null;
  }
}

type ImageSizeOptions = {
  width?: number;
  height?: number;
};

/** Safe image URL for cards and covers — handles missing/null assets from Sanity. */
export function getImageUrl(
  image?: SanityImageAsset | null,
  options?: ImageSizeOptions
): string | null {
  if (!hasImageAsset(image)) return null;

  const directUrl = image!.asset!.url;
  if (directUrl && !options?.width && !options?.height) {
    return directUrl;
  }

  const built = urlForImage(image);
  if (!built) return directUrl ?? null;

  let sized = built;
  if (options?.width) sized = sized.width(options.width);
  if (options?.height) sized = sized.height(options.height);

  return sized.url() ?? directUrl ?? null;
}
