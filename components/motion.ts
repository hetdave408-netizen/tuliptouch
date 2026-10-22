import { gsap, ScrollTrigger, SplitText, hasFinePointer, prefersReducedMotion, registerGsap } from '@/lib/gsap';
import { smoothScroll } from './SmoothScroll';

type Disposer = () => void;

const all = <T extends HTMLElement = HTMLElement>(root: ParentNode, selector: string) => Array.from(root.querySelectorAll<T>(selector));

/** Line masks clip tall display type; give descenders a little room without moving the layout. */
function relaxMasks(split: SplitText) {
  split.masks.forEach((mask) => {
    (mask as HTMLElement).style.paddingBottom = '0.16em';
    (mask as HTMLElement).style.marginBottom = '-0.16em';
  });
}

/**
 * Header state, scroll progress and the active nav link.
 * This runs for everyone, including visitors who prefer reduced motion.
 */
function setupChrome(root: HTMLElement) {
  const header = root.querySelector<HTMLElement>('[data-header]');
  const bar = root.querySelector<HTMLElement>('[data-progress]');

  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        header.classList.toggle('is-scrolled', y > 24);
        const menuOpen = header.dataset.open === 'true';
        if (self.direction === 1 && y > 640 && !menuOpen) header.classList.add('is-hidden');
        else if (self.direction === -1) header.classList.remove('is-hidden');
      },
    });
  }

  if (bar) {
    gsap.set(bar, { scaleX: 0, transformOrigin: '0 50%' });
    gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
  }

  const links = all(root, '[data-nav-link]');
  const setCurrent = (name: string) =>
    links.forEach((link) => {
      if (link.dataset.navLink === name) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  all(root, '[data-section]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => { if (self.isActive) setCurrent(section.dataset.section ?? ''); },
    });
  });
}

