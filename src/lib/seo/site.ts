export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://chirag-prajapati.vercel.app';

export const SITE_NAME = 'Chirag Prajapati';

export const SITE_DESCRIPTION =
  'Full stack developer crafting high-performance web systems, interactive experiences, and scalable cloud solutions.';

export const SITE_KEYWORDS = [
  'Chirag Prajapati',
  'Full Stack Developer',
  'Next.js',
  'React',
  'Portfolio',
  'Web Development',
  'TypeScript',
];

/** Default social preview image (1200×630 recommended). */
export const DEFAULT_OG_IMAGE = '/og-image.jpg';

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
