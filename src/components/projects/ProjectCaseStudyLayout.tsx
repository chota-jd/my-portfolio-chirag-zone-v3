'use client';

import { useEffect, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Home,
  Sparkles,
} from 'lucide-react';
import type { Project } from '@/data/projects';
import { markSkipIntroAndScrollTo } from '@/lib/homeNavigation';

type ProjectCaseStudyLayoutProps = {
  project: Project;
};

function CaseSection({
  id,
  label,
  title,
  children,
  accent = 'cyan',
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  accent?: 'cyan' | 'coral' | 'violet';
}) {
  return (
    <section id={id} className="pcs-section">
      <div className="pcs-section-head">
        <span className={`pcs-section-label pcs-accent-${accent}`}>{label}</span>
        <h2 className="pcs-section-title">{title}</h2>
      </div>
      <div className="pcs-section-body">{children}</div>
    </section>
  );
}

export default function ProjectCaseStudyLayout({ project }: ProjectCaseStudyLayoutProps) {
  const router = useRouter();

  const goToHomeProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    markSkipIntroAndScrollTo('projects');
    router.push('/');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [project.slug]);

  const features =
    project.features ??
    project.pillars?.map((p) => `${p.title}: ${p.desc}`) ??
    [];

  const impactText = project.impact ?? project.narrative?.impact ?? '';
  const challengeText = project.challenge ?? project.description;
  const solutionText =
    project.solution ?? project.narrative?.overview ?? project.fullDescription ?? '';

  return (
    <main className="pcs-page">
      {/* Hero */}
      <header className="pcs-hero">
        <div className="pcs-hero-media">
          <Image
            src={project.image}
            alt=""
            fill
            priority
            className="pcs-hero-img"
            sizes="100vw"
          />
          <div className="pcs-hero-overlay" />
        </div>

        <div className="pcs-hero-inner">
          <Link href="/#projects" className="pcs-back-pill" onClick={goToHomeProjects}>
            <ArrowLeft size={16} />
            <span>Back to projects</span>
          </Link>

          <div className="pcs-hero-grid">
            <div className="pcs-hero-copy">
              <h1 className="pcs-hero-title">{project.title}</h1>
              <p className="pcs-hero-desc">{project.fullDescription || project.description}</p>
            </div>

            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pcs-live-btn"
              >
                <span>Live demo</span>
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="pcs-breadcrumb-wrap" aria-label="Breadcrumb">
        <ol className="pcs-breadcrumb">
          <li>
            <Link href="/" className="pcs-crumb">
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>
          <ChevronRight size={14} className="pcs-crumb-sep" aria-hidden />
          <li>
            <Link href="/#projects" className="pcs-crumb" onClick={goToHomeProjects}>
              Projects
            </Link>
          </li>
          <ChevronRight size={14} className="pcs-crumb-sep" aria-hidden />
          <li className="pcs-crumb-current">{project.title}</li>
        </ol>
      </nav>

      <div className="pcs-layout">
        <div className="pcs-main">
          <CaseSection id="challenge" label="01 — Context" title="The Challenge" accent="coral">
            <p className="pcs-prose">{challengeText}</p>
          </CaseSection>

          <CaseSection id="solution" label="02 — Approach" title="The Solution" accent="cyan">
            <p className="pcs-prose">{solutionText}</p>
            {project.process && project.process.length > 0 && (
              <div className="pcs-steps">
                {project.process.map((step) => (
                  <div key={step.step} className="pcs-step-card">
                    <span className="pcs-step-num">{step.step}</span>
                    <div>
                      <h3 className="pcs-step-title">{step.title}</h3>
                      <p className="pcs-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CaseSection>

          {features.length > 0 && (
            <CaseSection
              id="features"
              label="03 — Delivery"
              title="Key Features Delivered"
              accent="violet"
            >
              <ul className="pcs-feature-grid">
                {features.map((feature) => (
                  <li key={feature} className="pcs-feature-item">
                    <span className="pcs-feature-check" aria-hidden>
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CaseSection>
          )}

          {impactText && (
            <CaseSection id="impact" label="04 — Outcome" title="The Impact" accent="cyan">
              <p className="pcs-prose pcs-impact-text">{impactText}</p>
              {project.detailedStats && (
                <div className="pcs-stat-row">
                  {project.detailedStats.map((stat) => (
                    <div key={stat.label} className="pcs-stat-card">
                      <span className="pcs-stat-value">{stat.value}</span>
                      <span className="pcs-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </CaseSection>
          )}
        </div>

        <aside className="pcs-sidebar">
          <div className="pcs-sidebar-sticky">
            <div className="pcs-sidebar-card">
            {project.inauguratedBy && (
              <div className="pcs-sidebar-highlight">
                <Sparkles size={16} className="pcs-sidebar-highlight-icon" />
                <div>
                  <p className="pcs-sidebar-highlight-label">Initiative</p>
                  <p className="pcs-sidebar-highlight-value">{project.inauguratedBy}</p>
                </div>
              </div>
            )}

            {project.stats && (
              <p className="pcs-sidebar-stat-line">{project.stats}</p>
            )}

            <div className="pcs-sidebar-actions">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pcs-btn pcs-btn-primary pcs-btn-block"
                >
                  Visit live portal
                  <ArrowUpRight size={16} />
                </a>
              )}
              <Link href="/#contact" className="pcs-btn pcs-btn-outline pcs-btn-block">
                Hire for similar work
              </Link>
            </div>
          </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
