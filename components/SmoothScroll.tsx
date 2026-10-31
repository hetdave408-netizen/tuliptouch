'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, prefersReducedMotion, registerGsap } from '@/lib/gsap';

let instance: Lenis | null = null;

/** Lets other components pause / resume smooth scrolling (e.g. the lightbox). */
export const smoothScroll = {
  stop: () => instance?.stop(),
  start: () => instance?.start(),
  scrollTo: (target: number | string | HTMLElement) => {
    if (instance) instance.scrollTo(target as never);
    else if (typeof target === 'number') window.scrollTo({ top: target });
    else if (typeof target !== 'string') target.scrollIntoView();
  },
};

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. Disabled for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: true });
    instance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
