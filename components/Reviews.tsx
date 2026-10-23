'use client';

import { guestReviews } from '@/data/reviews';

export function Reviews() {
  return (
    <div className="review-stack" data-review-stack>
      <div className="review-line" aria-hidden="true"><i data-review-line /></div>
      <div className="review-list" role="list" aria-label="Guest reviews">
        {guestReviews.map((r, i) => (
          <figure className="review-card" role="listitem" key={i} data-review>
            <span className="review-tag">Google review</span>
            <blockquote>{r.text}</blockquote>
            <figcaption>{r.author}{r.meta ? <small> · {r.meta}</small> : null}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
