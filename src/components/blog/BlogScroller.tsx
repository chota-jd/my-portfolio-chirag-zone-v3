'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BlogCard from '@/components/blog/BlogCard';
import { HomeSectionViewMoreLink } from '@/components/ui/HomeSectionViewMoreLink';
import type { BlogPostListItem } from '@/sanity/types';

const TOUCH_LAYOUT_QUERY = '(max-width: 1024px), (hover: none) and (pointer: coarse)';

function isTouchLayout() {
  return window.matchMedia(TOUCH_LAYOUT_QUERY).matches;
}

function resetImageParallax(track: HTMLElement) {
  track.querySelectorAll<HTMLElement>('.blog-card-img').forEach((img) => {
    img.style.transform = '';
  });
}

/**
 * Homepage journal strip: the section pins and the row of flat cards slides
 * sideways as you scroll. Each cover drifts inside its frame (parallax) and a
 * progress rail + counter show how far through the strip you are.
 * Touch layouts fall back to a native swipe row with snap.
 */
export default function BlogScroller({
  posts,
  showViewMore = false,
}: {
  posts: BlogPostListItem[];
  /** Render the "View more" link at the end of the progress row (saves a row of height). */
  showViewMore?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const total = posts.length;
  const pad = (n: number) => String(n).padStart(2, '0');

  // Image drift: covers shift opposite to their distance from the viewport centre.
  const updateParallax = () => {
    const track = trackRef.current;
    if (!track) return;
    if (isTouchLayout()) {
      resetImageParallax(track);
      return;
    }
    const centre = window.innerWidth / 2;
    track.querySelectorAll<HTMLElement>('.blog-card-custom').forEach((card) => {
      const img = card.querySelector<HTMLElement>('.blog-card-img');
      if (!img) return;
      const rect = card.getBoundingClientRect();
      const t = Math.max(-1, Math.min(1, (rect.left + rect.width / 2 - centre) / window.innerWidth));
      img.style.transform = `translate3d(${(-t * 9).toFixed(2)}%, 0, 0) scale(1.18)`;
    });
  };

  const updateProgress = (progress: number) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${Math.max(0.02, progress)})`;
    if (counterRef.current && total > 0) {
      const current = Math.min(total, Math.max(1, Math.round(progress * (total - 1)) + 1));
      counterRef.current.textContent = pad(current);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    gsap.registerPlugin(ScrollTrigger);
    updateParallax();
    updateProgress(0);

    if (isTouchLayout() || posts.length === 0) {
      resetImageParallax(track);
      container.style.overflowX = 'auto';
      const onScroll = () => {
        const max = container.scrollWidth - container.clientWidth;
        updateProgress(max > 0 ? container.scrollLeft / max : 0);
      };
      container.addEventListener('scroll', onScroll, { passive: true });
      return () => container.removeEventListener('scroll', onScroll);
    }

    // clip (not hidden) so vertical overflow such as hover lift is not cut off
    container.style.overflowX = 'clip';

    const scrollTween = gsap.to(track, {
      x: () => -Math.max(100, track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        id: 'blog-pin',
        trigger: '#blog',
        start: 'top top',
        end: () => `+=${Math.max(350, track.scrollWidth - window.innerWidth) + 250}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateParallax();
          updateProgress(self.progress);
        },
      },
    });

    // This pin adds scroll distance, so every trigger below it (e.g. the contact
    // blob) must be measured after it. It can be created after the contact
    // section's triggers, so re-order all triggers by page position, then
    // recalculate once images/fonts have settled.
    ScrollTrigger.sort();
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      updateParallax();
    }, 150);

    return () => {
      clearTimeout(refreshTimeout);
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  useEffect(() => {
    const onResize = () => updateParallax();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
     
  }, []);

  return (
    <>
      <div className="blog-grid-custom" ref={containerRef} data-lenis-prevent-horizontal>
        <div className="blog-track-custom" ref={trackRef}>
          {posts.map((post, idx) => (
            <BlogCard key={post._id} post={post} index={idx} />
          ))}
        </div>
      </div>

      {(total > 1 || showViewMore) && (
        <div className="blog-progress">
          {total > 1 && (
            <>
              <span className="blog-progress-count" aria-hidden="true">
                <span ref={counterRef}>01</span>
                <span className="blog-progress-total"> / {pad(total)}</span>
              </span>
              <div className="blog-progress-rail" aria-hidden="true">
                <div className="blog-progress-fill" ref={fillRef} />
              </div>
            </>
          )}
          {showViewMore ? (
            <span className="blog-progress-more">
              <HomeSectionViewMoreLink href="/blog" sectionId="blog" text="ALL ARTICLES 🡺" />
            </span>
          ) : (
            <span className="blog-progress-hint" aria-hidden="true">Scroll</span>
          )}
        </div>
      )}
    </>
  );
}
