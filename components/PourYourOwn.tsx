'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { menuItems } from '@/data/menu';

const drinks = menuItems.filter((m) => m.category === 'Cold Coffee');

/** Playful press-and-hold pour built from the real Cold Coffee menu. Not an order form. */
export function PourYourOwn() {
  const [active, setActive] = useState(0);
  const [level, setLevel] = useState(0);
  const holding = useRef(false);
  const raf = useRef(0);
  const last = useRef(0);
  const drink = drinks[active];

  const tick = useCallback((t: number) => {
    const dt = last.current ? t - last.current : 16;
    last.current = t;
    if (holding.current) setLevel((l) => Math.min(1, l + dt / 2600));
    raf.current = requestAnimationFrame(tick);
  }, []);

  const start = () => { holding.current = true; last.current = 0; };
  const stop = () => { holding.current = false; };

  useEffect(() => { raf.current = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf.current); }, [tick]);

  const pick = (i: number) => { setActive(i); setLevel(0); };
  const y = 330 - level * 250; // liquid surface (glass interior y 80..330)
  const done = level >= 1;

  return (
    <section className="section section-ink pour" id="pour" data-section="menu" aria-labelledby="pour-title">
      <div className="pour-grid">
        <div className="pour-copy">
          <span className="pour-eyebrow">A small detour</span>
          <h2 id="pour-title" data-split="lines">Pour your<br /><em>own.</em></h2>
          <p data-fade>Pick a cold coffee from the menu, then press and hold to fill the glass. It’s just for fun. The real thing is a short walk away in Akota.</p>
          <div className="pour-chips" role="group" aria-label="Choose a cold coffee">
            {drinks.map((d, i) => <button type="button" key={d.name} aria-pressed={i === active} onClick={() => pick(i)}>{d.name}</button>)}
          </div>
          <div className="pour-info" aria-live="polite">
            <strong>{drink.name} <span>₹{drink.price}</span></strong>
            <p>{drink.description}</p>
          </div>
        </div>
        <div className="pour-stage">
          <svg viewBox="0 0 320 400" className="pour-glass" role="img" aria-label={`A glass of ${drink.name}, ${Math.round(level * 100)} percent full`}>
            <defs><clipPath id="glass-clip"><path d="M70 70h180l-18 270a14 14 0 0 1-14 13h-116a14 14 0 0 1-14-13Z" /></clipPath></defs>
            <g clipPath="url(#glass-clip)">
              <rect x="50" y={y} width="220" height="360" fill="#b8a48b" />
              <rect x="50" y={y} width="220" height="10" fill="#faf9f6" opacity=".35" />
              <g opacity=".5" fill="#faf9f6"><rect x="105" y="150" width="46" height="46" rx="8" transform="rotate(-10 128 173)" /><rect x="168" y="200" width="46" height="46" rx="8" transform="rotate(12 191 223)" /><rect x="116" y="250" width="46" height="46" rx="8" transform="rotate(6 139 273)" /></g>
            </g>
            <path d="M70 70h180l-18 270a14 14 0 0 1-14 13h-116a14 14 0 0 1-14-13Z" fill="none" stroke="#faf9f6" strokeWidth="4" />
          </svg>
          <button type="button" className="pour-btn" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop}
            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); start(); } }}
            onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') stop(); }} onBlur={stop}>
            {done ? 'Poured. Cheers.' : 'Press & hold to pour'}
          </button>
          {level > 0 ? <button type="button" className="pour-reset" onClick={() => setLevel(0)}>Empty the glass</button> : null}
        </div>
      </div>
    </section>
  );
}
