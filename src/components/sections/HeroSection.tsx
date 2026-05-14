'use client';

import { Github, Linkedin, Mail, MessageCircle, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const ROLES = ['Passionate Creator', 'Curious Thinker', 'Innovative Builder'];

const NAME = 'Chirag Prajapati';
const PROFILE_PHOTO_SRC = '/profile-photo.png';

const HERO_QUOTE =
  'Ideas deserve clarity. I build products that stay fast as they grow.';

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-0 sm:min-h-[90vh] w-full flex items-center justify-center overflow-x-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 xl:gap-14 items-center">
          <div className="text-center lg:text-left lg:col-span-7 order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4fc1c6]/30 bg-[#4fc1c6]/5 text-[11px] sm:text-xs font-mono tracking-wider text-[#4fc1c6] mb-5">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#4fc1c6]" />
              AVAILABLE FOR NEW PROJECTS
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#4fc1c6] to-[#4fc1c6]/30 inline-block shrink-0" />
              <span className="text-sm sm:text-base text-[#4fc1c6] font-semibold tracking-[0.35em] uppercase drop-shadow-[0_0_20px_rgba(79,193,198,0.25)]">
                Hello, I&apos;m
              </span>
            </div>

            <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-zinc-500 mb-6 uppercase">
              Code · Design · Performance
            </p>

            <h1
              className="font-bold leading-[1.12] mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-[4.1rem] xl:text-[4.8rem] tracking-tight"
              aria-label={NAME}
            >
              <span className="gradient-text">{NAME}</span>
            </h1>

            <div className="-mt-6 h-9 sm:h-11 mb-6 flex justify-center lg:justify-start items-center">
              <div
                key={roleIndex}
                className="flex items-center gap-3 text-base sm:text-xl text-zinc-100 font-medium"
              >
                <span className="text-[#4fc1c6] tabular-nums opacity-90">/</span>
                <span className="inline-block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {ROLES[roleIndex]}
                </span>
                <span className="inline-block w-[2px] h-5 sm:h-6 bg-[#4fc1c6] shadow-[0_0_12px_rgba(79,193,198,0.8)]" />
              </div>
            </div>

            <p className="text-base sm:text-lg text-zinc-400 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Crafting world-class digital experiences with cutting-edge technologies. I transform ideas into{' '}
              <span className="font-semibold text-[#4fc1c6] drop-shadow-[0_0_24px_rgba(79,193,198,0.25)]">
                powerful, scalable
              </span>{' '}
              solutions that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10 justify-center lg:justify-start">
              <button
                type="button"
                onClick={scrollToContact}
                className="group relative overflow-hidden px-7 py-3 rounded-full font-semibold text-black active:scale-[0.98] transition-transform"
              >
                <span
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(110deg, #4fc1c6 0%, #7ce7eb 50%, #4fc1c6 100%)',
                  }}
                />
                <span className="absolute -inset-1 rounded-full bg-[#4fc1c6]/40 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute -top-1 -bottom-1 w-1/3 bg-white/40 blur-md -translate-x-full group-hover:translate-x-[350%] transition-transform duration-[1200ms] ease-out skew-x-[-20deg]" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle size={18} />
                  Let&apos;s Connect
                </span>
              </button>

              <button
                type="button"
                onClick={scrollToAbout}
                className="group px-6 py-3 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-[#4fc1c6]/50 transition-colors font-medium flex items-center gap-2 active:scale-[0.98]"
              >
                Explore More
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

            <div className="flex justify-center lg:justify-start items-center gap-5">
              <span className="hidden sm:inline text-xs font-mono tracking-widest text-white/30 mr-1">
                FOLLOW /
              </span>
              <SocialIcon href="https://github.com/chota-jd" label="GitHub">
                <Github size={18} />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/" label="LinkedIn">
                <Linkedin size={18} />
              </SocialIcon>
              <SocialIcon asButton onClick={scrollToContact} label="Email">
                <Mail size={18} />
              </SocialIcon>
            </div>
          </div>

          <div className="lg:col-span-5 order-2 flex justify-center lg:justify-end">
            <HeroQuoteVisual quote={HERO_QUOTE} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroQuoteVisual({ quote }: { quote: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="w-full max-w-lg sm:max-w-xl lg:max-w-none">
      <div className="relative flex min-h-[min(42vh,400px)] w-full items-center justify-center py-6 lg:min-h-[min(62vh,580px)] lg:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div
            className="h-[85%] w-[85%] rounded-full opacity-80"
            style={{
              background:
                'radial-gradient(ellipse 50% 45% at 50% 48%, rgba(79,193,198,0.16) 0%, transparent 62%)',
              filter: 'blur(32px)',
            }}
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-[2%] rounded-full border border-dashed border-[#4fc1c6]/25"
        />
        <div
          aria-hidden
          className="absolute inset-[12%] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(79,193,198,0.5) 120deg, transparent 240deg, rgba(124,231,235,0.35) 300deg, transparent 360deg)',
            padding: 1,
            WebkitMask:
              'radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))',
          }}
        />

        <div className="relative z-[1] mx-auto max-w-[17rem] sm:max-w-md px-2 text-center">
          <div className="mx-auto mb-6 h-56 w-56 overflow-hidden rounded-full bg-zinc-950 shadow-[0_0_35px_rgba(79,193,198,0.25)] sm:h-64 sm:w-64">
            {!imageFailed ? (
              <img
                src={PROFILE_PHOTO_SRC}
                alt="Chirag Prajapati profile"
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl font-semibold tracking-[0.2em] text-[#4fc1c6] sm:text-2xl">
                CP
              </div>
            )}
          </div>

          <blockquote
            className="relative"
            style={{ fontFamily: 'var(--font-playfair-display), serif' }}
          >
            <p className="relative z-[1] text-base leading-snug text-zinc-100 sm:text-lg sm:leading-snug md:text-xl md:leading-snug">
              <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                &ldquo;{quote}&rdquo;
              </span>
            </p>
          </blockquote>
        </div>

        <div
          aria-hidden
          className="absolute bottom-[6%] left-1/2 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#4fc1c6]/50 to-transparent opacity-70"
        />
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  onClick,
  asButton,
  children,
  label,
}: {
  href?: string;
  onClick?: () => void;
  asButton?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  const content = (
    <span className="group relative w-11 h-11 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur flex items-center justify-center text-white/70 hover:text-[#4fc1c6] hover:border-[#4fc1c6]/60 transition-all hover:-translate-y-0.5 active:scale-95">
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_24px_rgba(79,193,198,0.5)]" />
      {children}
    </span>
  );

  if (asButton) {
    return (
      <button type="button" onClick={onClick} aria-label={label}>
        {content}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {content}
    </a>
  );
}
