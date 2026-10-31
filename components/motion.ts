import { gsap, ScrollTrigger, SplitText, registerGsap, prefersReducedMotion } from '@/lib/gsap';
import { pageReady } from './ready';

/** Page-level GSAP: scroll progress, loader-coordinated hero intro, cinematic hero exit,
 *  depth parallax, velocity skew, staggered menu rows, reveals, review progress line, magnetics. */
export function initPageMotion(root: HTMLElement) {
  registerGsap();
  const reduced = prefersReducedMotion();
  const all = <T extends HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const ctx = gsap.context(() => {
    const bar = root.querySelector<HTMLElement>('[data-progress]');
    if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });

    const stale = setTimeout(() => document.documentElement.classList.remove('js-motion'), 4000);
    if (reduced) { document.documentElement.classList.remove('js-motion'); clearTimeout(stale); return; }

    // Hero intro: waits for the intro curtain to start lifting, then for fonts, then plays.
    pageReady().then(() => {
      document.fonts.ready.then(() => {
        const title = root.querySelector<HTMLElement>('[data-hero-title]');
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        if (title) {
          const split = SplitText.create(title, { type: 'lines,chars', mask: 'lines' });
          document.documentElement.classList.remove('js-motion');
          tl.from(split.chars, { yPercent: 115, duration: 1.3, stagger: 0.025 }, 0.1);
        } else document.documentElement.classList.remove('js-motion');
        tl.from('[data-hero-in]', { y: 26, opacity: 0, duration: 1, stagger: 0.1 }, 0.7);
        clearTimeout(stale);
      });
    });

    const hero = root.querySelector<HTMLElement>('[data-hero]');
    if (hero) {
      // Cinematic exit: the facade keeps drifting while the copy blurs, shrinks and sinks away.
      gsap.to('[data-hero-bg]', { yPercent: 18, scale: 1.14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('[data-hero-copy]', { yPercent: -16, opacity: 0, scale: 0.94, filter: 'blur(5px)', ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }

    // Depth parallax on tagged media ([data-depth="9"] ≈ ±4.5% drift).
    all('[data-depth]').forEach((el) => {
      const amt = parseFloat(el.dataset.depth || '10');
      gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
      gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    all('[data-clip]').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(12% 8% 12% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true } });
    });

    // Menu rows: staggered entrance.
    const rows = all('[data-menu-row]');
    if (rows.length) {
      ScrollTrigger.batch(rows, {
        start: 'top 94%',
        once: true,
        onEnter: (batch) => gsap.from(batch, { y: 46, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', overwrite: true }),
      });
    }

    // Velocity skew: fast scrolling leans the tagged lists, then they settle.
    const skewTargets = all('[data-skew]');
    if (skewTargets.length) {
      const proxy = { skew: 0 };
      const clampSkew = gsap.utils.clamp(-5, 5);
      ScrollTrigger.create({
        onUpdate: (self) => {
          const s = clampSkew(self.getVelocity() / -400);
          if (Math.abs(s) > Math.abs(proxy.skew)) {
            proxy.skew = s;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.9,
              ease: 'power3',
              overwrite: true,
              onUpdate: () => {
                const v = `skewY(${proxy.skew.toFixed(2)}deg)`;
                skewTargets.forEach((t) => { t.style.transform = v; });
              },
            });
          }
        },
      });
    }

    all('[data-review-stack]').forEach((stack) => {
      const line = stack.querySelector<HTMLElement>('[data-review-line]');
      if (line) ScrollTrigger.create({ trigger: stack, start: 'top 55%', end: 'bottom 70%', scrub: 0.4, onUpdate: (self) => line.style.setProperty('--p', String(self.progress)) });
      stack.querySelectorAll<HTMLElement>('[data-review]').forEach((card) => {
        gsap.from(card, { y: 70, opacity: 0, scale: 0.96, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
      });
    });
    all('[data-magnetic]').forEach((el) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35); });
      el.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }, root);
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  return () => { window.removeEventListener('load', refresh); ctx.revert(); };
}
