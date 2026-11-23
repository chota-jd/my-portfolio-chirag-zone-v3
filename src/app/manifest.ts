import type { MetadataRoute } from 'next';

import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  absoluteUrl,
} from '@/lib/seo/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f0e8',
    theme_color: '#f4f0e8',
    lang: 'en',
    icons: [
      {
        src: '/icon.jpg',
        sizes: '48x48',
        type: 'image/jpeg',
      },
      {
        src: absoluteUrl(DEFAULT_OG_IMAGE),
        sizes: '1024x534',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  };
}