/** Everything that moves. Skipped entirely when the visitor prefers reduced motion. */
function setupMotion(root: HTMLElement, dispose: Disposer[]) {
  const html = document.documentElement;
  const splits: SplitText[] = [];
  dispose.push(() => splits.forEach((split) => split.revert()));

  /* ---------- Hero: set the starting state, then hand the page over ---------- */
  const hero = root.querySelector<HTMLElement>('[data-hero]');
  const title = root.querySelector<HTMLElement>('[data-hero-title]');
  const heroClip = root.querySelector<HTMLElement>('[data-hero-clip]');
  const heroImg = root.querySelector<HTMLElement>('[data-hero-img]');
  const introEls = all(root, '[data-intro]');

  let titleSplit: SplitText | undefined;
  if (title) {
    titleSplit = new SplitText(title, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    relaxMasks(titleSplit);
    splits.push(titleSplit);
    gsap.set(titleSplit.lines, { yPercent: 118 });
  }
  gsap.set(introEls, { autoAlpha: 0, y: 28 });
  if (heroClip) gsap.set(heroClip, { clipPath: 'inset(0% 0% 100% 0%)' });
  if (heroImg) gsap.set(heroImg, { scale: 1.22 });
  html.classList.remove('js-motion'); // the page was hidden pre-paint; GSAP now owns the hidden state

  const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  if (titleSplit) intro.to(titleSplit.lines, { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0);
  intro.to(introEls, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.15);
  if (heroClip) intro.to(heroClip, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6 }, 0.25);
  if (heroImg) intro.to(heroImg, { scale: 1, duration: 2.2 }, 0.25);

  const preloader = root.querySelector<HTMLElement>('[data-preloader]');
  if (html.classList.contains('is-loading') && preloader) {
    const mark = preloader.querySelector('.preloader-mark');
    const name = preloader.querySelector('.preloader-name');
    const zigzag = preloader.querySelector('[data-preloader-zigzag]');
    gsap.set([mark, name], { autoAlpha: 0, y: 18 });
    const pre = gsap.timeline({
      onComplete: () => {
        gsap.set(preloader, { display: 'none' });
        html.classList.remove('is-loading');
        try { sessionStorage.setItem('tt-seen', '1'); } catch { /* storage unavailable: the intro simply replays next visit */ }
      },
    });
    pre.to(mark, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(name, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo(zigzag, { '--zx': '0px' }, { '--zx': '-96px', duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(preloader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.2')
      .add(() => { intro.play(); }, '-=0.55');
  } else {
    intro.play();
  }

  /* ---------- Hero: leaving the screen ---------- */
  if (hero) {
    const exit = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-hero-copy]', { yPercent: -14, opacity: 0.15, ease: 'none', scrollTrigger: exit });
    gsap.to('[data-hero-visual]', { yPercent: -9, ease: 'none', scrollTrigger: exit });
  }

  /* ---------- Headings: lines rise out of a mask when they scroll into view ---------- */
  all(root, '[data-split="lines"]').forEach((el) => {
    let played = false;
    const split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        relaxMasks(self);
        if (played) return undefined; // re-split after a resize: lines are already in place
        return gsap.from(self.lines, {
          yPercent: 112, duration: 1.3, ease: 'expo.out', stagger: 0.09,
          onComplete: () => { played = true; },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
    splits.push(split);
  });

  /* ---------- One statement is read word by word as you scroll ---------- */
  all(root, '[data-split="scrub"]').forEach((el) => {
    const split = new SplitText(el, { type: 'words' });
    splits.push(split);
    gsap.fromTo(split.words, { opacity: 0.18 }, {
      opacity: 1, ease: 'none', stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 58%', scrub: true },
    });
  });

  /* ---------- Quiet fade-ups, staggered when several arrive together ---------- */
  const fades = all(root, '[data-fade]');
  gsap.set(fades, { autoAlpha: 0, y: 26 });
  ScrollTrigger.batch(fades, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, overwrite: true }),
  });
  requestAnimationFrame(() => fades.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) gsap.set(el, { autoAlpha: 1, y: 0 }); // already on screen (e.g. reload mid-page)
  }));

  /* ---------- Photos: slow parallax inside the frame, and an opening mask ---------- */
  all(root, '[data-parallax]').forEach((wrap) => {
    const img = wrap.querySelector('img');
    if (!img) return;
    gsap.fromTo(img, { yPercent: -7, scale: 1.16 }, {
      yPercent: 7, ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  all(root, '[data-clip]').forEach((wrap) => {
    gsap.fromTo(wrap, { clipPath: 'inset(12% 12% 12% 12%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: wrap, start: 'top 90%', once: true },
    });
  });

  /* ---------- Photo strips: two rows slide in opposite directions, and lean into fast scrolling ---------- */
  const strips = root.querySelector<HTMLElement>('[data-strips]');
  if (strips) {
    const tracks = all(strips, '[data-strip-track]');
    tracks.forEach((track) => {
      const dir = Number(track.dataset.dir ?? -1);
      const set = () => track.scrollWidth / 2; // each track holds the photo set twice
      gsap.fromTo(track, { x: () => (dir < 0 ? 0 : -set()) }, {
        x: () => (dir < 0 ? -set() : 0), ease: 'none',
        scrollTrigger: { trigger: strips, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true },
      });
    });
    const skewTo = tracks.map((track) => gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' }));
    ScrollTrigger.create({
      trigger: strips, start: 'top bottom', end: 'bottom top',
      onUpdate: (self) => {
        const lean = gsap.utils.clamp(-5, 5, self.getVelocity() / -450);
        skewTo.forEach((to) => to(lean));
      },
      onLeave: () => skewTo.forEach((to) => to(0)),
      onLeaveBack: () => skewTo.forEach((to) => to(0)),
    });
  }
  all(root, '[data-drift]').forEach((el) => {
    gsap.fromTo(el, { '--zx': '0px' }, {
      '--zx': '-320px', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ---------- Numbers count up once ---------- */
  all(root, '[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count ?? '0');
    const decimals = Number(el.dataset.decimals ?? 0);
    const group = el.dataset.group === 'true';
    const format = (n: number) => group ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : n.toFixed(decimals);
    const counter = { value: 0 };
    el.textContent = format(0);
    gsap.to(counter, {
      value: target, duration: 2.4, ease: 'power3.out',
      onUpdate: () => { el.textContent = format(counter.value); },
      onComplete: () => { el.textContent = format(target); },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  /* ---------- Buttons lean toward the mouse (mouse users only) ---------- */
  if (hasFinePointer()) {
    all(root, '[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.55)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.55)' });
      const move = (event: PointerEvent) => {
        const box = el.getBoundingClientRect();
        xTo((event.clientX - (box.left + box.width / 2)) * 0.28);
        yTo((event.clientY - (box.top + box.height / 2)) * 0.28);
      };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      dispose.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
    });
  }

  /* ---------- Gallery: pinned, horizontal travel on wide screens ---------- */
  const mm = gsap.matchMedia();
  dispose.push(() => mm.revert());
  /* ---------- Featured menu: cards stack, and each recedes as the next slides over it ---------- */
  mm.add('(min-width: 1024px)', () => {
    const cards = all(root, '[data-stack] .featured-item');
    if (cards.length < 2) return undefined;
    const top = (i: number) => 96 + i * 26; // keep in step with the sticky offset in the stylesheet
    cards.slice(0, -1).forEach((card, i) => {
      gsap.to(card, {
        scale: 1 - (cards.length - 1 - i) * 0.035, transformOrigin: '50% 0%', ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: () => `top ${top(i + 1)}`, scrub: true },
      });
    });
    return undefined;
  });

  mm.add('(min-width: 1024px)', () => {
    const section = root.querySelector<HTMLElement>('[data-gallery]');
    const pin = root.querySelector<HTMLElement>('[data-gallery-pin]');
    const track = root.querySelector<HTMLElement>('[data-gallery-track]');
    const progress = root.querySelector<HTMLElement>('[data-gallery-progress]');
    if (!section || !pin || !track) return undefined;

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    section.dataset.pinned = 'true';
    if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: '0 50%' });

    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        id: 'gallery', trigger: pin, start: 'top top', end: () => `+=${distance()}`,
        pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => { if (progress) gsap.set(progress, { scaleX: self.progress }); },
      },
    });

    // Tabbing to a photo that is currently off-screen scrolls the page to bring it into view.
    const onFocusIn = (event: FocusEvent) => {
      const panel = (event.target as HTMLElement).closest<HTMLElement>('[data-panel]');
      const st = ScrollTrigger.getById('gallery');
      if (!panel || !st || !distance()) return;
      const share = gsap.utils.clamp(0, 1, (panel.offsetLeft - window.innerWidth * 0.08) / distance());
      smoothScroll.scrollTo(st.start + share * (st.end - st.start));
    };
    track.addEventListener('focusin', onFocusIn);

    return () => {
      track.removeEventListener('focusin', onFocusIn);
      delete section.dataset.pinned;
      gsap.set(track, { clearProps: 'transform' });
    };
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** Wires up all page motion. Returns a cleanup function (safe under React strict mode). */
export function initPageMotion(root: HTMLElement): Disposer {
  registerGsap();
  let cancelled = false;
  const dispose: Disposer[] = [];

  const chrome = gsap.context(() => setupChrome(root), root);
  dispose.push(() => chrome.revert());

  if (!prefersReducedMotion()) {
    // Wait for web fonts so line splits measure the final text. Never wait more than 1.5s.
    const fonts = typeof document !== 'undefined' && document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([fonts, new Promise((resolve) => setTimeout(resolve, 1500))]).then(() => {
      if (cancelled) return;
      const motion = gsap.context(() => setupMotion(root, dispose), root);
      dispose.push(() => motion.revert());
    });
  }

  return () => {
    cancelled = true;
    dispose.forEach((fn) => fn());
  };
}
