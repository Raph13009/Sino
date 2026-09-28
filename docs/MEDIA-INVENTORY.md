# Media Inventory

Central registry of visual assets used by the OPOPA website.

Source of truth for paths and alt text: `/src/content/media.ts`  
Localized alt text: `dict.mediaAlts` in `/src/content/locales/{en,zh}.ts`

Full-resolution photo sources (not deployed): `/image-sources/` (gitignored).  
Next.js Image already serves AVIF/WebP variants from WebP sources via `images.formats`.

| ID | Page | Section | Current file | Type | Aspect ratio | Status | Replacement note |
|---|---|---|---|---|---|---|---|
| brand-logo-light | global | brand | `/brand/logo-light.webp` (+ `.png` source) | Image | 400:107 | Final | Light-surface lockup (navy + red, transparent) |
| brand-logo-dark | global | brand | `/brand/logo-dark.webp` (+ `.png` source) | Image | 400:113 | Final | Dark-surface lockup (white + red, transparent) |
| brand-mark | global | brand | `/brand/mark.webp` (+ `.png` source) | Image | 1:1 | Final | Architectural monogram |
| brand-favicon | global | brand | `/brand/favicon.png` | Image | 1:1 | Final | Source mark. Public crawl URLs: `/favicon.ico`, `/icon.png`, `/favicon-192.png`, `/apple-touch-icon.png` |
| brand-plaquette | global | brand | `/brand/plaquette.webp` | Image | 1122:1402 | Final | Brand direction reference board |
| home-hero-01 | Home | Hero | `/images/hero/hero-factory-visit.webp` | Image | 2400:1382 | Final | Factory visit photograph — Max & Raphael |
| home-context-01 | Home | Context | `/images/raph_industrial_visite/home-context.webp` | Image | 1920:888 | Final | Factory visit photograph |
| service-sales-enablement | Services | Legal and Regulatory Support (reused photograph) | `/images/services/service-sales-enablement.webp` | Image | 3:2 | Placeholder | Filename kept. Do not treat the old service name as current. |
| service-expert-partner-sourcing | Services | European Experts and Partners | `/images/services/service-expert-partner-sourcing.webp` | Image | 3:2 | Placeholder | Replace with specialist / partner qualification photography |
| service-outsourced-sales | Services | European Sales Representation | `/images/services/service-outsourced-sales.webp` | Image | 3:2 | Placeholder | Replace with European sales representation photography |
| service-market-entry | Services | European Market Entry | `/images/raph_industrial_visite/service-market-entry.webp` | Image | 1920:987 | Final | Factory visit photograph |
| service-market-entry-map | Services | European Market Entry | `/images/services/map-china-to-eu.webp` | Image | 1672:941 | Final | China–Europe route map banner |
| service-sales-ai-automation | Services | Sales AI and Automation | `/images/services/service-sales-ai-automation.webp` | Image | 3:2 | Placeholder | Replace with restrained commercial-operations photography — avoid generic AI imagery |
| industry-industrial-equipment | Industries | Industrial Equipment | `/images/industries/industry-industrial-equipment.webp` | Image | 3:2 | Placeholder | Replace with heavy machinery photography |
| industry-advanced-manufacturing | Industries | Advanced Manufacturing | `/images/industries/industry-advanced-manufacturing.webp` | Image | 4:3 | Placeholder | Replace with advanced manufacturing photography |
| industry-green-technology | Industries | Green Technology | `/images/industries/industry-green-technology.webp` | Image | 3:2 | Placeholder | Replace with green-tech / energy equipment photography |
| industry-mobility-infrastructure | Industries | Mobility & Infrastructure | `/images/industries/industry-mobility-infrastructure.webp` | Image | 16:9 | Placeholder | Replace with mobility / infrastructure photography |
| about-main-01 | About | Hero | `/images/about/about-china-europe.webp` | Image | 3:2 | Placeholder | Replace with China–Europe industrial context — no flags/clichés |
| team-max-marchesseau-laskar | About | Founders | `/images/team/profile-MM-2026.webp` | Image | 4:5 | Final | Founder portrait — Max Marchesseau Laskar |
| team-raphael-levy | About | Founders | `/images/team/profile-RL-2026.webp` | Image | 4:5 | Final | Founder portrait — Raphael Sacha Antoine Levy |
| insight-market-entry | Insights | Article | `/images/insights/insight-market-entry.webp` | Image | 3:2 | Placeholder | Replace with article-specific industrial photography |
| insight-european-sales | Insights | Article | `/images/insights/insight-european-sales.webp` | Image | 3:2 | Placeholder | Replace with article-specific industrial photography |
| insight-distributor-strategy | Insights | Article | `/images/insights/insight-distributor-strategy.webp` | Image | 3:2 | Placeholder | Replace with logistics / distribution photography |

## Replacement workflow

1. Drop the new file into the matching `/public/images/...` path (or update the path in `media.ts`).
2. Preserve expected aspect ratio where possible.
3. Update English alt in `media.ts` and both locale `mediaAlts` entries if the subject changes.
4. Set `status` to `final` and clear or revise `replacementNote`.
5. Update this inventory row.

## Notes

- Placeholder photography is locally stored Unsplash-sourced industrial imagery, lightly desaturated for brand fit.
- Do not hardcode media URLs in page components — use `/src/content/media.ts`.
- Brand logos stay as transparent WebP/PNG (not photographic AVIF). Favicons remain PNG/ICO.
- Photographic sources are optimized WebP; Next.js Image negotiates AVIF/WebP at request time.
