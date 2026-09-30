# The Tulip Touch Café

A premium, frontend-only one-page website for **The Tulip Touch Café** in Vadodara, Gujarat. The selected visual direction is **Editorial Gallery Café**: monochrome surfaces, warm paper, asymmetric layouts, gallery-style image treatment, and a menu that reads like a cultural insert.

## Technology stack

- Next.js 15 App Router
- React 19
- TypeScript
- Plain CSS with a small design-token system
- pnpm 11
- No backend, database, CMS, authentication, account system, form handler, or external API

## Local installation

```bash
pnpm install
pnpm dev
```

The development site runs at `http://localhost:3000`.

## Production build

```bash
pnpm typecheck
pnpm build
pnpm start
```

The project is ready for Vercel. Import the repository or upload this folder, keep the default Next.js framework detection, and deploy.

## Editing café details

All business details are centralized in `data/siteConfig.ts`.

- Change the café name in `siteName` and `shortName`.
- Change the phone number in `phoneNumber`. The call action activates automatically.
- Change the WhatsApp number in `whatsappNumber` using digits with country code. The WhatsApp action activates automatically.
- Change the pre-filled WhatsApp text in `whatsappMessage`. The visitor still presses Send inside WhatsApp.
- Change the address lines in `address`.
- Add verified opening hours to `openingHours` as `{ day, hours }` entries.
- Add an exact Google Maps place or directions URL to `googleMapsUrl`.
- Update `seoTitle` and `seoDescription` with factual copy.
- Add a real canonical origin as `NEXT_PUBLIC_SITE_URL` in Vercel when the domain is known. Until then, sitemap output intentionally stays empty instead of guessing a URL.

Unknown phone, WhatsApp, hours, and Maps details are visibly marked as configurable in the contact area rather than invented.

## Editing the menu

The full menu lives in `data/menu.ts`.

- Every item has `name`, `price`, `description`, `category`, `vegetarian`, and `image`.
- Set `featured: true` to surface an item in the “Featured from the menu” section.
- Use the existing category union for filter compatibility.
- Change a price once in this file and every menu presentation updates automatically.
- Add a new item by appending a new object to `menuItems`.

## Replacing images

The current image files in `public/images/` are local monochrome visual studies. They are intentionally labeled as replaceable visual studies rather than verified photographs of the café.

To use original café photography:

1. Add optimized JPG, PNG, or WebP files to `public/images/`.
2. Update the image paths in `data/gallery.ts` and `data/menu.ts`.
3. Update every `alt` and `caption` so it accurately describes the supplied image.
4. Replace the hero image path in `components/CafeSite.tsx`.

The gallery is data-driven and supports `image`, `alt`, `caption`, `category`, and `size`.

## Editing reviews

`data/reviews.ts` contains only the supplied rating summary and review themes. Add genuine excerpts only when you have the exact text and permission to publish it. Do not add invented names, quotations, or unsupported claims.

## Editing colors and typography

Update the CSS variables at the top of `app/globals.css`:

- `--ink`, `--paper`, `--chalk`, `--graphite`, and `--accent` define the palette.
- `--display` defines the editorial serif stack.
- `--ui` defines the interface/body stack.

The site uses a remote font import for Cormorant Garamond and DM Sans when available, with system fallbacks so the page remains readable without the font request.

## SEO files

- `app/layout.tsx` contains title, description, Open Graph, X card, keyword, and favicon metadata.
- `app/page.tsx` contains factual CafeOrCoffeeShop structured data.
- `app/sitemap.ts` and `app/robots.ts` use `NEXT_PUBLIC_SITE_URL` when configured.

## Environment variables

No secret or protected environment variable is required. Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
```

Use a real domain only after it is available. Do not use a placeholder URL in production metadata.

## Project structure

```text
app/                 Next.js routes, metadata, global CSS, sitemap, robots
components/          Page composition, menu, gallery lightbox, icon system
data/                Centralized site, menu, gallery, and review data
public/               Brand mark, favicon, social image, local visual studies
ideas.md              Approved Editorial Gallery Café design brief
README.md             This guide
```
