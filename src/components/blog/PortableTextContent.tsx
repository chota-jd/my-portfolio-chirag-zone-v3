'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

import BlogIcon from '@/components/blog/BlogIcon';
import { getImageUrl } from '@/sanity/image';
import type { SanityImageAsset } from '@/sanity/types';

type CalloutValue = {
  variant?: 'tip' | 'insight' | 'highlight';
  title?: string;
  body?: string;
  icon?: string;
};

type KeyPointsValue = {
  title?: string;
  items?: { icon?: string; text?: string }[];
};

type StatsValue = {
  items?: { icon?: string; value?: string; label?: string }[];
};

const calloutLabel: Record<string, string> = {
  tip: 'Tip',
  insight: 'Insight',
  highlight: 'Note',
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="ed-rt-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="ed-rt-h3">{children}</h3>,
    normal: ({ children }) => <p className="ed-rt-p">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="ed-rt-quote">
        <p>{children}</p>
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          className="ed-rt-link"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => <ul className="ed-rt-list">{children}</ul>,
    number: ({ children }) => <ol className="ed-rt-list ed-rt-list--num">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = getImageUrl(value as SanityImageAsset, { width: 1200 });
      if (!imageUrl) return null;
      return (
        <figure className="ed-figure ed-rt-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={value.alt ?? 'Blog image'} />
          {value.alt && <figcaption>{value.alt}</figcaption>}
        </figure>
      );
    },
    blogCallout: ({ value }) => {
      const v = value as CalloutValue;
      const variant = v.variant ?? 'insight';
      return (
        <aside className="ed-rt-callout">
          <div className="ed-rt-callout-head">
            <BlogIcon name={v.icon} className="h-4 w-4" />
            <span>{calloutLabel[variant] ?? 'Note'}</span>
          </div>
          {v.title && <p className="ed-rt-callout-title">{v.title}</p>}
          {v.body && <p className="ed-rt-callout-body">{v.body}</p>}
        </aside>
      );
    },
    blogKeyPoints: ({ value }) => {
      const v = value as KeyPointsValue;
      const items = v.items ?? [];
      if (!items.length) return null;

      return (
        <section className="ed-rt-points">
          <h4 className="ed-kicker">{v.title ?? 'Key takeaways'}</h4>
          <ol>
            {items.map((item, i) => (
              <li key={`${item.text}-${i}`}>
                <span className="ed-rt-points-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    },
    blogStats: ({ value }) => {
      const v = value as StatsValue;
      const statItems = v.items ?? [];
      if (!statItems.length) return null;

      return (
        <ul className="ed-rt-stats">
          {statItems.map((item, i) => (
            <li key={`${item.label}-${i}`}>
              <p className="ed-rt-stat-value">{item.value}</p>
              <p className="ed-rt-stat-label">{item.label}</p>
            </li>
          ))}
        </ul>
      );
    },
    blogDivider: () => (
      <hr className="ed-rt-divider" aria-hidden="true" />
    ),
  },
};

export default function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="blog-rich-content ed-rt">
      <PortableText value={value} components={components} />
    </div>
  );
}
