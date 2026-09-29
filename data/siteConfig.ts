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
  googleMapsUrl: '',
  canonicalUrl: '',
  seoTitle: 'The Tulip Touch Café | Coffee Meets Art in Vadodara',
  seoDescription:
    'Discover The Tulip Touch Café in Vadodara: monochrome interiors, coffee, desserts, mocktails, shakes, and a menu shaped for lingering conversations.',
  ogImage: '/og-image.svg',
  contactNote:
    'Phone, WhatsApp, hours, and map details are ready to be added in this configuration file.',
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
