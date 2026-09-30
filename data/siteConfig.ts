export type OpeningHour = {
  day: string;
  hours: string;
};

export const siteConfig = {
  siteName: 'The Tulip Touch Café',
  shortName: 'Tulip Touch',
  tagline: 'Where coffee meets art.',
  intro: 'A café shaped by art, coffee and conversation.',
  city: 'Vadodara',
  state: 'Gujarat',
  country: 'India',
  priceRange: '₹400–600 per person',
  phoneNumber: '',
  whatsappNumber: '',
  whatsappMessage:
    'Hi The Tulip Touch Café, I’d like to know more about the café and your menu. Please share the details.',
  openingHours: [] as OpeningHour[],
  address: [
    'Opposite Galleria Mall',
    'Prafull Society, Tarangan Society',
    'Akota, Vadodara',
    'Gujarat 390007',
  ],
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Tulip+Touch+Cafe%2C+opposite+Galleria+Mall%2C+Prafull+Society%2C+Tarangan+Society%2C+Akota%2C+Vadodara%2C+Gujarat+390007',
  mapEmbedUrl: 'https://www.google.com/maps?q=The+Tulip+Touch+Cafe%2C+opposite+Galleria+Mall%2C+Akota%2C+Vadodara%2C+Gujarat+390007&output=embed',
  canonicalUrl: '',
  seoTitle: 'The Tulip Touch Café | Coffee Meets Art in Vadodara',
  seoDescription:
    'Discover The Tulip Touch Café in Vadodara: monochrome interiors, coffee, desserts, mocktails, shakes, and a menu shaped for lingering conversations.',
  ogImage: '/og-image.jpg',
} as const;

export const hasPhone = siteConfig.phoneNumber.trim().length > 0;
export const hasWhatsApp = siteConfig.whatsappNumber.trim().length > 0;
export const hasDirections = siteConfig.googleMapsUrl.trim().length > 0;
export const hasOpeningHours = siteConfig.openingHours.length > 0;

export function getWhatsAppHref() {
  if (!hasWhatsApp) return '';
  const message = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}?text=${message}`;
}

export function getPhoneHref() {
  if (!hasPhone) return '';
  return `tel:${siteConfig.phoneNumber.replace(/\s/g, '')}`;
}
