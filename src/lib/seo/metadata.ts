import type { Metadata } from 'next';

import {
  DEFAULT_OG_IMAGE,
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
} from './site';

type OgType = 'website' | 'article';

export type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: OgType;
  /** When true, `title` is used as-is (skips the root layout title template). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  publishedTime?: string;
};

function buildOgImages(image: string, alt: string) {
  const url = absoluteUrl(image);
  return [{ url, width: 1200, height: 630, alt }];
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '',
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  absoluteTitle = false,
  noIndex = false,
  publishedTime,
}: PageMetadataInput): Metadata {
  const canonical = path ? absoluteUrl(path) : SITE_URL;
  const images = buildOgImages(ogImage, title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      ...(publishedTime ? { publishedTime } : {}),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((img) => img.url),
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-video-preview': -1,
              'max-image-preview': 'large',
              'max-snippet': -1,
            },
          },
        }),
  };
}

export function buildRootMetadata(): Metadata {
  const images = buildOgImages(DEFAULT_OG_IMAGE, SITE_TITLE);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: images.map((img) => img.url),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(GOOGLE_SITE_VERIFICATION
      ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export function buildProjectMetadata(project: {
  title: string;
  description: string;
  slug: string;
  image: string;
  category?: string;
  technologies?: string[];
}): Metadata {
  return buildPageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    ogImage: project.image,
    keywords: [project.title, project.category, ...(project.technologies ?? [])].filter(
      Boolean
    ) as string[],
  });
}

export function buildProductMetadata(product: {
  title: string;
  description: string;
  slug: string;
  image: string;
  category?: string;
  technologies?: string[];
}): Metadata {
  return buildPageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${product.slug}`,
    ogImage: product.image,
    keywords: [product.title, product.category, ...(product.technologies ?? [])].filter(
      Boolean
    ) as string[],
  });
}
