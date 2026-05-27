/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { products } from '@/data/products';
import { ChrHover } from '@/components/ui/ChrHover';

export default function ProductsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const pinTrigger = ScrollTrigger.create({
      id: 'products-pin',
      trigger: '#products',
      start: 'top top',
      end: '+=260%', // Expanded scroll space for comfortable viewing pacing
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeRangeEnd = 0.85; // Allow the last product to stay pinned and active from 0.85 to 1.00
        
        let idx = 0;
        if (progress >= activeRangeEnd) {
          idx = products.length - 1;
        } else {
          const normProgress = progress / activeRangeEnd;
          idx = Math.floor(normProgress * (products.length - 1));
        }
        
        setActiveIdx(Math.min(products.length - 1, Math.max(0, idx)));
      },
    });

    return () => {
      pinTrigger.kill();
    };
  }, [isMobile]);

  const handleItemClick = (index: number) => {
    if (isMobile) {
      setActiveIdx(index);
      return;
    }

    const scrollTriggerInstance = ScrollTrigger.getById('products-pin');
    if (scrollTriggerInstance) {
      const start = scrollTriggerInstance.start;
      const end = scrollTriggerInstance.end;
      const totalDist = end - start;
      
      // Calculate the exact midpoint of the item's active scroll range
      const activeRangeEnd = 0.85;
      let targetProgress = 0;
      if (index === products.length - 1) {
        targetProgress = activeRangeEnd + 0.075; // Middle of [0.85, 1.00] range
      } else {
        const step = activeRangeEnd / (products.length - 1);
        targetProgress = (index + 0.5) * step; // Middle of item's specific sub-range
      }
      
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
          SaaS <span className="other-accent">Products.</span>
        </h2>
        <p className="products-subtitle">
          I design and architect high-impact digital systems that scale. Here is a curated selection of products I lead.
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

              const transformStyle = isMobile
                ? {
                    opacity: isActive ? 1 : 0.35,
                    color: isActive ? '#ff1e00' : '#f0f0f0',
                  }
                : {
                    transform: `translateY(calc(-50% + ${translateY}px)) rotate(${rotate}deg) translateX(${translateX}px)`,
                    opacity: isActive ? 1 : 0.22,
                    zIndex: isActive ? 10 : 5 - Math.abs(diff),
                    color: isActive ? '#ff1e00' : '#f0f0f0',
                    pointerEvents: 'auto' as const,
                    position: 'absolute' as const,
                    top: '50%',
                  };

              return (
                <div
                  key={product.id}
                  className={`products-wheel-item ${isActive ? 'active' : ''}`}
                  style={transformStyle}
                  onClick={() => handleItemClick(i)}
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

              {activeProduct.productLink && activeProduct.productLink !== '#' && (
                <div style={{ display: 'inline-flex', marginTop: '1rem' }}>
                  <ChrHover
                    text="LAUNCH PLATFORM 🡺"
                    href={activeProduct.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
