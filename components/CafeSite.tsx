'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig, hasPhone, hasWhatsApp, hasOpeningHours, getPhoneHref, getWhatsAppHref } from '@/data/siteConfig';
import { galleryItems } from '@/data/gallery';
import { featuredMenu } from '@/data/menu';
import { reviewSummary } from '@/data/reviews';
import { initPageMotion } from './motion';
import { SmoothScroll } from './SmoothScroll';
import { WalkThrough } from './WalkThrough';
import { PourYourOwn } from './PourYourOwn';
import { MenuSection } from './MenuSection';
import { Gallery } from './Gallery';
import { Reviews } from './Reviews';
import { Lightbox } from './Lightbox';
import { Icon } from './Icon';
import StaggeredMenu from './rb/StaggeredMenu';
import ScrollReveal from './rb/ScrollReveal';
import ScrollFloat from './rb/ScrollFloat';
import ScrollVelocity from './rb/ScrollVelocity';
import ScrollStack, { ScrollStackItem } from './rb/ScrollStack';
import SpotlightCard from './rb/SpotlightCard';
import CountUp from './rb/CountUp';
import ShinyText from './rb/ShinyText';
import BlurText from './rb/BlurText';

const nav = [
  { label: 'Home', ariaLabel: 'Go to home', link: '#home' },
  { label: 'About', ariaLabel: 'Go to about', link: '#about' },
  { label: 'Experience', ariaLabel: 'Go to experience', link: '#experience' },
  { label: 'Menu', ariaLabel: 'Go to menu', link: '#menu' },
  { label: 'Gallery', ariaLabel: 'Go to gallery', link: '#gallery' },
  { label: 'Contact', ariaLabel: 'Go to contact', link: '#contact' },
];

const Label = ({ n, children }: { n: string; children: React.ReactNode }) => <p className="label"><span>{n}</span>{children}</p>;

