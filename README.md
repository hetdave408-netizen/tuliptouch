# The Tulip Touch Café — v5

Next.js 15 (App Router), TypeScript, plain CSS. Deploys on Vercel (`pnpm install && pnpm build`).

## Built with
- **UI UX Pro Max** — design system: Scroll-Triggered Storytelling pattern, brutalist editorial style, near-black + gold, Inter + Playfair Display italic, GSAP scroll/reveal rules (reduced motion renders final states, pins limited to one section).
- **GSAP** (+ ScrollTrigger, SplitText) — hero intro, pinned walk-through, parallax, reveals, progress.
- **Lenis** — smooth scrolling (off for reduced motion).
- **React Bits** (real source, `components/rb/`) — StaggeredMenu, ScrollReveal, ScrollFloat, ScrollVelocity, ScrollStack, SpotlightCard, TiltedCard, FlowingMenu, CountUp, ShinyText, BlurText. Uses `motion` and `@hugeicons/*`.

## Edit your content
`data/siteConfig.ts` (phone, WhatsApp, hours — blank until filled), `data/menu.ts`, `data/reviews.ts`, `data/gallery.ts`. Nothing about the café is invented; empty fields are simply hidden.
