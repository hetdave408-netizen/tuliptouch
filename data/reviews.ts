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

export type GuestReview = { text: string; author: string; meta?: string };

// Excerpts from public Google reviews. Add or swap entries here and they appear in the scrolling strip.
export const guestReviews: GuestReview[] = [
  { author: 'Jiten Patel', text: 'Absolutely loved this café! The ambience is beautiful with a perfect Pinterest-style vibe — very aesthetic and cozy. It’s one of the best places for photography as every corner looks picture-perfect.' },
  { author: 'Arya', meta: 'Local Guide', text: 'Tulip Cafe is easily the most aesthetic spot in Vadodara! The interiors are stunning and every corner is super Instagrammable. Beyond the looks, the food is actually great too.' },
  { author: 'Pratik Bafna', meta: 'Local Guide', text: 'Monochrome, but make it magical. The Tulip Touch embraces elegance in two shades — black and white — and yet feels so full of warmth and charm.' },
  { author: 'Sukhdeep Singh Matharu', meta: 'Local Guide', text: 'A beautiful black-and-white themed spot in Vadodara with a calm and elegant vibe. The ambience feels modern yet cozy, perfect for relaxing with friends or a quiet coffee.' },
  { author: 'Janardan Mishra', meta: 'Local Guide', text: 'One of the most visually appealing cafés in Vadodara. The décor is thoughtfully curated, creating a charming and picture-perfect atmosphere in every corner.' },
  { author: 'Rohit Aggarwal', meta: 'Local Guide', text: 'Great place to sit and have tasty food. Good seating inside and out. Place is clean and well decorated.' },
  { author: 'Ankit Rai', meta: 'Local Guide', text: 'Beautiful, monochrome cafe with delicious food. The pineapple shake and strawberry kitkat share touched the soul in the Vadodara heat.' },
  { author: 'Yashwant Raizada', meta: 'Local Guide', text: 'Definitely great for your Instagram stories — the monochrome aesthetic makes every corner look picture-perfect.' },
];
