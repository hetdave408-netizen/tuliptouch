import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import './globals.css';

export const metadata: Metadata = {
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
  applicationName: siteConfig.siteName,
  keywords: ['café in Vadodara', 'coffee in Vadodara', 'The Tulip Touch Café', 'Akota cafés', 'artistic café'],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.siteName,
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.siteName} editorial preview` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
