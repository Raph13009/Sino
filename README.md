# OPOPA Website

Production website for **OPOPA** — European market-entry and commercial partner for Chinese industrial and green-tech companies.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion-ready (restrained)
- Vercel-ready

## Source of truth

All positioning, services, IA, design and SEO decisions live in:

`/OPOPA_Website_Brief/`

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Key directories

- `src/app` — routes and pages
- `src/components` — layout, UI and section components
- `src/content` — services, industries, insights, media registry, navigation
- `src/lib` — SEO and site utilities
- `src/i18n` — localization-ready helpers (`/zh/` prepared)
- `public/brand` — optimized logo and favicon assets
- `public/images` — page photography
- `docs/MEDIA-INVENTORY.md` — media replacement inventory

## Environment

See `.env.example`. Required for contact form delivery:

```bash
RESEND_API_KEY=
```

Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://www.opopa-partners.com
RESEND_FROM_EMAIL=
CONTACT_NOTIFICATION_EMAIL=raphaellevy027@gmail.com
```

Setup details: `docs/CONTACT-FORM.md`.

## Notes

- Temporary contact: `raphaellevy027@gmail.com`
- Temporary LinkedIn: `https://www.linkedin.com/in/raphael-levy-london/`
- No public pricing.
- Do not invent proof, logos, testimonials or metrics.
- Placeholder media is centrally managed in `src/content/media.ts` and listed in `docs/MEDIA-INVENTORY.md`.
- Analytics / Search Console: Vercel Web Analytics loads in production. Search Console HTML verification is in `src/app/layout.tsx` (URL-prefix property only — Domain verification is DNS). GA4 is not shipped.
- Contact form delivery: native Server Action + Resend. Requires `RESEND_API_KEY` (see `docs/CONTACT-FORM.md`).
- Legal / privacy pages are placeholders pending review.

## Locales (English + Simplified Chinese)

Edit / review all website copy here:

- **English:** `src/content/locales/en.ts`
- **Simplified Chinese:** `src/content/locales/zh.ts`
- **Types / loader:** `src/content/locales/types.ts`, `src/content/locales/index.ts`
- **Structural catalog** (slugs, images, relations — not prose): `src/content/catalog.ts`
- **Routing helpers:** `src/i18n/config.ts`

English URLs have no prefix (`/services`). Chinese URLs use `/zh/...` (`/zh/services`).
The language switcher maps equivalent routes in both directions.
