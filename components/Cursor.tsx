'use client';

import { useEffect, useRef } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion, registerGsap } from '@/lib/gsap';

/** A soft follower for mouse users. Grows over links, and shows a label over `[data-cursor="…"]` elements. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ring.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) { shown = true; gsap.set(el, { x: e.clientX, y: e.clientY }); el.classList.add('is-on'); }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const tagged = target?.closest<HTMLElement>('[data-cursor]');
      const interactive = target?.closest('a, button, [role="button"]');
      if (label.current) label.current.textContent = tagged?.dataset.cursor ?? '';
      el.classList.toggle('is-label', !!tagged);
      el.classList.toggle('is-link', !tagged && !!interactive);
    };
    const leave = () => { shown = false; el.classList.remove('is-on'); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <div className="cursor" ref={ring} aria-hidden="true"><span ref={label} className="cursor-label" /></div>;
}
