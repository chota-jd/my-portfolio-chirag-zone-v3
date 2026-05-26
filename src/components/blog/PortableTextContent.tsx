'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

import { getImageUrl } from '@/sanity/image';
import type { SanityImageAsset } from '@/sanity/types';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-zinc-300 leading-relaxed mb-5 text-base sm:text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#4fc1c6] pl-5 my-8 text-zinc-400 italic">
        {children}
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
          className="text-[#4fc1c6] underline underline-offset-4 hover:text-white transition-colors"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-zinc-300">{children}</ol>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = getImageUrl(value as SanityImageAsset, { width: 1200 });
      if (!imageUrl) return null;
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={value.alt ?? 'Blog image'}
            className="w-full rounded-2xl border border-white/10"
          />
          {value.alt && (
            <figcaption className="text-center text-sm text-zinc-500 mt-3">{value.alt}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
