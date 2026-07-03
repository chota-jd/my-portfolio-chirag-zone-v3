'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { Copy, Facebook, Linkedin, Check, MessageCircle } from 'lucide-react';
import type { PortableTextBlock } from '@portabletext/types';

import PortableTextContent from '@/components/blog/PortableTextContent';
import { resetPageScroll } from '@/lib/scroll';
import type { BlogPost } from '@/sanity/types';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}

function extractTextFromBody(body?: PortableTextBlock[]): string {
  if (!body?.length) return '';

  const parts: string[] = [];

  for (const block of body) {
    if (block._type === 'block' && 'children' in block) {
      const children = (block as { children?: { text?: string }[] }).children ?? [];
      parts.push(children.map((child) => child.text ?? '').join(''));
    }
    if (block._type === 'blogCallout') {
      const b = block as { title?: string; body?: string };
      parts.push(b.title ?? '', b.body ?? '');
    }
    if (block._type === 'blogKeyPoints') {
      const b = block as { title?: string; items?: { text?: string }[] };
      parts.push(b.title ?? '', ...(b.items?.map((i) => i.text ?? '') ?? []));
    }
    if (block._type === 'blogStats') {
      const b = block as { items?: { value?: string; label?: string }[] };
      parts.push(...(b.items?.flatMap((i) => [i.value ?? '', i.label ?? '']) ?? []));
    }
  }

  return parts.join(' ');
}

function estimateReadTime(body?: PortableTextBlock[]) {
  const words = extractTextFromBody(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function BlogPostView({
  post,
  coverUrl,
}: {
  post: BlogPost;
  coverUrl: string | null;
}) {
  const [pageUrl, setPageUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const readMinutes = estimateReadTime(post.body);

  useLayoutEffect(() => {
    resetPageScroll();
  }, []);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const share = (platform: 'x' | 'facebook' | 'linkedin' | 'whatsapp') => {
    if (!pageUrl) return;
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(pageUrl);

    const links = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    window.open(links[platform], '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    if (!pageUrl) return;
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <main className="relative z-10">
        {/* Hero: full-bleed cover — bottom scrim only (no top/side dark bands) */}
        <section className="relative min-h-[min(85vh,720px)] w-full overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              aria-hidden
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950"
              aria-hidden
            />
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.45)_38%,transparent_72%)]"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex min-h-[min(85vh,720px)] w-full max-w-7xl flex-col justify-end px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-zinc-200 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] transition-colors hover:text-white"
            >
              <span className="text-[#4fc1c6]">‹</span>
              BACK TO BLOG
            </Link>

            <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-zinc-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {formatDate(post.publishedAt)}
              <span className="mx-2 text-zinc-600">•</span>
              {readMinutes} MIN READ
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-500">SHARE:</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => share('x')}
                  aria-label="Share on X"
                  className="text-white/80 transition-colors hover:text-[#4fc1c6]"
                >
                  <XIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => share('facebook')}
                  aria-label="Share on Facebook"
                  className="text-white/80 transition-colors hover:text-[#4fc1c6]"
                >
                  <Facebook size={18} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => share('linkedin')}
                  aria-label="Share on LinkedIn"
                  className="text-white/80 transition-colors hover:text-[#4fc1c6]"
                >
                  <Linkedin size={18} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => share('whatsapp')}
                  aria-label="Share on WhatsApp"
                  className="text-white/80 transition-colors hover:text-[#4fc1c6]"
                >
                  <MessageCircle size={18} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copy link"
                  className="text-white/80 transition-colors hover:text-[#4fc1c6]"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} strokeWidth={1.75} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Article body below hero */}
        <article className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {post.excerpt && (
            <p className="mb-10 w-full text-lg leading-relaxed text-zinc-400 md:text-xl">
              {post.excerpt}
            </p>
          )}

          {post.body && post.body.length > 0 && (
            <PortableTextContent value={post.body} />
          )}
        </article>
      </main>
    </div>
  );
}
