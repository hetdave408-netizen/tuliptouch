import type { CSSProperties } from 'react';
import type { GalleryItem } from '@/data/gallery';
import { SectionLabel } from './SectionLabel';

type GalleryProps = { items: GalleryItem[]; onOpen: (index: number) => void };

/**
 * On wide screens the section pins and the photos travel sideways as you scroll (see components/motion.ts).
 * On phones, tablets and for reduced motion it is a normal swipeable, snap-scrolling row.
 */
export function Gallery({ items, onOpen }: GalleryProps) {
  return (
    <section className="section section-paper gallery" id="gallery" data-section="gallery" data-gallery>
      <div className="gallery-pin" data-gallery-pin>
        <div className="gallery-head">
          <div>
            <SectionLabel number="05">The gallery</SectionLabel>
            <h2 data-split="lines">A visual<br /><em>language.</em></h2>
          </div>
          <div className="gallery-head-side" data-fade>
            <p>The black-and-white rooms, the ironwork and the small details that make it worth a photo.</p>
            <div className="gallery-progress" aria-hidden="true"><i data-gallery-progress /></div>
            <span className="gallery-hint"><span className="hint-wide">Scroll to walk through. </span><span className="hint-touch">Swipe to see more. </span>Select a photo to enlarge it.</span>
          </div>
        </div>
        <div className="gallery-track" data-gallery-track>
          {items.map((item, index) => (
            <button
              type="button"
              className="gallery-panel"
              data-panel
              data-cursor="View"
              key={item.image}
              style={{ '--ar': `${item.width} / ${item.height}` } as CSSProperties}
              onClick={() => onOpen(index)}
              aria-label={`Enlarge photo: ${item.caption}`}
            >
              <span className="gallery-media"><img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" /></span>
              <span className="gallery-caption">
                <small>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</small>
                <b>{item.caption}</b>
                <em>{item.category}</em>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
