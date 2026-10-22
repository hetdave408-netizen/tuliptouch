'use client';

import { useEffect, useRef } from 'react';
import type { GalleryItem } from '@/data/gallery';
import { smoothScroll } from './SmoothScroll';
import { Icon } from './Icon';

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onChangeAction: (index: number) => void;
  onCloseAction: () => void;
};

export function Lightbox({ items, index, onChangeAction, onCloseAction }: LightboxProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const count = items.length;
  const go = (step: number) => onChangeAction((index + step + count) % count);

  // Lock page scroll, move focus into the dialog, and give focus back to the photo that opened it.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    smoothScroll.stop();
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = '';
      smoothScroll.start();
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseAction();
      else if (event.key === 'ArrowRight') go(1);
      else if (event.key === 'ArrowLeft') go(-1);
      else if (event.key === 'Tab') {
        // Keep keyboard focus inside the dialog.
        const focusable = Array.from(document.querySelectorAll<HTMLElement>('.lightbox button'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onMouseDown={(event) => { if (event.currentTarget === event.target) onCloseAction(); }}>
      <button ref={closeButton} className="lightbox-close" type="button" onClick={onCloseAction} aria-label="Close image viewer"><Icon name="close" size={24} /></button>
      <button className="lightbox-nav lightbox-nav--prev" type="button" onClick={() => go(-1)} aria-label="Previous photo"><Icon name="arrow" size={22} /></button>
      <button className="lightbox-nav lightbox-nav--next" type="button" onClick={() => go(1)} aria-label="Next photo"><Icon name="arrow" size={22} /></button>
      <figure className="lightbox-figure" key={item.image}>
        <img src={item.image} alt={item.alt} width={item.width} height={item.height} />
        <figcaption><span>{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>{item.caption}</figcaption>
      </figure>
    </div>
  );
}
