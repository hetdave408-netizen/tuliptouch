'use client';

import { useEffect, useRef, useState } from 'react';
import { galleryItems } from '@/data/gallery';
import { featuredMenu } from '@/data/menu';
import { hasOpeningHours, hasPhone, hasWhatsApp, getPhoneHref, getWhatsAppHref, siteConfig } from '@/data/siteConfig';
import { guestReviews, reviewSummary } from '@/data/reviews';
import { Cursor } from './Cursor';
import { Gallery } from './Gallery';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { MenuPanel } from './MenuPanel';
import { PhotoStrips } from './PhotoStrips';
import { Preloader } from './Preloader';
import { SectionLabel } from './SectionLabel';
import { SmoothScroll } from './SmoothScroll';
import { initPageMotion } from './motion';

/** "4.5 / 5" -> prefix "", number "4.5", suffix " / 5". The full text is kept for screen readers. */
function Stat({ text }: { text: string }) {
  const match = text.match(/^(.*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return <>{text}</>;
  const [, prefix, number, suffix] = match;
  const decimals = number.includes('.') ? number.split('.')[1].length : 0;
  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">{prefix}<span data-count={number.replace(/,/g, '')} data-decimals={decimals} data-group={number.includes(',')}>{number}</span>{suffix}</span>
    </>
  );
}

function ReviewsStrip() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * Math.max(300, (track.current?.clientWidth ?? 600) * 0.8), behavior: 'smooth' });
  return (
    <div className="review-strip" data-fade>
      <div className="review-strip-head"><span>Google reviews. Scroll to read.</span><div><button type="button" aria-label="Previous reviews" onClick={() => scroll(-1)}><Icon name="arrow" size={18} style={{ transform: 'scaleX(-1)' }} /></button><button type="button" aria-label="Next reviews" onClick={() => scroll(1)}><Icon name="arrow" size={18} /></button></div></div>
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
  { label: 'Home', href: '#home', key: 'home' },
  { label: 'About', href: '#about', key: 'about' },
  { label: 'Experience', href: '#experience', key: 'experience' },
  { label: 'Menu', href: '#menu', key: 'menu' },
  { label: 'Gallery', href: '#gallery', key: 'gallery' },
  { label: 'Contact', href: '#contact', key: 'contact' },
];

function ActionLink({ href, disabled, children, variant = 'ink', icon }: { href?: string; disabled?: boolean; children: React.ReactNode; variant?: 'ink' | 'paper' | 'outline'; icon?: 'arrow' | 'whatsapp' | 'phone' | 'pin' }) {
  const className = `action-link action-link--${variant}${disabled ? ' is-disabled' : ''}`;
  if (disabled || !href) return null;
  const external = href.startsWith('http');
  return <a className={className} href={href} data-magnetic {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}{icon ? <Icon name={icon} size={17} /> : null}</a>;
}

