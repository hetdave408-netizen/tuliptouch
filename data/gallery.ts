export type GalleryCategory = 'Interiors' | 'Exterior' | 'Details';

export type GalleryItem = {
  image: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  size: 'tall' | 'wide' | 'standard';
};

export const galleryItems: GalleryItem[] = [
  { image: '/images/interior-lounge.jpg', alt: 'Black and white lounge with a crystal chandelier, ornate painted walls and zigzag tiled floor', caption: 'The lounge', category: 'Interiors', size: 'wide' },
  { image: '/images/angel-corner.jpg', alt: 'Hand-drawn angel mural beside a glass display, with black woven chairs in the foreground', caption: 'The angel corner', category: 'Details', size: 'tall' },
  { image: '/images/facade.jpg', alt: 'White two-storey café facade with a striped awning, red carpet and black iron gates', caption: 'The entrance', category: 'Exterior', size: 'standard' },
  { image: '/images/logo-wall.jpg', alt: 'Tulip Touch Café emblem framed by illustrated wrought-iron gates and lanterns', caption: 'The emblem wall', category: 'Details', size: 'standard' },
  { image: '/images/interior-floor.jpg', alt: 'Dining room with white chairs, glass-top tables and a black and white zigzag floor', caption: 'The dining floor', category: 'Interiors', size: 'wide' },
];
