'use client';

import { useEffect } from 'react';
import { Icon } from './Icon';

type LightboxProps = {
  image: string;
  alt: string;
  caption: string;
  onCloseAction: () => void;
};

export function Lightbox({ image, alt, caption, onCloseAction }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseAction();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseAction]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onMouseDown={(event) => { if (event.currentTarget === event.target) onCloseAction(); }}>
      <button className="lightbox-close" type="button" onClick={onCloseAction} aria-label="Close image viewer"><Icon name="close" size={24} /></button>
      <figure className="lightbox-figure">
        <img src={image} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    </div>
  );
}
