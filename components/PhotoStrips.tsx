import { galleryItems } from '@/data/gallery';

/**
 * Two rows of café photos that slide in opposite directions as the page scrolls
 * (see components/motion.ts). Decorative: the Gallery section is the accessible home of these photos.
 */
export function PhotoStrips() {
  const rows = [galleryItems, [...galleryItems].reverse()];
  return (
    <div className="strips" aria-hidden="true" data-strips>
      {rows.map((items, row) => (
        <div className="strip" key={row}>
          <div className="strip-track" data-strip-track data-dir={row === 0 ? -1 : 1}>
            {[0, 1].flatMap((copy) => items.map((item) => (
              <img key={`${copy}-${item.image}`} src={item.image} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" />
            )))}
          </div>
        </div>
      ))}
    </div>
  );
}
