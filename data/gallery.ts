export type GalleryCategory = 'Interiors' | 'Food' | 'Coffee' | 'Desserts' | 'Details';

export type GalleryItem = {
  image: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  size: 'tall' | 'wide' | 'standard';
};

export const galleryItems: GalleryItem[] = [
  { image: '/images/hero-study.svg', alt: 'Monochrome editorial visual study of coffee and a design magazine', caption: 'Atmosphere / editorial visual study', category: 'Details', size: 'wide' },
  { image: '/images/interior-study.svg', alt: 'Editorial visual study of an art-filled café interior', caption: 'The room / replace with original interior photo', category: 'Interiors', size: 'tall' },
  { image: '/images/coffee-study.svg', alt: 'Editorial visual study of a cappuccino and coffee tools', caption: 'Coffee / replace with original coffee photo', category: 'Coffee', size: 'standard' },
  { image: '/images/dessert-study.svg', alt: 'Editorial visual study of cheesecake and chocolate dessert', caption: 'Dessert / replace with original food photo', category: 'Desserts', size: 'standard' },
  { image: '/images/interior-study.svg', alt: 'Monochrome composition inspired by a photography-friendly café corner', caption: 'A corner to linger / visual study', category: 'Interiors', size: 'wide' },
  { image: '/images/dessert-study.svg', alt: 'Editorial visual study of a dessert plate on black linen', caption: 'Small indulgences / visual study', category: 'Food', size: 'tall' },
];