export function CafeSite() {
  const shell = useRef<HTMLDivElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    if (!shell.current) return;
    return initPageMotion(shell.current);
  }, []);

  // The mobile menu closes on Escape and returns focus to its button.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMobileOpen(false); menuToggle.current?.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const whatsappHref = getWhatsAppHref();
  const phoneHref = getPhoneHref();

  return (
    <div className="site-shell" ref={shell}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <div className="scroll-progress" data-progress aria-hidden="true" />

      <header className="site-header" data-header data-open={mobileOpen}>
        <a href="#home" className="brand" aria-label="The Tulip Touch Café home">
          <img src="/brand-mark.svg" alt="" className="brand-mark" width={37} height={37} />
          <span className="brand-copy"><strong>The Tulip Touch</strong><em>Café / Vadodara</em></span>
        </a>
        <nav id="primary-nav" className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => <a href={item.href} key={item.href} data-nav-link={item.key} onClick={() => setMobileOpen(false)}>{item.label}</a>)}
          <ActionLink href={siteConfig.googleMapsUrl} variant="paper" icon="pin">Get directions</ActionLink>
        </nav>
        <button ref={menuToggle} type="button" className="menu-toggle" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="primary-nav" onClick={() => setMobileOpen((open) => !open)}><Icon name={mobileOpen ? 'close' : 'menu'} size={22} /></button>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="home" data-hero data-section="home">
          <div className="hero-grid">
            <div className="hero-copy" data-hero-copy>
              <p className="eyebrow" data-intro>A café / a canvas / Vadodara</p>
              <h1 data-hero-title>The Tulip<br /><span>Touch</span> Café</h1>
              <p className="hero-dek" data-intro>Where coffee meets art, and the room invites you to stay a little longer.</p>
              <div className="hero-actions" data-intro><a href="#menu" className="action-link action-link--paper" data-magnetic>View the menu <Icon name="arrow" size={17} /></a><ActionLink href={siteConfig.googleMapsUrl} variant="outline" icon="pin">Get directions</ActionLink></div>
            </div>
            <div className="hero-visual" data-hero-visual>
              <div className="hero-image-frame" data-intro>
                <div className="hero-image-clip" data-hero-clip><img src="/images/facade.jpg" alt="The Tulip Touch Café entrance with striped awning, red carpet and black iron gates" width={1080} height={820} fetchPriority="high" data-hero-img /></div>
                <span className="image-stamp">Opposite Galleria Mall, Akota</span>
              </div>
              <div className="hero-side-note" data-intro><span>01</span><p>Art, coffee<br />& conversation.</p></div>
            </div>
          </div>
          <div className="hero-footer" data-intro><span>Scroll to explore</span><span className="hero-line" /><span>Akota / Gujarat</span></div>
          <div className="zigzag hero-zigzag" data-drift aria-hidden="true" />
        </section>

        <section className="section section-paper about-section" id="about" data-section="about">
          <div className="section-layout"><SectionLabel number="01">The idea</SectionLabel><div className="about-copy"><h2 data-split="scrub">A café shaped by <em>art, coffee</em> and conversation.</h2><p data-fade>The Tulip Touch Café brings together a monochrome point of view, coffee-led rituals, casual dining, and corners made for photographs, conversation, and a slower pause in the day.</p><a href="#experience" className="text-link" data-fade>See the experience <Icon name="arrow" size={16} /></a></div></div>
          <div className="about-footnotes" data-fade><span>Vadodara, Gujarat</span><span>₹400–600 per person</span><span>All supplied menu items vegetarian</span></div>
        </section>

        <PhotoStrips />

        <section className="section section-ink experience-section" id="experience" data-section="experience">
          <div className="section-heading"><SectionLabel number="02">The atmosphere</SectionLabel><h2 data-split="lines">Made for the<br /><em>in-between</em> moments.</h2><p data-fade>Artistic interiors, casual plates, cold coffee, desserts, mocktails and shakes — a visual language that continues from the room to the menu.</p></div>
          <div className="experience-grid">
            <div className="experience-card experience-card--image" data-clip data-parallax data-cursor="Look"><img src="/images/interior-lounge.jpg" alt="Black and white lounge with a chandelier and painted ornate walls" width={1080} height={716} loading="lazy" decoding="async" /><span>01 / Artistic interiors</span></div>
            <div className="experience-card experience-card--quote" data-fade><Icon name="spark" size={24} /><blockquote>“A little room for coffee, culture, and the conversations that happen between them.”</blockquote><span>The Tulip Touch</span></div>
            <div className="experience-card experience-card--list" data-fade><span className="card-index">02</span><h3>The rhythm</h3><ul><li>Monochrome aesthetic</li><li>Photo-friendly corners</li><li>Coffee & conversation</li><li>Desserts & drinks</li></ul></div>
            <div className="experience-card experience-card--image experience-card--small" data-clip data-parallax data-cursor="Look"><img src="/images/logo-wall.jpg" alt="Tulip Touch Café emblem on an illustrated iron-gate wall" width={1080} height={609} loading="lazy" decoding="async" /><span>03 / The emblem</span></div>
          </div>
        </section>

        <section className="section section-paper featured-section" id="featured" data-section="menu">
          <div className="section-heading section-heading--split"><div><SectionLabel number="03">The menu, in focus</SectionLabel><h2 data-split="lines">Featured from<br /><em>the menu.</em></h2></div><p data-fade>A few notes from the full vegetarian menu — coffees, coolers, shakes and desserts, presented as an invitation to browse.</p></div>
          <div className="featured-grid" data-stack>{featuredMenu.slice(0, 5).map((item, index) => <article className="featured-item" data-fade style={{ '--i': index } as React.CSSProperties} key={item.name}><div className="featured-number">0{index + 1}</div><span className="featured-cat">{item.category}</span><div className="featured-copy"><h3>{item.name}</h3><p>{item.description}</p><strong>₹{item.price}</strong></div></article>)}</div>
          <div className="section-cta" data-fade><a href="#menu" className="action-link action-link--ink" data-magnetic>Explore the full menu <Icon name="arrow" size={17} /></a></div>
        </section>

        <section className="section section-menu" id="menu" data-section="menu">
          <div className="section-heading section-heading--menu"><div><SectionLabel number="04">The full menu</SectionLabel><h2 data-split="lines">Browse the<br /><em>whole picture.</em></h2></div><p data-fade>Every item on the menu, with prices. Filter by category to find your next order.</p></div>
          <MenuPanel />
        </section>

        <Gallery items={galleryItems} onOpen={setActiveImage} />

        <section className="section section-ink reviews-section" id="reviews" data-section="reviews">
          <div className="reviews-intro"><SectionLabel number="06">The word around it</SectionLabel><h2 data-split="lines">What the room<br /><em>leaves behind.</em></h2><p data-fade>Guests talk about the monochrome interiors, the photo-friendly corners, the cozy ambience, and the food, coffee and service.</p></div>
          <div className="rating-block" data-fade><div className="rating-value"><Stat text={reviewSummary.rating} /></div><div className="rating-rule" /><div className="rating-count"><Stat text={reviewSummary.reviewCount} /><span className="rating-label">Guest rating</span></div></div>
          <ReviewsStrip />
        </section>

        <section className="section section-location" id="contact" data-section="contact">
          <div className="location-mark" data-fade><img src="/brand-mark.svg" alt="" width={75} height={75} /><span>Find the room</span></div>
          <div className="location-grid">
            <div className="location-copy"><SectionLabel number="07">The address</SectionLabel><h2 data-split="lines">Come for the<br /><em>atmosphere.</em></h2><address data-fade><strong>{siteConfig.siteName}</strong>{siteConfig.address.map((line) => <span key={line}>{line}</span>)}</address><div className="location-actions" data-fade><ActionLink href={siteConfig.googleMapsUrl} variant="ink" icon="pin">Get directions</ActionLink><ActionLink href={phoneHref} disabled={!hasPhone} variant="outline" icon="phone">Call</ActionLink><ActionLink href={whatsappHref} disabled={!hasWhatsApp} variant="outline" icon="whatsapp">WhatsApp</ActionLink></div></div>
            <div className="contact-card" data-fade><span className="card-index">Visit us</span><h3>Find us in<br /><em>Akota.</em></h3><div className="map-frame"><iframe title="Map showing The Tulip Touch Café in Akota, Vadodara" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="contact-lines">{hasPhone ? <div><span>Phone</span><strong>{siteConfig.phoneNumber}</strong></div> : null}<div><span>Address</span><strong>Opposite Galleria Mall, Akota</strong></div><div><span>Price</span><strong>{siteConfig.priceRange}</strong></div>{hasOpeningHours ? siteConfig.openingHours.map((h) => <div key={h.day}><span>{h.day}</span><strong>{h.hours}</strong></div>) : null}</div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><a href="#home" className="footer-brand"><img src="/brand-mark.svg" alt="" width={52} height={52} /><span>The Tulip Touch<br /><em>Café / Vadodara</em></span></a><nav className="footer-links" aria-label="Footer navigation">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div className="footer-contact"><span>Opposite Galleria Mall</span><span>Akota, Vadodara / Gujarat 390007</span></div></div>
        <div className="footer-wordmark" aria-hidden="true" data-split="lines">Tulip Touch</div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} The Tulip Touch Café</span><span>Made for coffee, art & conversation.</span><a href="#home">Back to top <Icon name="arrow" size={15} style={{ transform: 'rotate(-90deg)' }} /></a></div>
      </footer>
      {hasWhatsApp ? <a className="floating-whatsapp" href={whatsappHref} aria-label="Open WhatsApp" data-magnetic><Icon name="whatsapp" size={22} /></a> : null}
      {activeImage !== null ? <Lightbox items={galleryItems} index={activeImage} onChangeAction={setActiveImage} onCloseAction={() => setActiveImage(null)} /> : null}
    </div>
  );
}
