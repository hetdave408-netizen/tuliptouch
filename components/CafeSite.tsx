'use client';

import { useEffect, useMemo, useState } from 'react';
import { galleryItems } from '@/data/gallery';
import { featuredMenu } from '@/data/menu';
import { hasDirections, hasOpeningHours, hasPhone, hasWhatsApp, getPhoneHref, getWhatsAppHref, siteConfig } from '@/data/siteConfig';
import { reviewSummary } from '@/data/reviews';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { MenuPanel } from './MenuPanel';

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
  if (disabled) return <span className={className} aria-disabled="true" title="Add this detail in data/siteConfig.ts">{children}{icon ? <Icon name={icon} size={17} /> : null}</span>;
  return <a className={className} href={href}>{children}{icon ? <Icon name={icon} size={17} /> : null}</a>;
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
  const galleryCategories = ['All', 'Interiors', 'Food', 'Coffee', 'Desserts', 'Details'] as const;

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#home" className="brand" aria-label="The Tulip Touch Café home">
          <img src="/brand-mark.svg" alt="" className="brand-mark" />
          <span className="brand-copy"><strong>The Tulip Touch</strong><em>Café / Vadodara</em></span>
        </a>
        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => <a href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>)}
          <ActionLink href={whatsappHref} disabled={!hasWhatsApp} variant="ink" icon="whatsapp">WhatsApp us</ActionLink>
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
              <div className="hero-actions"><a href="#menu" className="action-link action-link--paper">View the menu <Icon name="arrow" size={17} /></a><ActionLink href={whatsappHref} disabled={!hasWhatsApp} variant="outline" icon="whatsapp">WhatsApp us</ActionLink></div>
            </div>
            <div className="hero-visual reveal">
              <div className="hero-image-frame"><img src="/images/hero-study.svg" alt="Monochrome editorial visual study of a coffee cup and art magazine" /><span className="image-stamp">Editorial visual study / replace with original café photography</span></div>
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
            <div className="experience-card experience-card--image reveal"><img src="/images/interior-study.svg" alt="Monochrome editorial visual study of an artistic café interior" /><span>01 / Artistic interiors</span></div>
            <div className="experience-card experience-card--quote reveal"><Icon name="spark" size={24} /><blockquote>“A little room for coffee, culture, and the conversations that happen between them.”</blockquote><span>THE TULIP TOUCH / POINT OF VIEW</span></div>
            <div className="experience-card experience-card--list reveal"><span className="card-index">02</span><h3>The rhythm</h3><ul><li>Monochrome aesthetic</li><li>Photo-friendly corners</li><li>Coffee & conversation</li><li>Desserts & drinks</li></ul></div>
            <div className="experience-card experience-card--image experience-card--small reveal"><img src="/images/coffee-study.svg" alt="Monochrome editorial visual study of coffee" /><span>03 / Coffee culture</span></div>
          </div>
        </section>

        <section className="section section-paper featured-section" id="featured">
          <div className="section-heading section-heading--split reveal"><div><SectionLabel number="03">The menu, in focus</SectionLabel><h2>Featured from<br /><em>the menu.</em></h2></div><p>A few notes from the full vegetarian menu — coffees, coolers, shakes and desserts, presented as an invitation to browse.</p></div>
          <div className="featured-grid">{featuredMenu.slice(0, 5).map((item, index) => <article className={`featured-item reveal ${index === 1 ? 'featured-item--offset' : ''}`} key={item.name}><div className="featured-number">0{index + 1}</div><div className="featured-image"><img src={item.image} alt={`${item.name} visual study placeholder`} /><span>{item.category}</span></div><div className="featured-copy"><h3>{item.name}</h3><p>{item.description}</p><strong>₹{item.price}</strong></div></article>)}</div>
          <div className="section-cta"><a href="#menu" className="action-link action-link--ink">Explore the full menu <Icon name="arrow" size={17} /></a></div>
        </section>

        <section className="section section-menu" id="menu">
          <div className="section-heading section-heading--menu reveal"><div><SectionLabel number="04">The full menu</SectionLabel><h2>Browse the<br /><em>whole picture.</em></h2></div><p>Prices and descriptions are generated from the centralized menu data, so edits stay consistent across the experience.</p></div>
          <MenuPanel />
        </section>

        <section className="section section-paper gallery-section" id="gallery">
          <div className="section-heading section-heading--split reveal"><div><SectionLabel number="05">The gallery</SectionLabel><h2>A visual<br /><em>language.</em></h2></div><p>Replace the visual studies below with original café photography whenever it is available. The gallery structure is ready for it.</p></div>
          <div className="gallery-toolbar" role="tablist" aria-label="Filter gallery by category">{galleryCategories.map((category) => <button key={category} type="button" role="tab" aria-selected={galleryFilter === category} className={galleryFilter === category ? 'is-active' : ''} onClick={() => setGalleryFilter(category)}>{category}</button>)}</div>
          <div className="gallery-grid">{visibleGallery.map((item, index) => <button type="button" className={`gallery-tile gallery-tile--${item.size} reveal`} key={`${item.caption}-${index}`} onClick={() => setActiveImage(item)}><img src={item.image} alt={item.alt} /><span className="gallery-caption"><small>{item.category}</small>{item.caption}<Icon name="arrow" size={16} /></span></button>)}</div>
        </section>

        <section className="section section-ink reviews-section" id="reviews">
          <div className="reviews-intro reveal"><SectionLabel number="06">The word around it</SectionLabel><h2>What the room<br /><em>leaves behind.</em></h2><p>Supplied review information points to the café’s monochrome interiors, aesthetic atmosphere, photography-friendly spaces, cozy ambience, food, coffee, service, and pricing.</p></div>
          <div className="rating-block reveal"><div className="rating-value">{reviewSummary.rating}</div><div className="rating-rule" /><div className="rating-count">{reviewSummary.reviewCount}<span>{reviewSummary.sourceNote}</span></div></div>
          <div className="theme-grid">{reviewSummary.themes.map((theme, index) => <div className="theme-item reveal" key={theme}><span>0{index + 1}</span><p>{theme}</p></div>)}</div>
        </section>

        <section className="section section-location" id="contact">
          <div className="location-mark reveal"><img src="/brand-mark.svg" alt="" /><span>Find the room</span></div>
          <div className="location-grid">
            <div className="location-copy reveal"><SectionLabel number="07">The address</SectionLabel><h2>Come for the<br /><em>atmosphere.</em></h2><address><strong>{siteConfig.siteName}</strong>{siteConfig.address.map((line) => <span key={line}>{line}</span>)}</address><div className="location-actions"><ActionLink href={siteConfig.googleMapsUrl} disabled={!hasDirections} variant="ink" icon="pin">Get directions</ActionLink><ActionLink href={phoneHref} disabled={!hasPhone} variant="outline" icon="phone">Call</ActionLink><ActionLink href={whatsappHref} disabled={!hasWhatsApp} variant="outline" icon="whatsapp">WhatsApp</ActionLink></div></div>
            <div className="contact-card reveal"><span className="card-index">Contact / 08</span><h3>Keep in touch<br /><em>with the café.</em></h3><p>{siteConfig.contactNote}</p><div className="contact-lines"><div><span>Phone</span><strong>{hasPhone ? siteConfig.phoneNumber : 'Add in siteConfig'}</strong></div><div><span>WhatsApp</span><strong>{hasWhatsApp ? 'Ready to open' : 'Add in siteConfig'}</strong></div><div><span>Hours</span><strong>{hasOpeningHours ? 'See opening hours' : 'Add in siteConfig'}</strong></div></div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a href="#home" className="footer-brand"><img src="/brand-mark.svg" alt="" /><span>The Tulip Touch<br /><em>Café / Vadodara</em></span></a><div className="footer-links">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div><div className="footer-contact"><span>Opposite Galleria Mall</span><span>Akota, Vadodara / Gujarat 390007</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} The Tulip Touch Café</span><span>Made for coffee, art & conversation.</span><a href="#home">Back to top <Icon name="arrow" size={15} /></a></div></footer>
      {hasWhatsApp ? <a className="floating-whatsapp" href={whatsappHref} aria-label="Open WhatsApp"><Icon name="whatsapp" size={22} /></a> : null}
      {activeImage ? <Lightbox image={activeImage.image} alt={activeImage.alt} caption={activeImage.caption} onCloseAction={() => setActiveImage(null)} /> : null}
    </div>
  );
}
