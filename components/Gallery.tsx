'use client';

import type { GalleryItem } from '@/data/gallery';
import TiltedCard from './rb/TiltedCard';

export function Gallery({ items, onOpen }: { items: GalleryItem[]; onOpen: (index: number) => void }) {
  return (
    <div className="gallery-grid">
      {items.map((item, i) => (
        <div className={`gallery-cell gallery-cell--${item.size}`} key={item.image} data-reveal>
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
            onClick={() => onOpen(i)}
          /></div>
          <p className="gallery-cap"><span>{String(i + 1).padStart(2, '0')}</span>{item.caption}</p>
        </div>
      ))}
    </div>
  );
}
