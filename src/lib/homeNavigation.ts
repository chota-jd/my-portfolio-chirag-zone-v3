export const SKIP_CINEMATIC_INTRO_KEY = 'skipCinematicIntro';
export const PENDING_SCROLL_HASH_KEY = 'pendingScrollHash';

export function markSkipIntroAndScrollTo(sectionId: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SKIP_CINEMATIC_INTRO_KEY, '1');
  sessionStorage.setItem(PENDING_SCROLL_HASH_KEY, `#${sectionId}`);
}

export function hasPendingHomeScroll(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(PENDING_SCROLL_HASH_KEY) != null;
}

export function consumeSkipIntro(): boolean {
  if (typeof window === 'undefined') return false;
  const skip = sessionStorage.getItem(SKIP_CINEMATIC_INTRO_KEY) === '1';
  if (skip) sessionStorage.removeItem(SKIP_CINEMATIC_INTRO_KEY);
  return skip;
}

export function peekPendingScrollHash(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(PENDING_SCROLL_HASH_KEY);
}

export function consumePendingScrollHash(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = sessionStorage.getItem(PENDING_SCROLL_HASH_KEY);
  if (hash) sessionStorage.removeItem(PENDING_SCROLL_HASH_KEY);
  return hash;
}

/** Scroll to a home section by id; returns true when the target was found and scrolled. */
export function scrollToHomeSection(
  sectionId: string,
  lenis?: { scrollTo: (target: HTMLElement, opts: { offset: number; duration: number }) => void; resize?: () => void }
): boolean {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({ top, left: 0, behavior: 'auto' });

  if (lenis) {
    lenis.resize?.();
    lenis.scrollTo(target, { offset: 0, duration: 0 });
  }

  return true;
}

export function runPendingHomeScroll(
  lenis: { scrollTo: (target: HTMLElement, opts: { offset: number; duration: number }) => void; resize?: () => void },
  onScrollTriggerRefresh?: () => void
) {
  const pendingHash = peekPendingScrollHash();
  if (!pendingHash) return () => undefined;

  const sectionId = pendingHash.replace(/^#/, '');
  let cancelled = false;
  let attempts = 0;

  const tryScroll = () => {
    if (cancelled) return;

    if (scrollToHomeSection(sectionId, lenis)) {
      consumePendingScrollHash();
      onScrollTriggerRefresh?.();
      return;
    }

    attempts += 1;
    if (attempts < 40) {
      requestAnimationFrame(tryScroll);
    }
  };

  requestAnimationFrame(tryScroll);

  return () => {
    cancelled = true;
  };
}
