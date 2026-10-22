'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { menuCategories, menuItems, type MenuCategory } from '@/data/menu';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';
import { Icon } from './Icon';

export function MenuPanel() {
  const [activeCategory, setActiveCategory] = useState<'All' | MenuCategory>('All');
  const list = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const visibleItems = useMemo(() => activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory), [activeCategory]);

  // Rows rise in when the list first scrolls into view, and again each time the filter changes.
  useEffect(() => {
    registerGsap();
    const el = list.current;
    if (!el || prefersReducedMotion()) return;
    const rows = el.querySelectorAll('.menu-row');
    const first = firstRun.current;
    firstRun.current = false;
    const tween = gsap.fromTo(
      rows,
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.045, clearProps: 'transform,opacity,visibility',
        ...(first ? { scrollTrigger: { trigger: el, start: 'top 88%', once: true } } : {}),
      },
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); gsap.set(rows, { clearProps: 'all' }); };
  }, [activeCategory]);

  return (
    <div className="menu-panel">
      <div className="menu-filter" role="group" aria-label="Filter menu by category">
        {menuCategories.map((category) => (
          <button key={category} type="button" aria-pressed={activeCategory === category} className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <p className="visually-hidden" role="status">{`Showing ${visibleItems.length} ${activeCategory === 'All' ? 'menu items' : activeCategory + ' items'}`}</p>
      <div className="menu-list" ref={list}>
        {visibleItems.map((item, index) => (
          <article className="menu-row" key={item.name}>
            <span className="menu-row-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="menu-row-copy">
              <div className="menu-row-title"><h3>{item.name}</h3>{item.featured ? <span className="mini-tag">Featured</span> : null}</div>
              <p>{item.description}</p>
            </div>
            <div className="menu-row-meta"><span className="menu-price">₹{item.price}</span><span className="menu-category">{item.category}</span><Icon name="spark" size={16} /></div>
          </article>
        ))}
      </div>
    </div>
  );
}
