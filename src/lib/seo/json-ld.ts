import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_GITHUB,
  SITE_LINKEDIN,
  SITE_NAME,
  SITE_SOCIAL_PROFILES,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
} from './site';

type JsonLd = Record<string, unknown>;

function withContext(data: JsonLd): JsonLd {
  return { '@context': 'https://schema.org', ...data };
}

export function buildWebsiteJsonLd(): JsonLd {
  return withContext({
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}/#person` },
  });
}

export function buildPersonJsonLd(): JsonLd {
  return withContext({
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    jobTitle: SITE_TAGLINE,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    email: `mailto:${SITE_EMAIL}`,
    sameAs: [...SITE_SOCIAL_PROFILES],
  });
}

export function buildHomeJsonLd(): JsonLd[] {
  return [buildWebsiteJsonLd(), buildPersonJsonLd()];
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return withContext({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  });
}

export function buildBlogPostJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author?: string;
  imageUrl?: string | null;
}): JsonLd {
  const url = absoluteUrl(`/blog/${input.slug}`);

  return withContext({
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: url,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    author: {
      '@type': 'Person',
      name: input.author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: input.imageUrl ? [input.imageUrl] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      name: `${SITE_NAME} Blog`,
      url: absoluteUrl('/blog'),
    },
  });
}

export function buildProjectJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  image: string;
  liveUrl?: string;
}): JsonLd {
  const url = absoluteUrl(`/projects/${input.slug}`);

  return withContext({
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: input.title,
    description: input.description,
    url,
    image: absoluteUrl(input.image),
    creator: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SITE_GITHUB, SITE_LINKEDIN],
    },
    ...(input.liveUrl && input.liveUrl !== '#' ? { sameAs: input.liveUrl } : {}),
  });
}

export function buildProductJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  image: string;
  productLink?: string;
}): JsonLd {
  const url = absoluteUrl(`/products/${input.slug}`);

  return withContext({
    '@type': 'SoftwareApplication',
    '@id': `${url}#product`,
    name: input.title,
    description: input.description,
    url,
    image: absoluteUrl(input.image),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(input.productLink ? { sameAs: input.productLink } : {}),
  });
}

export function buildBlogListingJsonLd(): JsonLd {
  return withContext({
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: `${SITE_NAME} Blog`,
    description: 'Articles on building products, performance engineering, and shipping ideas with clarity.',
    url: absoluteUrl('/blog'),
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
  });
}
