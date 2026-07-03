/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { products } from '@/data/products';
import { ChrHover } from '@/components/ui/ChrHover';

function indexForProgress(progress: number, count: number) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.round(progress * (count - 1)));
}

function progressForIndex(index: number, count: number) {
  if (count <= 1) return 0;
  return index / (count - 1);
}

export default function ProductsSection({
  showPageLink = false,
}: {
  /** Homepage: link to the full /products page */
  showPageLink?: boolean;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isNarrow, setIsNarrow] = useState(false);
  const [disablePin, setDisablePin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth <= 768);
      setDisablePin(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (disablePin) return;

    gsap.registerPlugin(ScrollTrigger);

    const pinTrigger = ScrollTrigger.create({
      id: 'products-pin',
      trigger: '#products',
      start: 'top top',
      end: `+=${Math.max(260, (products.length - 1) * 50)}%`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setActiveIdx(indexForProgress(self.progress, products.length));
      },
    });

    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      clearTimeout(refreshTimeout);
      pinTrigger.kill();
    };
  }, [disablePin, products.length]);

  const handleItemClick = (index: number) => {
    if (disablePin) {
      setActiveIdx(index);
      return;
    }

    const scrollTriggerInstance = ScrollTrigger.getById('products-pin');
    if (scrollTriggerInstance) {
      const start = scrollTriggerInstance.start;
      const end = scrollTriggerInstance.end;
      const totalDist = end - start;
      const targetProgress = progressForIndex(index, products.length);
      const targetScroll = start + targetProgress * totalDist;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      setActiveIdx(index);
    }
  };

  const activeProduct = products[activeIdx] || products[0];

  return (
    <section id="products" className="products-split">
      {/* Left Column: Curved Title Selector Wheel */}
      <div className="products-split-left">
        <h2 className="products-title">
          Product <span className="other-accent">Contributions.</span>
        </h2>
        <p className="products-subtitle">
          Contributing to enterprise-grade solutions and high-impact digital products. Explore the professional
          projects where I&apos;ve contributed as a core team member.
        </p>

        <div className="products-wheel-container">
          <div className="products-wheel-list">
            {products.map((product, i) => {
              const diff = i - activeIdx;
              const isActive = i === activeIdx;

              // Calculate precise circular wheel offsets based on fromanother.love
              const R = 500; // Radius of the circle
              const angleStep = 13.0; // Degree step between items
              const angleRad = (diff * angleStep) * Math.PI / 180;
              const translateY = R * Math.sin(angleRad);
              const translateX = R * (Math.cos(angleRad) - 1);
              const rotate = diff * angleStep; // CSS rotation angle

              // Dynamic distance-based opacity drop-off (active = 1.0, 1 step = 0.35, 2 steps = 0.12, 3+ steps = hidden)
              // This strictly prevents titles from gathering and mixing at the top/bottom edges of the page.
              const distance = Math.abs(diff);
              const itemOpacity = isActive 
                ? 1 
                : distance === 1 
                  ? 0.35 
                  : distance === 2 
                    ? 0.12 
                    : 0;

              const transformStyle = isNarrow
                ? undefined
                : {
                    transform: `translateY(calc(-50% + ${translateY}px)) rotate(${rotate}deg) translateX(${translateX}px)`,
                    opacity: itemOpacity,
                    zIndex: isActive ? 10 : 5 - distance,
                    color: isActive ? '#ff1e00' : '#f0f0f0',
                    pointerEvents: isActive || distance <= 2 ? ('auto' as const) : ('none' as const),
                    position: 'absolute' as const,
                    top: '50%',
                  };

              return (
                <div
                  key={product.id}
                  className={`products-wheel-item ${isActive ? 'active' : ''}`}
                  style={transformStyle}
                  onClick={() => {
                    if (isNarrow || isActive || distance <= 2) {
                      handleItemClick(i);
                    }
                  }}
                >
                  {isActive && <span className="product-active-circle" />}
                  {product.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Detailed Product View Panel */}
      <div className="products-split-right">
        {activeProduct && (
          <div key={activeIdx} className="product-detail-view animate-products-fade">
            <div className="product-detail-image-wrap">
              {activeProduct.thumbnailImage ? (
                <img
                  src={activeProduct.thumbnailImage}
                  alt={activeProduct.title}
                  className="product-detail-image"
                  width={1200}
                  height={630}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                  <span className="text-xl font-light text-zinc-800 tracking-widest font-breton">SAAS PRODUCT</span>
                </div>
              )}
            </div>

            <div className="product-detail-info-block">
              <span className="product-detail-role">
                {activeProduct.role || 'LEAD DEVELOPER'}
              </span>
              
              <p className="product-detail-desc">
                {activeProduct.fullDescription || activeProduct.description}
              </p>

              <div className="product-detail-actions">
                {activeProduct.productLink && activeProduct.productLink !== '#' && (
                  <ChrHover
                    text="PRODUCT LINK 🡺"
                    href={activeProduct.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showPageLink && (
        <div className="products-view-more">
          <Link href="/products" style={{ display: 'inline-flex' }}>
            <ChrHover text="VIEW MORE 🡺" />
          </Link>
        </div>
      )}
    </section>
  );
}
