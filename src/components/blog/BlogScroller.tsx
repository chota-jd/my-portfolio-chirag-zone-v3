'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BlogCard from '@/components/blog/BlogCard';
import type { BlogPostListItem } from '@/sanity/types';

export default function BlogScroller({ posts }: { posts: BlogPostListItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateCardTransforms = () => {
      const cards = track.querySelectorAll('.blog-card-custom') as NodeListOf<HTMLElement>;
      const viewportCenterX = window.innerWidth / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distX = cardCenterX - viewportCenterX;
        
        const maxDist = window.innerWidth || 800;
        const t = Math.max(-1, Math.min(1, distX / (maxDist * 0.75)));

        const translateY = t * t * 45;
        const rotate = t * -9.5;

        card.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
      });
    };

    // Run once on mount to establish base tilts
    updateCardTransforms();

    gsap.registerPlugin(ScrollTrigger);
    
    const isMobile = window.innerWidth <= 1024;
    let scrollTween: any = null;

    if (!isMobile && posts.length > 0) {
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
      container.style.overflowX = 'auto';
      
      const onScrollMobile = () => {
        updateCardTransforms();
      };
      
      container.addEventListener('scroll', onScrollMobile, { passive: true });
      
      return () => {
        container.removeEventListener('scroll', onScrollMobile);
      };
    }
  }, [posts]);

  // Adjust card transforms on window resizing
  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.querySelectorAll('.blog-card-custom') as NodeListOf<HTMLElement>;
      const viewportCenterX = window.innerWidth / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distX = cardCenterX - viewportCenterX;
        
        const maxDist = window.innerWidth || 800;
        const t = Math.max(-1, Math.min(1, distX / (maxDist * 0.75)));

        const translateY = t * t * 45;
        const rotate = t * -9.5;

        card.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="blog-grid-custom" ref={containerRef}>
      <div className="blog-track-custom" ref={trackRef}>
        {posts.map((post, idx) => (
          <BlogCard key={post._id} post={post} index={idx} />
        ))}
      </div>
    </div>
  );
}
