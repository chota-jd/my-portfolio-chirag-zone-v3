'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowDown,
  ChevronDown,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ROLES = [
  'Passionate Creator',
  'Curious Thinker',
  'Innovative Builder',
];

const NAME = 'Chirag Prajapati';

/** Hero focal line — edit anytime */
const HERO_QUOTE =
  'Ideas deserve clarity. I build products that stay fast as they grow.';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Mouse parallax (normalized -0.5..0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothMx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const smoothMy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  // 3D tilt on abstract visual (no photo — editorial hero)
  const tiltX = useTransform(smoothMy, (v) => v * -10);
  const tiltY = useTransform(smoothMx, (v) => v * 10);
  const parallaxX = useTransform(smoothMx, (v) => v * 18);
  const parallaxY = useTransform(smoothMy, (v) => v * 18);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-0 sm:min-h-[90vh] w-full flex items-center justify-center overflow-x-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* ============ Content ============ */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 xl:gap-14 items-center">
          {/* ---------- Copy: typography-first (modern editorial) ---------- */}
          <motion.div
            className="text-center lg:text-left lg:col-span-7 order-1"
            style={{ x: parallaxX, y: parallaxY }}
          >
            {/* Status pill */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4fc1c6]/30 bg-[#4fc1c6]/5 text-[11px] sm:text-xs font-mono tracking-wider text-[#4fc1c6] mb-5"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4fc1c6] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4fc1c6]" />
              </span>
              AVAILABLE FOR NEW PROJECTS
            </motion.div>

            {/* Chapter-title intro */}
            <motion.div
              className="flex items-center gap-3 justify-center lg:justify-start mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.span
                className="h-[1px] bg-gradient-to-r from-transparent via-[#4fc1c6] to-[#4fc1c6]/30 inline-block origin-left"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
              />
              <span className="text-sm sm:text-base text-[#4fc1c6] font-semibold tracking-[0.35em] uppercase drop-shadow-[0_0_20px_rgba(79,193,198,0.25)]">
                Hello, I&apos;m
              </span>
            </motion.div>

            {/* Focus areas — text, not HUD chips */}
            <motion.p
              className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-zinc-500 mb-6 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              Code · Design · Performance
            </motion.p>

            {/* Name with per-letter reveal */}
            <h1
              className="font-bold leading-[0.95] mb-4 text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.25rem] tracking-tight"
              aria-label={NAME}
            >
              <span className="sr-only">{NAME}</span>
              <span aria-hidden className="inline-block">
                {NAME.split('').map((ch, i) => (
                  <motion.span
                    key={`${ch}-${i}`}
                    className="inline-block gradient-text"
                    initial={{ opacity: 0, y: '0.6em', rotateX: -45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.9 + i * 0.04,
                      duration: 0.7,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    style={{ transformOrigin: 'bottom' }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Rotating role */}
            <div className="h-9 sm:h-11 mb-6 overflow-hidden flex justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  className="flex items-center gap-3 text-base sm:text-xl text-zinc-100 font-medium"
                  initial={{ y: 16, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -16, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-[#4fc1c6] tabular-nums opacity-90">/</span>
                  <span className="inline-block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    {ROLES[roleIndex]}
                  </span>
                  <motion.span
                    className="inline-block w-[2px] h-5 sm:h-6 bg-[#4fc1c6] shadow-[0_0_12px_rgba(79,193,198,0.8)]"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-zinc-400 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              Crafting world-class digital experiences with cutting-edge
              technologies. I transform ideas into{' '}
              <span className="font-semibold text-[#4fc1c6] drop-shadow-[0_0_24px_rgba(79,193,198,0.25)]">
                powerful, scalable
              </span>{' '}
              solutions that make a difference.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="flex items-center gap-6 sm:gap-8 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
            >
              <Stat value="3+" label="Years" />
              <Divider />
              <Stat value="20+" label="Projects" />
              <Divider />
              <Stat value="∞" label="Curiosity" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <MagneticButton onClick={scrollToContact}>
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle size={18} />
                  Let&apos;s Connect
                </span>
              </MagneticButton>

              <motion.button
                onClick={scrollToAbout}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group px-6 py-3 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-[#4fc1c6]/50 transition-colors font-medium flex items-center gap-2"
              >
                Explore More
                <ArrowDown
                  size={16}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="flex justify-center lg:justify-start items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <span className="hidden sm:inline text-xs font-mono tracking-widest text-white/30 mr-1">
                FOLLOW /
              </span>
              <SocialIcon
                href="https://github.com/chota-jd"
                label="GitHub"
              >
                <Github size={18} />
              </SocialIcon>
              <SocialIcon
                href="https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/"
                label="LinkedIn"
              >
                <Linkedin size={18} />
              </SocialIcon>
              <SocialIcon asButton onClick={scrollToContact} label="Email">
                <Mail size={18} />
              </SocialIcon>
            </motion.div>
          </motion.div>

          {/* ---------- Abstract mark (no profile photo — keeps hero editorial) ---------- */}
          <motion.div
            className="lg:col-span-5 order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <HeroQuoteVisual tiltX={tiltX} tiltY={tiltY} quote={HERO_QUOTE} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      {mounted && (
        <motion.button
          onClick={scrollToAbout}
          aria-label="Scroll to About"
          className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-[#4fc1c6] transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} strokeWidth={2.5} className="text-[#4fc1c6]" />
          </motion.span>
          <span className="text-[10px] font-mono tracking-[0.35em] text-white/55">
            SCROLL
          </span>
          <motion.div
            className="w-px h-9 bg-gradient-to-b from-[#4fc1c6] via-[#4fc1c6]/50 to-transparent rounded-full"
            animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.5, 1, 0.5] }}
            style={{ originY: 'top' }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.button>
      )}
    </section>
  );
}

/* --------------- Sub-components --------------- */

/** Cinematic quote + rings — typographic “ ” instead of monogram */
function HeroQuoteVisual({
  tiltX,
  tiltY,
  quote,
}: {
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
  quote: string;
}) {
  return (
    <div className="[perspective:1200px] w-full max-w-lg sm:max-w-xl lg:max-w-none">
      <motion.div
        className="relative flex min-h-[min(42vh,400px)] w-full items-center justify-center py-6 lg:min-h-[min(62vh,580px)] lg:py-10"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
      >
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

        <motion.div
          aria-hidden
          className="absolute inset-[2%] rounded-full border border-dashed border-[#4fc1c6]/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
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
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />

        <blockquote
          className="relative z-[1] mx-auto max-w-[17rem] sm:max-w-md px-2 text-center"
          style={{ fontFamily: 'var(--font-playfair-display), serif' }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1 -top-6 sm:-left-3 sm:-top-8 select-none font-serif text-[clamp(4rem,14vw,7rem)] leading-none text-[#4fc1c6]/[0.22]"
          >
            &ldquo;
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-1 sm:-bottom-12 sm:-right-3 select-none font-serif text-[clamp(4rem,14vw,7rem)] leading-none text-[#4fc1c6]/[0.18]"
          >
            &rdquo;
          </span>

          <motion.p
            className="relative z-[1] text-[1.05rem] leading-snug text-zinc-100 sm:text-xl sm:leading-snug md:text-2xl md:leading-snug"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {quote}
            </span>
          </motion.p>

          <footer className="relative z-[1] mt-7 border-t border-white/[0.08] pt-5">
            <p className="font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.35em] text-zinc-500">
              CHIRAG PRAJAPATI
            </p>
          </footer>
        </blockquote>

        <motion.div
          aria-hidden
          className="absolute bottom-[6%] left-1/2 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#4fc1c6]/50 to-transparent"
          animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}

function MagneticButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      style={{ x: sx, y: sy }}
      className="group relative overflow-hidden px-7 py-3 rounded-full font-semibold text-black"
    >
      {/* Base gradient */}
      <span
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, #4fc1c6 0%, #7ce7eb 50%, #4fc1c6 100%)',
        }}
      />
      {/* Glow */}
      <span className="absolute -inset-1 rounded-full bg-[#4fc1c6]/40 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
      {/* Shimmer */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -top-1 -bottom-1 w-1/3 bg-white/40 blur-md -translate-x-full group-hover:translate-x-[350%] transition-transform duration-[1200ms] ease-out skew-x-[-20deg]" />
      </span>
      {children}
    </motion.button>
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
    <motion.span
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.9 }}
      className="group relative w-11 h-11 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur flex items-center justify-center text-white/70 hover:text-[#4fc1c6] hover:border-[#4fc1c6]/60 transition-colors"
    >
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_24px_rgba(79,193,198,0.5)]" />
      {children}
    </motion.span>
  );

  if (asButton) {
    return (
      <button onClick={onClick} aria-label={label}>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <span className="text-xl sm:text-2xl font-bold gradient-text leading-none">
        {value}
      </span>
      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-white/40 mt-1">
        {label.toUpperCase()}
      </span>
    </div>
  );
}

function Divider() {
  return <span className="h-8 w-px bg-white/10" />;
}
