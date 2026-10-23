'use client';

import { useMemo, useState } from 'react';
import { menuCategories, menuItems, type MenuCategory } from '@/data/menu';
import FlowingMenu from './rb/FlowingMenu';

const photo: Record<string, string> = {
  All: '/images/interior-lounge.jpg',
  'Hot Brewing': '/images/logo-wall.jpg',
  'Cold Coffee': '/images/facade.jpg',
  Shakes: '/images/angel-corner.jpg',
  Mocktails: '/images/interior-floor.jpg',
  Desserts: '/images/interior-lounge.jpg',
};

export function MenuSection() {
  const [active, setActive] = useState(0);
  const category = menuCategories[active];
  const items = useMemo(() => category === 'All' ? menuItems : menuItems.filter((m) => m.category === (category as MenuCategory)), [category]);
  const flow = menuCategories.map((c) => ({
    text: c,
    marquee: `${c === 'All' ? menuItems.length : menuItems.filter((m) => m.category === c).length} items`,
    image: photo[c],
  }));
  return (
    <div className="menu-wrap">
      <div className="menu-flow">
        <FlowingMenu items={flow} activeIndex={active} onItemClick={(_, i) => setActive(i)} ariaLabel="Menu categories" textColor="#fafaf9" bgColor="#0c0a09" marqueeBgColor="#fafaf9" marqueeTextColor="#0c0a09" borderColor="rgba(250,250,249,.25)" />
      </div>
      <p className="visually-hidden" role="status">{`Showing ${items.length} ${category === 'All' ? 'menu items' : category + ' items'}`}</p>
      <div className="menu-list">
        {items.map((item, i) => (
          <article className="menu-row" key={item.name}>
            <span className="menu-row-n">{String(i + 1).padStart(2, '0')}</span>
            <div className="menu-row-copy"><h3>{item.name}{item.featured ? <span className="tag">Featured</span> : null}</h3><p>{item.description}</p></div>
            <div className="menu-row-meta"><strong>₹{item.price}</strong><span>{item.category}</span></div>
          </article>
        ))}
      </div>
    </div>
  );
}
