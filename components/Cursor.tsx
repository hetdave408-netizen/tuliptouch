'use client';

import { useEffect, useRef } from 'react';

/** Desktop-only gold cursor: an instant dot plus a lagging ring that swells over
 *  interactive elements and tightens while pressed. Renders nothing on touch. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;
    document.documentElement.classList.add('has-cursor');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hover = 1;
    let press = 1;
    let seen = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const hit = (e.target as Element | null)?.closest?.('a, button, [data-cursor]');
      hover = hit ? 1.9 : 1;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        d.classList.add('is-on');
        r.classList.add('is-on');
      }
    };
    const down = () => { press = 0.72; };
    const up = () => { press = 1; };
    const leave = () => {
      seen = false;
      d.classList.remove('is-on');
      r.classList.remove('is-on');
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      d.style.transform = `translate(${x}px, ${y}px)`;
      r.style.transform = `translate(${rx}px, ${ry}px) scale(${hover * press})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
