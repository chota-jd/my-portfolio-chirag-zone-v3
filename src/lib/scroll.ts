import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function resetPageScroll() {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Clears GSAP pin spacers and cached scroll positions after leaving the homepage. */
export function clearScrollAnimationState() {
  if (typeof window === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  ScrollTrigger.clearScrollMemory?.();
}
