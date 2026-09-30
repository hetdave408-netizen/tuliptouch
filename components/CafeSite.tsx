'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { galleryItems } from '@/data/gallery';
import { featuredMenu } from '@/data/menu';
import { hasOpeningHours, hasPhone, hasWhatsApp, getPhoneHref, getWhatsAppHref, siteConfig } from '@/data/siteConfig';
import { guestReviews, reviewSummary } from '@/data/reviews';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { MenuPanel } from './MenuPanel';

function ReviewsStrip() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * Math.max(300, (track.current?.clientWidth ?? 600) * 0.8), behavior: 'smooth' });
  return (
    <div className="review-strip reveal">
      <div className="review-strip-head"><span>Google reviews · scroll to read</span><div><button type="button" aria-label="Previous reviews" onClick={() => scroll(-1)}>←</button><button type="button" aria-label="Next reviews" onClick={() => scroll(1)}>→</button></div></div>
      <div className="review-track" ref={track} tabIndex={0} role="region" aria-label="Guest reviews">
        {guestReviews.map((r, i) => (
          <figure className="review-card" key={i}>
            <span className="review-num">{String(i + 1).padStart(2, '0')}</span>
                        <blockquote>{r.text}</blockquote>
            <figcaption>{r.author}{r.meta ? <small> · {r.meta}</small> : null}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

function ActionLink({ href, disabled, children, variant = 'ink', icon }: { href?: string; disabled?: boolean; children: React.ReactNode; variant?: 'ink' | 'paper' | 'outline'; icon?: 'arrow' | 'whatsapp' | 'phone' | 'pin' }) {
  const className = `action-link action-link--${variant}${disabled ? ' is-disabled' : ''}`;
  if (disabled || !href) return null;
  const external = href.startsWith('http');
  return <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}{icon ? <Icon name={icon} size={17} /> : null}</a>;
}

export function CafeSite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<'All' | (typeof galleryItems)[number]['category']>('All');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  const visibleGallery = useMemo(() => galleryFilter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === galleryFilter), [galleryFilter]);
  const whatsappHref = getWhatsAppHref();
  const phoneHref = getPhoneHref();
  const galleryCategories = ['All', 'Interiors', 'Exterior', 'Details'] as const;

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#home" className="brand" aria-label="The Tulip Touch Café home">
          <img src="/brand-mark.svg" alt="" className="brand-mark" />
          <span className="brand-copy"><strong>The Tulip Touch</strong><em>Café / Vadodara</em></span>
        </a>
        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => <a href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>)}
          <ActionLink href={siteConfig.googleMapsUrl} variant="ink" icon="pin">Get directions</ActionLink>
        </nav>
        <button type="button" className="menu-toggle" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}><Icon name={mobileOpen ? 'close' : 'menu'} size={22} /></button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow">A café / a canvas / Vadodara</p>
              <h1>The Tulip<br /><span>Touch</span> Café</h1>
              <p className="hero-dek">Where coffee meets art, and the room invites you to stay a little longer.</p>
              <div className="hero-actions"><a href="#menu" className="action-link action-link--paper">View the menu <Icon name="arrow" size={17} /></a><ActionLink href={siteConfig.googleMapsUrl} variant="outline" icon="pin">Get directions</ActionLink></div>
            </div>
            <div className="hero-visual reveal">
              <div className="hero-image-frame"><img src="/images/facade.jpg" alt="The Tulip Touch Café entrance with striped awning, red carpet and black iron gates" fetchPriority="high" /><span className="image-stamp">Opposite Galleria Mall, Akota</span></div>
              <div className="hero-side-note"><span>01</span><p>Art, coffee<br />& conversation.</p></div>
            </div>
          </div>
          <div className="hero-footer"><span>Scroll to explore</span><span className="hero-line" /><span>Akota / Gujarat</span></div>
        </section>

        <section className="section section-paper about-section" id="about">
          <div className="section-layout reveal"><SectionLabel number="01">The idea</SectionLabel><div className="about-copy"><h2>A café shaped by <em>art, coffee</em> and conversation.</h2><p>The Tulip Touch Café brings together a monochrome point of view, coffee-led rituals, casual dining, and corners made for photographs, conversation, and a slower pause in the day.</p><a href="#experience" className="text-link">See the experience <Icon name="arrow" size={16} /></a></div></div>
          <div className="about-footnotes"><span>Vadodara, Gujarat</span><span>₹400–600 per person</span><span>All supplied menu items vegetarian</span></div>
        </section>

        <section className="section section-ink experience-section" id="experience">
          <div className="section-heading reveal"><SectionLabel number="02">The atmosphere</SectionLabel><h2>Made for the<br /><em>in-between</em> moments.</h2><p>Artistic interiors, casual plates, cold coffee, desserts, mocktails and shakes — a visual language that continues from the room to the menu.</p></div>
          <div className="experience-grid">
            <div className="experience-card experience-card--image reveal"><img src="/images/interior-lounge.jpg" alt="Black and white lounge with a chandelier and painted ornate walls" loading="lazy" /><span>01 / Artistic interiors</span></div>
            <div className="experience-card experience-card--quote reveal"><Icon name="spark" size={24} /><blockquote>“A little room for coffee, culture, and the conversations that happen between them.”</blockquote><span>The Tulip Touch</span></div>
            <div className="experience-card experience-card--list reveal"><span className="card-index">02</span><h3>The rhythm</h3><ul><li>Monochrome aesthetic</li><li>Photo-friendly corners</li><li>Coffee & conversation</li><li>Desserts & drinks</li></ul></div>
            <div className="experience-card experience-card--image experience-card--small reveal"><img src="/images/logo-wall.jpg" alt="Tulip Touch Café emblem on an illustrated iron-gate wall" loading="lazy" /><span>03 / The emblem</span></div>
          </div>
        </section>

        <section className="section section-paper featured-section" id="featured">
          <div className="section-heading section-heading--split reveal"><div><SectionLabel number="03">The menu, in focus</SectionLabel><h2>Featured from<br /><em>the menu.</em></h2></div><p>A few notes from the full vegetarian menu — coffees, coolers, shakes and desserts, presented as an invitation to browse.</p></div>
          <div className="featured-grid">{featuredMenu.slice(0, 5).map((item, index) => <article className={`featured-item reveal ${index === 1 ? 'featured-item--offset' : ''}`} key={item.name}><div className="featured-number">0{index + 1}</div><span className="featured-cat">{item.category}</span><div className="featured-copy"><h3>{item.name}</h3><p>{item.description}</p><strong>₹{item.price}</strong></div></article>)}</div>
          <div className="section-cta"><a href="#menu" className="action-link action-link--ink">Explore the full menu <Icon name="arrow" size={17} /></a></div>
        </section>

        <section className="section section-menu" id="menu">
          <div className="section-heading section-heading--menu reveal"><div><SectionLabel number="04">The full menu</SectionLabel><h2>Browse the<br /><em>whole picture.</em></h2></div><p>Every item on the menu, with prices. Filter by category to find your next order.</p></div>
          <MenuPanel />
        </section>

        <section className="section section-paper gallery-section" id="gallery">
          <div className="section-heading section-heading--split reveal"><div><SectionLabel number="05">The gallery</SectionLabel><h2>A visual<br /><em>language.</em></h2></div><p>The black-and-white rooms, the ironwork and the small details that make it worth a photo.</p></div>
          <div className="gallery-toolbar" role="tablist" aria-label="Filter gallery by category">{galleryCategories.map((category) => <button key={category} type="button" role="tab" aria-selected={galleryFilter === category} className={galleryFilter === category ? 'is-active' : ''} onClick={() => setGalleryFilter(category)}>{category}</button>)}</div>
          <div className="gallery-grid">{visibleGallery.map((item, index) => <button type="button" className={`gallery-tile gallery-tile--${item.size} reveal`} key={`${item.caption}-${index}`} onClick={() => setActiveImage(item)}><img src={item.image} alt={item.alt} /><span className="gallery-caption"><small>{item.category}</small>{item.caption}<Icon name="arrow" size={16} /></span></button>)}</div>
        </section>

        <section className="section section-ink reviews-section" id="reviews">
          <div className="reviews-intro reveal"><SectionLabel number="06">The word around it</SectionLabel><h2>What the room<br /><em>leaves behind.</em></h2><p>Guests talk about the monochrome interiors, the photo-friendly corners, the cozy ambience, and the food, coffee and service.</p></div>
          <div className="rating-block reveal"><div className="rating-value">{reviewSummary.rating}</div><div className="rating-rule" /><div className="rating-count">{reviewSummary.reviewCount}<span>Guest rating</span></div></div>
          <ReviewsStrip />
        </section>

        <section className="section section-location" id="contact">
          <div className="location-mark reveal"><img src="/brand-mark.svg" alt="" /><span>Find the room</span></div>
          <div className="location-grid">
            <div className="location-copy reveal"><SectionLabel number="07">The address</SectionLabel><h2>Come for the<br /><em>atmosphere.</em></h2><address><strong>{siteConfig.siteName}</strong>{siteConfig.address.map((line) => <span key={line}>{line}</span>)}</address><div className="location-actions"><ActionLink href={siteConfig.googleMapsUrl} variant="ink" icon="pin">Get directions</ActionLink><ActionLink href={phoneHref} disabled={!hasPhone} variant="outline" icon="phone">Call</ActionLink><ActionLink href={whatsappHref} disabled={!hasWhatsApp} variant="outline" icon="whatsapp">WhatsApp</ActionLink></div></div>
            <div className="contact-card reveal"><span className="card-index">Visit us</span><h3>Find us in<br /><em>Akota.</em></h3><div className="map-frame"><iframe title="Map showing The Tulip Touch Café in Akota, Vadodara" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="contact-lines">{hasPhone ? <div><span>Phone</span><strong>{siteConfig.phoneNumber}</strong></div> : null}<div><span>Address</span><strong>Opposite Galleria Mall, Akota</strong></div><div><span>Price</span><strong>{siteConfig.priceRange}</strong></div>{hasOpeningHours ? siteConfig.openingHours.map((h) => <div key={h.day}><span>{h.day}</span><strong>{h.hours}</strong></div>) : null}</div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a href="#home" className="footer-brand"><img src="/brand-mark.svg" alt="" /><span>The Tulip Touch<br /><em>Café / Vadodara</em></span></a><div className="footer-links">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div className="footer-contact"><span>Opposite Galleria Mall</span><span>Akota, Vadodara / Gujarat 390007</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} The Tulip Touch Café</span><span>Made for coffee, art & conversation.</span><a href="#home">Back to top <Icon name="arrow" size={15} /></a></div></footer>
      {hasWhatsApp ? <a className="floating-whatsapp" href={whatsappHref} aria-label="Open WhatsApp"><Icon name="whatsapp" size={22} /></a> : null}
      {activeImage ? <Lightbox image={activeImage.image} alt={activeImage.alt} caption={activeImage.caption} onCloseAction={() => setActiveImage(null)} /> : null}
    </div>
  );
}
