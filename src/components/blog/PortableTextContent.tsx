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

const calloutTheme: Record<
  string,
  { container: string; icon: string }
> = {
  tip: {
    container:
      'bg-gradient-to-br from-[#4fc1c6]/20 via-[#4fc1c6]/10 to-zinc-900/40',
    icon: 'bg-[#4fc1c6]/25 text-[#4fc1c6]',
  },
  insight: {
    container:
      'bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-zinc-900/40',
    icon: 'bg-violet-500/25 text-violet-300',
  },
  highlight: {
    container:
      'bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-zinc-900/40',
    icon: 'bg-amber-500/25 text-amber-300',
  },
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-14 mb-5 flex items-center gap-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        <span className="h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#4fc1c6] to-cyan-600" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 text-xl font-semibold text-white sm:text-2xl">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-[1.85] text-zinc-300 sm:text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 rounded-2xl bg-gradient-to-br from-[#4fc1c6]/15 via-zinc-900/60 to-zinc-950 px-6 py-6 sm:px-8">
        <p className="text-lg font-medium italic leading-relaxed text-zinc-200 sm:text-xl">
          {children}
        </p>
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
          className="text-[#4fc1c6] underline underline-offset-4 transition-colors hover:text-white"
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
    bullet: ({ children }) => (
      <ul className="mb-8 space-y-3 pl-1 sm:pl-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 list-decimal space-y-3 pl-6 sm:pl-8">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-base leading-relaxed text-zinc-300 sm:text-lg">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4fc1c6]" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-1 text-base leading-relaxed text-zinc-300 marker:text-[#4fc1c6] sm:text-lg">
        {children}
      </li>
    ),
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
            className="w-full rounded-2xl"
          />
          {value.alt && (
            <figcaption className="mt-3 text-center text-sm text-zinc-500">{value.alt}</figcaption>
          )}
        </figure>
      );
    },
    blogCallout: ({ value }) => {
      const v = value as CalloutValue;
      const variant = v.variant ?? 'insight';
      const theme = calloutTheme[variant] ?? calloutTheme.insight;
      return (
        <aside
          className={`my-10 flex w-full gap-5 rounded-2xl p-6 sm:gap-6 sm:p-8 ${theme.container}`}
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${theme.icon}`}
          >
            <BlogIcon name={v.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div className="min-w-0 flex-1">
            {v.title && <p className="mb-2 text-lg font-semibold text-white sm:text-xl">{v.title}</p>}
            {v.body && (
              <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">{v.body}</p>
            )}
          </div>
        </aside>
      );
    },
    blogKeyPoints: ({ value }) => {
      const v = value as KeyPointsValue;
      if (!v.items?.length) return null;
      return (
        <section className="my-12 rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950 p-6 sm:p-8">
          {v.title && (
            <h4 className="mb-6 flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-[#4fc1c6]">
              <BlogIcon name="Target" className="h-4 w-4" />
              {v.title}
            </h4>
          )}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {v.items.map((item, i) => (
              <li
                key={`${item.text}-${i}`}
                className="flex gap-4 rounded-xl bg-white/[0.04] p-4 transition-colors hover:bg-[#4fc1c6]/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4fc1c6]/20 text-[#4fc1c6]">
                  <BlogIcon name={item.icon} className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    },
    blogStats: ({ value }) => {
      const v = value as StatsValue;
      if (!v.items?.length) return null;

      const statThemes = [
        {
          card: 'bg-gradient-to-b from-zinc-900/95 to-black',
          glow: 'bg-[#4fc1c6]/10',
          icon: 'bg-zinc-800 text-[#4fc1c6] ring-1 ring-[#4fc1c6]/20',
        },
        {
          card: 'bg-gradient-to-b from-zinc-900/95 to-black',
          glow: 'bg-violet-500/8',
          icon: 'bg-zinc-800 text-violet-400 ring-1 ring-violet-500/20',
        },
        {
          card: 'bg-gradient-to-b from-zinc-900/95 to-black',
          glow: 'bg-[#4fc1c6]/8',
          icon: 'bg-zinc-800 text-[#4fc1c6] ring-1 ring-[#4fc1c6]/15',
        },
        {
          card: 'bg-gradient-to-b from-zinc-900/95 to-black',
          glow: 'bg-zinc-500/10',
          icon: 'bg-zinc-800 text-zinc-300 ring-1 ring-white/10',
        },
      ];

      return (
        <section className="relative my-16 w-full overflow-hidden rounded-3xl bg-zinc-950 ring-1 ring-white/[0.06]">
          <div
            className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"
            aria-hidden
          />

          <ul className="relative flex flex-col sm:flex-row sm:items-stretch">
            {v.items.map((item, i) => {
              const theme = statThemes[i % statThemes.length];
              const isLast = i === v.items.length - 1;
              return (
                <li
                  key={`${item.label}-${i}`}
                  className={`group relative flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:py-12 ${theme.card} ${
                    i > 0 ? 'sm:border-l sm:border-white/[0.06]' : ''
                  } ${!isLast ? 'border-b border-white/[0.06] sm:border-b-0' : ''}`}
                >
                  <div
                    className={`pointer-events-none absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl ${theme.glow}`}
                    aria-hidden
                  />
                  <div
                    className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${theme.icon}`}
                  >
                    <BlogIcon name={item.icon} className="h-7 w-7" />
                  </div>
                  <p className="relative text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl">
                    {item.value}
                  </p>
                  <p className="relative mt-3 max-w-[11rem] text-[11px] font-semibold uppercase leading-snug tracking-[0.2em] text-zinc-500">
                    {item.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      );
    },
    blogDivider: () => (
      <hr className="my-14 border-0 h-px bg-gradient-to-r from-transparent via-[#4fc1c6]/50 to-transparent" />
    ),
  },
};

export default function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="blog-rich-content w-full max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
