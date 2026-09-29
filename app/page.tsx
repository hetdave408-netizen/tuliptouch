import { CafeSite } from '@/components/CafeSite';
import { siteConfig } from '@/data/siteConfig';

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: siteConfig.siteName,
    description: siteConfig.seoDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.join(', '),
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      postalCode: '390007',
      addressCountry: siteConfig.country,
    },
    priceRange: siteConfig.priceRange,
    servesCuisine: 'Vegetarian café food and drinks',
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><CafeSite /></>;
}