export function CafeSite() {
  const shell = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => { if (shell.current) return initPageMotion(shell.current); }, []);
  const wa = getWhatsAppHref();
  const tel = getPhoneHref();

  return (
    <div className="site" ref={shell}>
      <a className="skip-link" href="#main">Skip to content</a>
      <SmoothScroll />
      <div className="progress" data-progress aria-hidden="true" />
      <StaggeredMenu isFixed position="right" items={nav} displayItemNumbering displaySocials={false} logoUrl="/brand-mark.svg" colors={['#292524', '#0c0a09']} menuButtonColor="#fafaf9" openMenuButtonColor="#fafaf9" accentColor="#e0b050" />

      <main id="main" tabIndex={-1}>
        <section className="hero" id="home" data-hero>
          <div className="hero-bg" data-hero-bg><img src="/images/facade.jpg" alt="" width={1080} height={820} fetchPriority="high" /></div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy" data-hero-copy>
            <p className="hero-eyebrow" data-hero-in>Akota, Vadodara · Coffee meets art</p>
            <h1 data-hero-title>The Tulip <em>Touch</em> Café</h1>
            <div className="hero-row">
              <BlurText text="Where coffee meets art, and the room invites you to stay a little longer." className="hero-dek" animateBy="words" delay={90} />
              <div className="hero-cta" data-hero-in>
                <a href="#menu" className="btn btn--light" data-magnetic><ShinyText text="View the menu" color="#0c0a09" shineColor="#a16207" speed={3} /><Icon name="arrow" size={17} /></a>
                <a href={siteConfig.googleMapsUrl} className="btn btn--line" target="_blank" rel="noopener noreferrer" data-magnetic>Get directions<Icon name="pin" size={17} /></a>
              </div>
            </div>
          </div>
          <div className="hero-foot" data-hero-in><span>Scroll to step inside</span><span className="hero-rate">★ {reviewSummary.rating} · {reviewSummary.reviewCount}</span></div>
        </section>

        <section className="about" id="about">
          <Label n="01">The idea</Label>
          <ScrollReveal containerClassName="about-reveal" textClassName="about-text" baseOpacity={0.12} enableBlur blurStrength={6} baseRotation={2}>
            The Tulip Touch Café brings together a monochrome point of view, coffee-led rituals, casual dining, and corners made for photographs, conversation, and a slower pause in the day.
          </ScrollReveal>
          <div className="stats" data-reveal>
            <div><strong><CountUp to={4.5} decimals={1} duration={2} className="num" />&thinsp;/&thinsp;5</strong><span>Guest rating</span></div>
            <div><strong><CountUp to={2057} separator="," duration={2.4} className="num" /></strong><span>Google reviews</span></div>
            <div><strong>{siteConfig.priceRange.replace(' per person', '')}</strong><span>Per person</span></div>
          </div>
        </section>

        <WalkThrough />

        <div className="velocity" aria-hidden="true"><ScrollVelocity texts={['Monochrome · Art · Coffee · Conversation ·', 'Photography-friendly · Cozy · Akota, Vadodara ·']} velocity={50} className="velocity-text" /></div>

        <section className="section dark" id="experience">
          <Label n="02">The atmosphere</Label>
          <ScrollFloat containerClassName="h2" textClassName="h2-text" splitBy="words" scrollStart="top bottom-=5%" scrollEnd="top center">Made for the in-between moments.</ScrollFloat>
          <p className="lede" data-reveal>Artistic interiors, casual plates, cold coffee, desserts, mocktails and shakes. A visual language that continues from the room to the menu.</p>
          <div className="xp-grid">
            <figure className="xp-img" data-clip><img src="/images/interior-lounge.jpg" alt="Black and white lounge with a chandelier and painted ornate walls" width={1080} height={716} loading="lazy" /><figcaption>01 / Artistic interiors</figcaption></figure>
            <SpotlightCard className="xp-card" spotlightColor="rgba(224,176,80,0.28)" theme="dark"><span className="xp-n">02</span><h3>The rhythm</h3><ul><li>Monochrome aesthetic</li><li>Photo-friendly corners</li><li>Coffee &amp; conversation</li><li>Desserts &amp; drinks</li></ul></SpotlightCard>
            <SpotlightCard className="xp-card xp-quote" spotlightColor="rgba(224,176,80,0.28)" theme="dark"><Icon name="spark" size={24} /><blockquote>“A little room for coffee, culture, and the conversations that happen between them.”</blockquote><span>The Tulip Touch</span></SpotlightCard>
            <figure className="xp-img xp-img--small" data-clip><img src="/images/logo-wall.jpg" alt="Tulip Touch Café emblem on an illustrated iron-gate wall" width={1080} height={609} loading="lazy" /><figcaption>03 / The emblem</figcaption></figure>
          </div>
        </section>

        <section className="section light" id="featured">
          <Label n="03">The menu, in focus</Label>
          <ScrollFloat containerClassName="h2 h2--ink" textClassName="h2-text" splitBy="words" scrollStart="top bottom-=5%" scrollEnd="top center">Featured from the menu.</ScrollFloat>
          <p className="lede lede--ink" data-reveal>A few notes from the full vegetarian menu: coffees, coolers, shakes and desserts, presented as an invitation to browse.</p>
          <ScrollStack useWindowScroll itemDistance={60} itemStackDistance={26} baseScale={0.88} itemScale={0.03} stackPosition="18%" className="stack">
            {featuredMenu.slice(0, 5).map((m, i) => (
              <ScrollStackItem key={m.name} itemClassName="stack-card">
                <span className="stack-n">0{i + 1}</span><span className="stack-cat">{m.category}</span>
                <h3>{m.name}</h3><p>{m.description}</p><strong>₹{m.price}</strong>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </section>

        <PourYourOwn />

        <section className="section dark" id="menu">
          <Label n="04">The full menu</Label>
          <ScrollFloat containerClassName="h2" textClassName="h2-text" splitBy="words" scrollStart="top bottom-=5%" scrollEnd="top center">Browse the whole picture.</ScrollFloat>
          <p className="lede" data-reveal>Every item on the menu, with prices. Pick a category to find your next order.</p>
          <MenuSection />
        </section>

        <section className="section light" id="gallery">
          <Label n="05">The gallery</Label>
          <ScrollFloat containerClassName="h2 h2--ink" textClassName="h2-text" splitBy="words" scrollStart="top bottom-=5%" scrollEnd="top center">A room made to be photographed.</ScrollFloat>
          <Gallery items={galleryItems} onOpen={setActive} />
        </section>

        <section className="section dark reviews" id="reviews">
          <Label n="06">The word around it</Label>
          <ScrollFloat containerClassName="h2" textClassName="h2-text" splitBy="words" scrollStart="top bottom-=5%" scrollEnd="top center">What the room leaves behind.</ScrollFloat>
          <p className="lede" data-reveal>Guests talk about the monochrome interiors, the photo-friendly corners, the cozy ambience, and the food, coffee and service.</p>
          <Reviews />
        </section>

        <section className="section gold" id="contact">
          <Label n="07">The address</Label>
          <div className="contact-grid">
            <div>
              <h2 className="h2-static">Come for the <em>atmosphere.</em></h2>
              <address><strong>{siteConfig.siteName}</strong>{siteConfig.address.map((l) => <span key={l}>{l}</span>)}</address>
              <div className="contact-actions">
                <a className="btn btn--ink" href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer" data-magnetic>Get directions<Icon name="pin" size={17} /></a>
                {hasPhone ? <a className="btn btn--outline" href={tel} data-magnetic>Call<Icon name="phone" size={17} /></a> : null}
                {hasWhatsApp ? <a className="btn btn--outline" href={wa} target="_blank" rel="noopener noreferrer" data-magnetic>WhatsApp<Icon name="whatsapp" size={17} /></a> : null}
              </div>
            </div>
            <div className="contact-card">
              <div className="map"><iframe title="Map showing The Tulip Touch Café in Akota, Vadodara" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
              <dl>
                {hasPhone ? <div><dt>Phone</dt><dd>{siteConfig.phoneNumber}</dd></div> : null}
                <div><dt>Address</dt><dd>Opposite Galleria Mall, Akota</dd></div>
                <div><dt>Price</dt><dd>{siteConfig.priceRange}</dd></div>
                {hasOpeningHours ? siteConfig.openingHours.map((h) => <div key={h.day}><dt>{h.day}</dt><dd>{h.hours}</dd></div>) : null}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <ScrollFloat containerClassName="footer-mark" textClassName="footer-mark-text" scrollStart="top bottom+=10%" scrollEnd="bottom bottom">Tulip Touch</ScrollFloat>
        <div className="footer-bar"><span>© {new Date().getFullYear()} The Tulip Touch Café</span><span>Opposite Galleria Mall, Akota, Vadodara</span><a href="#home">Back to top ↑</a></div>
      </footer>
      {hasWhatsApp ? <a className="wa-float" href={wa} aria-label="Open WhatsApp" data-magnetic><Icon name="whatsapp" size={22} /></a> : null}
      {active !== null ? <Lightbox items={galleryItems} index={active} onChangeAction={setActive} onCloseAction={() => setActive(null)} /> : null}
    </div>
  );
}
