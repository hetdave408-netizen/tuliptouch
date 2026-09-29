'use client';

import { useMemo, useState } from 'react';
import { menuCategories, menuItems, type MenuCategory } from '@/data/menu';
import { Icon } from './Icon';

export function MenuPanel() {
  const [activeCategory, setActiveCategory] = useState<'All' | MenuCategory>('All');
  const visibleItems = useMemo(() => activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory), [activeCategory]);

  return (
    <div className="menu-panel">
      <div className="menu-filter" role="tablist" aria-label="Filter menu by category">
        {menuCategories.map((category) => (
          <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="menu-list" aria-live="polite">
        {visibleItems.map((item, index) => (
          <article className="menu-row" key={item.name}>
            <span className="menu-row-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="menu-row-copy">
              <div className="menu-row-title"><h3>{item.name}</h3>{item.featured ? <span className="mini-tag">Featured</span> : null}</div>
              <p>{item.description}</p>
              <span className="veg-label"><span aria-hidden="true">◦</span> Vegetarian</span>
            </div>
            <div className="menu-row-meta"><span className="menu-price">₹{item.price}</span><span className="menu-category">{item.category}</span><Icon name="spark" size={16} /></div>
          </article>
        ))}
      </div>
    </div>
  );
}
