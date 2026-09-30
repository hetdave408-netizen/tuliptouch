export const reviewSummary = {
  rating: '4.5 / 5',
  reviewCount: '2,057 reviews',
  sourceNote: 'Guest rating',
  themes: [
    'Monochrome and black-and-white interiors',
    'Artistic, photography-friendly atmosphere',
    'Cozy ambience for coffee and conversation',
    'Food, coffee, service, and pricing',
  ],
};

export type GuestReview = { text: string; author?: string; rating?: number };

// Paste real guest reviews here (text, author, rating) and they appear in the scrolling strip.
// Until then the strip shows the themes guests mention most.
export const guestReviews: GuestReview[] = reviewSummary.themes.map((text) => ({ text }));
