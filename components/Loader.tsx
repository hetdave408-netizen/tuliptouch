'use client';

import { useEffect, useRef, useState } from 'react';
import { BOOT_KEY, markPageReady } from './ready';

/** First-visit intro: gold counter 000→100 behind an ink curtain, then a two-stage wipe.
 *  Skipped entirely for reduced-motion visitors and repeat visits in the same session. */
export function Loader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'run' | 'lift' | 'done'>('run');
  const startRef = useRef(0);

  useEffect(() => {
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      sessionStorage.getItem(BOOT_KEY) !== null ||
      document.documentElement.classList.contains('boot-skip');
    if (skip) {
      markPageReady();
      setPhase('done');
      return;
    }

    document.documentElement.classList.add('is-booting');
    const DUR = 1900;
    if (!startRef.current) startRef.current = performance.now();
    let raf = 0;
    const timers: number[] = [];
    const step = (t: number) => {
      const p = Math.min(1, (t - startRef.current) / DUR);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        timers.push(window.setTimeout(() => {
          sessionStorage.setItem(BOOT_KEY, '1');
          setPhase('lift');
          markPageReady();
          document.documentElement.classList.remove('is-booting');
          timers.push(window.setTimeout(() => setPhase('done'), 1200));
        }, 350));
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.documentElement.classList.remove('is-booting');
    };
  }, []);

  if (phase === 'done') return null;
  return (
    <div className={`boot${phase === 'lift' ? ' boot--lift' : ''}`} aria-hidden="true">
      <div className="boot-panel boot-panel--b" />
      <div className="boot-panel boot-panel--a" />
      <div className="boot-ui">
        <p className="boot-brand"><img src="/brand-mark.svg" alt="" width={26} height={26} />The Tulip Touch Café</p>
        <p className="boot-count">{String(count).padStart(3, '0')}</p>
        <p className="boot-line"><i style={{ transform: `scaleX(${count / 100})` }} /></p>
        <p className="boot-note">Akota · Vadodara</p>
      </div>
    </div>
  );
}
