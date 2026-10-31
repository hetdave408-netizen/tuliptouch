'use client';

import { useEffect, useRef } from 'react';
import type { GalleryItem } from '@/data/gallery';
import TiltedCard from './rb/TiltedCard';
import { gsap, registerGsap } from '@/lib/gsap';

function Cell({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: (i: number) => void }) {
  return (
    <div className={`gallery-cell gallery-cell--${item.size}`}>
      <div className="gallery-frame"><TiltedCard
        imageSrc={item.image}
        altText={item.alt}
        captionText={item.caption}
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        scaleOnHover={1.04}
        rotateAmplitude={9}
        radius={0}
        glare={0.25}
        showTooltip
        onClick={() => onOpen(index)}
      /></div>
      <p className="gallery-cap"><span>{String(index + 1).padStart(2, '0')}</span>{item.caption}</p>
    </div>
  );
}

/** Desktop: a pinned horizontal film-strip that scrubs sideways as you scroll, with a
 *  progress line. Mobile and reduced motion keep the original responsive grid. */
export function Gallery({ items, onOpen }: { items: GalleryItem[]; onOpen: (index: number) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const cells = Array.from(track.current?.children ?? []) as HTMLElement[];
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const wrap = rail.current;
      const t = track.current;
      if (!wrap || !t) return;
      wrap.classList.add('is-rail');
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth + 40);
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill.current) fill.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
          },
        },
      });
      cells.forEach((c) => {
        gsap.fromTo(c, { opacity: 0.2, y: 34 }, {
          opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left 100%', end: 'left 62%', scrub: true },
        });
      });
      return () => {
        wrap.classList.remove('is-rail');
        gsap.set(t, { clearProps: 'x' });
      };
    });

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      cells.forEach((c) => {
        gsap.from(c, { y: 54, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 92%', once: true } });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="gallery-rail" ref={rail}>
      <div className="gallery-grid" ref={track}>
        {items.map((item, i) => <Cell key={item.image} item={item} index={i} onOpen={onOpen} />)}
      </div>
      <div className="gal-progress" aria-hidden="true"><i ref={fill} /></div>
    </div>
  );
}
