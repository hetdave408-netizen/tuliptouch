import type { Metadata, Viewport } from 'next';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource-variable/dm-sans';
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
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.siteName} interior and entrance` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    images: [siteConfig.ogImage],
  },
};

export const viewport: Viewport = { themeColor: '#161616', width: 'device-width', initialScale: 1 };

/**
 * Runs before first paint. Marks the page as "motion-ready" so hero elements start hidden (no flash),
 * and flags the first visit of a session for the short intro. A timeout guarantees the page can never
 * stay hidden if scripts fail. Reduced-motion visitors get neither class.
 */
const preflight = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');if(!sessionStorage.getItem('tt-seen'))d.classList.add('is-loading');}setTimeout(function(){d.classList.remove('js-motion','is-loading')},5000)}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: preflight }} /></head>
      <body>{children}</body>
    </html>
  );
}
