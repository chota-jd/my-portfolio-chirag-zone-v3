export const SITE_EMAIL = 'chirag.wok@gmail.com';

export const SITE_GITHUB = 'https://github.com/chota-jd';
export const SITE_LINKEDIN = 'https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/';

export const SITE_SOCIAL_PROFILES = [SITE_GITHUB, SITE_LINKEDIN] as const;

/** Google Search Console verification token (not the full meta tag). */
export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://chirag-prajapati.vercel.app';

export const SITE_NAME = 'Chirag Prajapati';
export const SITE_TAGLINE = 'Digital architect';
export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const SITE_DESCRIPTION =
  'Full stack developer crafting high-performance web systems, interactive experiences, and scalable cloud solutions.';

export const SITE_KEYWORDS = [
  'Chirag Prajapati',
  'Digital architect',
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
