'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Facebook, Linkedin, Check, MessageCircle } from 'lucide-react';
import type { PortableTextBlock } from '@portabletext/types';

import PortableTextContent from '@/components/blog/PortableTextContent';
import { resetPageScroll } from '@/lib/scroll';
import type { BlogPost } from '@/sanity/types';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
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

  const shareButtons: { label: string; onClick: () => void; icon: React.ReactNode }[] = [
    { label: 'Share on X', onClick: () => share('x'), icon: <XIcon className="h-4 w-4" /> },
    { label: 'Share on Facebook', onClick: () => share('facebook'), icon: <Facebook size={17} strokeWidth={1.6} /> },
    { label: 'Share on LinkedIn', onClick: () => share('linkedin'), icon: <Linkedin size={17} strokeWidth={1.6} /> },
    { label: 'Share on WhatsApp', onClick: () => share('whatsapp'), icon: <MessageCircle size={17} strokeWidth={1.6} /> },
    {
      label: copied ? 'Link copied' : 'Copy link',
      onClick: copyLink,
      icon: copied ? <Check size={17} /> : <Copy size={17} strokeWidth={1.6} />,
    },
  ];

  return (
    <main className="ed-page">
      <article>
        <header className="ed-container ed-article-head">
          <nav className="ed-topbar" aria-label="Article navigation">
            <Link href="/blog" className="ed-link inline-flex items-center gap-2">
              <ArrowLeft size={15} /> All articles
            </Link>
          </nav>

          <p className="ed-kicker">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{readMinutes} min read</span>
          </p>

          <h1 className="ed-display ed-article-title">{post.title}</h1>

          {post.excerpt && <p className="ed-lede ed-article-lede">{post.excerpt}</p>}

          <div className="ed-share">
            <span className="ed-kicker">Share</span>
            <div className="flex items-center gap-1">
              {shareButtons.map((b) => (
                <button key={b.label} type="button" onClick={b.onClick} aria-label={b.label} className="ed-icon-btn">
                  {b.icon}
                </button>
              ))}
            </div>
          </div>
        </header>

        {coverUrl && (
          <figure className="ed-container ed-figure ed-article-cover">
            <img src={coverUrl} alt="" aria-hidden />
          </figure>
        )}

        <div className="ed-article-body">
          {post.body && post.body.length > 0 && <PortableTextContent value={post.body} />}

          <footer className="ed-article-foot">
            <Link href="/blog" className="ed-link inline-flex items-center gap-2">
              <ArrowLeft size={15} /> Back to all articles
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
