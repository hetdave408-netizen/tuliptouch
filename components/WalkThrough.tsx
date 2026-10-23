'use client';

import { useEffect, useRef } from 'react';
import { galleryItems } from '@/data/gallery';
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '@/lib/gsap';

const steps = galleryItems.slice(0, 5);

/** Pinned, scroll-scrubbed walk through the café: each photo wipes over the last. Static stack without motion/JS. */
export function WalkThrough() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 0px)', () => {
        el.classList.add('is-pinned');
        const frames = gsap.utils.toArray<HTMLElement>('[data-wt-frame]', el);
        const caps = gsap.utils.toArray<HTMLElement>('[data-wt-cap]', el);
        const count = el.querySelector<HTMLElement>('[data-wt-count]');
        const bar = el.querySelector<HTMLElement>('[data-wt-bar]');
        gsap.set(frames.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(frames.map((f) => f.querySelector('img')), { scale: 1.25 });
        gsap.set(caps.slice(1), { yPercent: 100, opacity: 0 });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: el, start: 'top top', end: () => `+=${window.innerHeight * (steps.length - 1) * 0.9}`, pin: true, scrub: 0.6, anticipatePin: 1,
            onUpdate: (self) => { if (count) count.textContent = String(Math.min(steps.length, Math.round(self.progress * (steps.length - 1)) + 1)).padStart(2, '0'); } },
        });
        frames.forEach((f, i) => {
          const img = f.querySelector('img');
          if (i > 0) {
            tl.to(f, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, i - 1);
            tl.to(caps[i - 1], { yPercent: -100, opacity: 0, duration: 0.6 }, i - 1);
            tl.to(caps[i], { yPercent: 0, opacity: 1, duration: 0.6 }, i - 0.45);
          }
          tl.to(img, { scale: 1, duration: 1.4 }, Math.max(0, i - 1));
        });
        if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: steps.length - 1 }, 0);
      });
      return () => mm.revert();
    }, el);
    return () => { ctx.revert(); el.classList.remove('is-pinned'); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section className="walk" ref={root} aria-label="A walk through the café" id="walk">
      <div className="walk-stage">
        {steps.map((s, i) => (
          <figure className="walk-frame" data-wt-frame key={s.image}><img src={s.image} alt={s.alt} width={s.width} height={s.height} loading={i === 0 ? 'eager' : 'lazy'} /></figure>
        ))}
        <div className="walk-shade" aria-hidden="true" />
        <div className="walk-ui">
          <div className="walk-top"><span>Step inside</span><span className="walk-count"><b data-wt-count>01</b> / {String(steps.length).padStart(2, '0')}</span></div>
          <div className="walk-caps">
            {steps.map((s, i) => <p className="walk-cap" data-wt-cap key={s.caption}><small>{String(i + 1).padStart(2, '0')}</small>{s.caption}</p>)}
          </div>
          <div className="walk-bottom"><span className="walk-hint">Scroll to walk in</span><i className="walk-bar" aria-hidden="true"><b data-wt-bar /></i></div>
        </div>
      </div>
    </section>
  );
}
