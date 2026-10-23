import { gsap, ScrollTrigger, SplitText, registerGsap, prefersReducedMotion } from '@/lib/gsap';

/** Page-level GSAP: scroll progress, header-free chrome, hero intro + parallax, reveals, review progress line. */
export function initPageMotion(root: HTMLElement) {
  registerGsap();
  const reduced = prefersReducedMotion();
  const all = <T extends HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const ctx = gsap.context(() => {
    const bar = root.querySelector<HTMLElement>('[data-progress]');
    if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });

    const stale = setTimeout(() => document.documentElement.classList.remove('js-motion'), 4000);
    if (reduced) { document.documentElement.classList.remove('js-motion'); clearTimeout(stale); return; }

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

    const hero = root.querySelector<HTMLElement>('[data-hero]');
    if (hero) {
      gsap.to('[data-hero-bg]', { yPercent: 18, scale: 1.12, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('[data-hero-copy]', { yPercent: -12, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }

    gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
      gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
    all('[data-clip]').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(12% 8% 12% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true } });
    });
    all('[data-review-stack]').forEach((stack) => {
      const fill = stack.querySelector<HTMLElement>('[data-review-line]');
      if (fill) gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: stack, start: 'top 60%', end: 'bottom 70%', scrub: 0.4 } });
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
