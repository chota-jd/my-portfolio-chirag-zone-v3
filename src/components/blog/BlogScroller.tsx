'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BlogCard from '@/components/blog/BlogCard';
import type { BlogPostListItem } from '@/sanity/types';

const TOUCH_LAYOUT_QUERY = '(max-width: 1024px), (hover: none) and (pointer: coarse)';

function isTouchLayout() {
  return window.matchMedia(TOUCH_LAYOUT_QUERY).matches;
}

function resetCardTransforms(track: HTMLElement) {
  track.querySelectorAll('.blog-card-custom').forEach((card) => {
    (card as HTMLElement).style.transform = '';
  });
}

export default function BlogScroller({ posts }: { posts: BlogPostListItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [flatCards, setFlatCards] = useState(false);

  // Core translation & rotation math to establish the dramatic outward-tilting circular arch
  const updateCardTransforms = () => {
    const track = trackRef.current;
    if (!track) return;

    if (isTouchLayout()) {
      resetCardTransforms(track);
      return;
    }

    const cards = track.querySelectorAll('.blog-card-custom') as NodeListOf<HTMLElement>;
    const viewportCenterX = window.innerWidth / 2;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const distX = cardCenterX - viewportCenterX;

      const maxDist = window.innerWidth || 800;
      const t = Math.max(-1, Math.min(1, distX / (maxDist * 0.75)));

      const translateY = t * t * 100;
      const rotate = t * 14.5;

      card.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    });
  };

  useEffect(() => {
    const touchMq = window.matchMedia(TOUCH_LAYOUT_QUERY);
    const syncLayoutMode = () => setFlatCards(touchMq.matches);
    syncLayoutMode();
    touchMq.addEventListener('change', syncLayoutMode);
    return () => touchMq.removeEventListener('change', syncLayoutMode);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    updateCardTransforms();

    gsap.registerPlugin(ScrollTrigger);

    const touchLayout = isTouchLayout();
    let scrollTween: gsap.core.Tween | null = null;

    if (!touchLayout && posts.length > 0) {
      container.style.overflowX = 'hidden';

      // We translate the inner 'trackRef' (track) while the outer 'containerRef' (container)
      // serves as the pinned mask boundary!
      scrollTween = gsap.to(track, {
        x: () => {
          const scrollAmount = track.scrollWidth - window.innerWidth;
          return -Math.max(100, scrollAmount);
        },
        ease: 'none',
        scrollTrigger: {
          id: 'blog-pin',
          trigger: '#blog',
          start: 'top top',
          end: () => {
            const scrollAmount = track.scrollWidth - window.innerWidth;
            return `+=${Math.max(350, scrollAmount) + 250}`;
          },
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: () => {
            updateCardTransforms();
          },
        },
      });

      // Explicitly trigger a refresh after a small delay to ensure all pin spacers are calculated accurately
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        updateCardTransforms();
      }, 150);

      return () => {
        clearTimeout(refreshTimeout);
        if (scrollTween) {
          scrollTween.kill();
          if (scrollTween.scrollTrigger) {
            scrollTween.scrollTrigger.kill();
          }
        }
      };
    } else {
      resetCardTransforms(track);
      container.style.overflowX = 'auto';
    }
  }, [posts]);

  useEffect(() => {
    const handleLayoutChange = () => {
      updateCardTransforms();
    };

    window.addEventListener('resize', handleLayoutChange, { passive: true });
    window.addEventListener('orientationchange', handleLayoutChange);
    return () => {
      window.removeEventListener('resize', handleLayoutChange);
      window.removeEventListener('orientationchange', handleLayoutChange);
    };
  }, []);

  return (
    <div className="blog-grid-custom" ref={containerRef} data-lenis-prevent>
      <div className="blog-track-custom" ref={trackRef}>
        {posts.map((post, idx) => (
          <BlogCard key={post._id} post={post} index={idx} flat={flatCards} />
        ))}
      </div>
    </div>
  );
}
