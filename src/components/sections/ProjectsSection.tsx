'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { ChrHover } from '@/components/ui/ChrHover';

// Render projects exclusively inside the projects list
const mergedItems = [
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    slug: p.slug,
    title: p.title,
    description: p.fullDescription || p.description,
    image: p.image,
    date: p.stats || '02 2026',
    tags: p.technologies,
    year: '2026',
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
  })),
];

type ProjectsSectionProps = {
  /** Hide built-in serif header (use page-level SectionHeading instead) */
  hideHeader?: boolean;
};

export default function ProjectsSection({ hideHeader = false }: ProjectsSectionProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const fluidLineRef = useRef<SVGPathElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Overlay modal references
  const detailRef = useRef<HTMLDivElement>(null);
  const detailTitleWrapRef = useRef<HTMLDivElement>(null);
  const detailTitleRef = useRef<HTMLHeadingElement>(null);
  const detailYearRef = useRef<HTMLSpanElement>(null);
  const detailDescRef = useRef<HTMLParagraphElement>(null);
  const detailTagsRef = useRef<HTMLDivElement>(null);
  const detailBackRef = useRef<HTMLDivElement>(null);
  const detailGalleryWrapRef = useRef<HTMLDivElement>(null);
  const detailThumbsInnerRef = useRef<HTMLDivElement>(null);
  const detailSelectedRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeThumbIdx, setActiveThumbIdx] = useState<number>(0);

  const goToProject = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;
    const items = document.querySelectorAll('.proj-item');
    const fluidLine = fluidLineRef.current;

    // Draw fluid line path as you scroll the section
    if (fluidLine) {
      const lineLen = fluidLine.getTotalLength();
      gsap.set(fluidLine, { strokeDasharray: lineLen, strokeDashoffset: lineLen });
      gsap.to(fluidLine, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });
    }

    let tiltTargetRY = 0;
    let tiltTargetRX = 0;
    let tiltRY = 0;
    let tiltRX = 0;
    let projectsVisible = false;

    // Trigger visibility of preview card based on view
    ScrollTrigger.create({
      trigger: '.proj-items-wrap',
      start: 'top 55%',
      end: 'bottom 20%',
      onEnter: () => {
        if (previewRef.current) previewRef.current.classList.add('visible');
        projectsVisible = true;
      },
      onLeave: () => {
        if (previewRef.current) previewRef.current.classList.remove('visible');
        projectsVisible = false;
      },
      onEnterBack: () => {
        if (previewRef.current) previewRef.current.classList.add('visible');
        projectsVisible = true;
      },
      onLeaveBack: () => {
        if (previewRef.current) previewRef.current.classList.remove('visible');
        projectsVisible = false;
      },
    });

    // Animate projects header title and description
    const headerTitle = hideHeader ? null : sectionRef.current?.querySelector('.projects-title');
    const headerDesc = hideHeader ? null : sectionRef.current?.querySelector('.projects-description');

    if (headerTitle && headerDesc) {
      gsap.fromTo(
        [headerTitle, headerDesc],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );
    }

    const itemQuickX = Array.from(items).map((item) =>
      gsap.quickTo(item, 'x', { duration: 0.6, ease: 'power2.out' })
    );

    // Dynamic scroll updater for X-translation offsets and closest active item
    const onScroll = () => {
      if (isMobile) return;
      const cy = window.innerHeight / 2;
      const halfH = window.innerHeight / 2;
      let closestIdx = -1;
      let closestDist = Infinity;

      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const itemCy = rect.top + rect.height / 2;
        const dist = Math.abs(itemCy - cy);
        
        itemQuickX[i](Math.min(dist / halfH, 1) * 80);

        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });

      if (closestIdx >= 0 && closestDist < window.innerHeight * 0.45) {
        setActiveIndex(closestIdx);
        items.forEach((item, i) => {
          if (i === closestIdx) {
            item.classList.add('active');
            if (coverRef.current && dateRef.current && cardRef.current) {
              const prevCover = coverRef.current.src;
              const nextCover = mergedItems[closestIdx].image;
              if (prevCover !== nextCover) {
                coverRef.current.src = nextCover;
                dateRef.current.textContent = mergedItems[closestIdx].date;
              }
            }
          } else {
            item.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    // Mouse movement: QuickTo custom cursor + 3D Card Tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || !projectsVisible) return;

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.35,
          ease: 'power3.out',
        });
      }

      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const ry = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
        const rx = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
        tiltTargetRY = ry * 6;
        tiltTargetRX = -rx * 5;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    const ticker = gsap.ticker.add(() => {
      if (!isMobile && projectsVisible && cardRef.current) {
        tiltRY += (tiltTargetRY - tiltRY) * 0.12;
        tiltRX += (tiltTargetRX - tiltRX) * 0.12;
        cardRef.current.style.transform = `rotateY(${tiltRY.toFixed(2)}deg) rotateX(${tiltRX.toFixed(2)}deg)`;
      }
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [hideHeader]);

  const openProject = (item: any, clickedEl: HTMLElement) => {
    setActiveItem(item);
    setActiveThumbIdx(0);

    const rect = clickedEl.getBoundingClientRect();
    const cs = getComputedStyle(clickedEl);
    const flyingTitle = document.getElementById('flying-title');

    if (flyingTitle) {
      flyingTitle.textContent = clickedEl.textContent;
      flyingTitle.style.fontSize = cs.fontSize;
      flyingTitle.style.lineHeight = cs.lineHeight;
      flyingTitle.style.letterSpacing = cs.letterSpacing;
      
      gsap.set(flyingTitle, {
        left: rect.left,
        top: rect.top,
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: 'left top',
      });

      clickedEl.style.visibility = 'hidden';

      const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const targetTop = window.innerHeight * 0.22;
      const targetLeft = remPx * 4;
      const targetFontSize = Math.min(Math.max(window.innerWidth * 0.05, remPx * 3), remPx * 5);

      const tl = gsap.timeline();

      // Premium transitions matches reference
      tl.to('#page-fade', { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0);
      tl.to(
        flyingTitle,
        {
          top: targetTop,
          left: targetLeft,
          fontSize: targetFontSize,
          duration: 1,
          ease: 'power3.inOut',
        },
        0.3
      );
      tl.to(
        detailRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onStart: () => {
            detailRef.current?.classList.add('active');
          },
        },
        1.0
      );
      tl.set(flyingTitle, { opacity: 0 }, 1.1);
      tl.set(detailTitleWrapRef.current, { opacity: 1 }, 1.1);
      tl.to(detailDescRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.2);
      tl.to(detailTagsRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.3);
      tl.to(detailBackRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.3);
      tl.fromTo(
        detailGalleryWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power3.out' },
        1.2
      );
    }
  };

  const closeProject = () => {
    if (!activeItem) return;
    
    const flyingTitle = document.getElementById('flying-title');
    const clickedEl = document.querySelector(`.proj-item[data-id="${activeItem.id}"]`) as HTMLElement;

    if (flyingTitle && detailTitleRef.current) {
      const dtRect = detailTitleRef.current.getBoundingClientRect();
      const dtCs = getComputedStyle(detailTitleRef.current);
      flyingTitle.textContent = detailTitleRef.current.textContent;
      flyingTitle.style.fontSize = dtCs.fontSize;
      flyingTitle.style.lineHeight = dtCs.lineHeight;
      flyingTitle.style.letterSpacing = dtCs.letterSpacing;

      gsap.set(flyingTitle, { left: dtRect.left, top: dtRect.top, opacity: 1, x: 0, y: 0 });
      gsap.set(detailTitleWrapRef.current, { opacity: 0 });

      const tl = gsap.timeline();

      tl.to([detailDescRef.current, detailTagsRef.current, detailBackRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, 0);
      tl.to(detailGalleryWrapRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0);
      tl.to(detailRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.2);

      if (clickedEl) {
        const itemRect = clickedEl.getBoundingClientRect();
        const itemCs = getComputedStyle(clickedEl);
        tl.to(
          flyingTitle,
          {
            left: itemRect.left,
            top: itemRect.top,
            fontSize: parseFloat(itemCs.fontSize),
            duration: 0.9,
            ease: 'power3.inOut',
          },
          0.3
        );
      }

      tl.to('#page-fade', { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.5);

      tl.add(() => {
        detailRef.current?.classList.remove('active');
        gsap.set(
          [
            detailTitleWrapRef.current,
            detailDescRef.current,
            detailTagsRef.current,
            detailBackRef.current,
            detailGalleryWrapRef.current,
          ],
          { opacity: 0 }
        );
        gsap.set(flyingTitle, { opacity: 0 });
        if (clickedEl) {
          clickedEl.style.visibility = '';
        }
        setActiveItem(null);
      });
    }
  };

  return (
    <>
      <div className="page-fade" id="page-fade"></div>
      <div className="flying-title" id="flying-title"></div>

      <section className="projects" id="projects" ref={sectionRef}>
        <svg
          className="fluid-line-svg"
          id="fluid-line-svg"
          viewBox="0 0 1400 1400"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            ref={fluidLineRef}
            className="fluid-line"
            id="fluid-line"
            d="
            M -80,0
            C 300,-20  600,150  540,400
            C 490,650   0,655    300,1050
            C 600,1385 650,1250 850,1200
            C 1050,1150 1350,1250 1540,1300
          "
          />
        </svg>

        <div className="projects-inner">
          <div className="projects-list" id="projects-list">
            {!hideHeader && (
              <div className="projects-header">
                <h2 className="projects-title">
                  Selected <span className="other-accent">Projects.</span>
                </h2>
                <p className="projects-description">
                  A curated showcase of high-performance web systems, creative software engineering, and digital solutions I&apos;ve designed and developed.
                </p>
              </div>
            )}

            <div
              className="proj-items-wrap"
              style={{ marginTop: hideHeader ? '0' : '3.5rem', width: '100%' }}
            >
              {mergedItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="proj-item"
                  data-id={item.id}
                  data-img={item.image}
                  data-date={item.date}
                  role="link"
                  tabIndex={0}
                  onClick={() => goToProject(item.slug)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goToProject(item.slug);
                    }
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="proj-preview" id="proj-preview" ref={previewRef}>
          <div
            className="proj-card"
            id="proj-card"
            ref={cardRef}
            role="link"
            tabIndex={0}
            onClick={() => {
              const item = mergedItems[activeIndex];
              if (item?.slug) goToProject(item.slug);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const item = mergedItems[activeIndex];
                if (item?.slug) goToProject(item.slug);
              }
            }}
          >
            <div className="proj-meta">
              <span className="proj-date" id="proj-date" ref={dateRef}>
                02 2026
              </span>
              <span className="proj-label">Preview</span>
            </div>
            <img id="proj-cover" ref={coverRef} src={mergedItems[0]?.image} alt="" />
          </div>
        </div>

        <div className="proj-cursor" id="proj-cursor" ref={cursorRef}>
          Open case study
        </div>
      </section>

      {/* Floating Detailed Visual Overlay matches detail page */}
      <section className="project-detail" id="project-detail" ref={detailRef}>
        <div
          className="detail-back"
          id="detail-back"
          ref={detailBackRef}
          onClick={closeProject}
          style={{ opacity: 0 }}
        >
          <ChrHover text="🡼BACK" />
        </div>

        <div className="detail-info">
          <div className="detail-title-wrap" id="detail-title-wrap" ref={detailTitleWrapRef} style={{ opacity: 0 }}>
            <h1 className="detail-title" id="detail-title" ref={detailTitleRef}>
              {activeItem?.title}
            </h1>
            <span className="detail-year" id="detail-year" ref={detailYearRef}>
              {activeItem?.year}
            </span>
          </div>

          <p className="detail-desc" id="detail-desc" ref={detailDescRef} style={{ opacity: 0 }}>
            {activeItem?.description}
          </p>

          <div className="detail-tags" id="detail-tags" ref={detailTagsRef} style={{ opacity: 0 }}>
            {activeItem?.tags.map((tag: string, i: number) => (
              <span key={i} className="detail-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-6" style={{ zIndex: 10 }}>
            {activeItem?.slug && (
              <ChrHover text="READ CASE STUDY 🡺" href={`/projects/${activeItem.slug}`} />
            )}
            {activeItem?.liveUrl && activeItem.liveUrl !== '#' && (
              <ChrHover
                text="LAUNCH PLATFORM 🡺"
                href={activeItem.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
          </div>
        </div>

        <div className="detail-gallery-wrap" id="detail-gallery-wrap" ref={detailGalleryWrapRef} style={{ opacity: 0 }}>
          <div className="detail-thumbs" id="detail-thumbs">
            <div className="detail-thumbs-inner" id="detail-thumbs-inner" ref={detailThumbsInnerRef}>
              {activeItem &&
                [activeItem.image].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className={i === activeThumbIdx ? 'active' : ''}
                    onClick={() => setActiveThumbIdx(i)}
                  />
                ))}
            </div>
          </div>
          <div className="detail-selected" id="detail-selected" ref={detailSelectedRef}>
            {activeItem && <img src={[activeItem.image][activeThumbIdx]} alt="" />}
          </div>
        </div>
      </section>
    </>
  );
}
