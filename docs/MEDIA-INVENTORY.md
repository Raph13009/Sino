# Media Inventory

Central registry of visual assets used by the OPOPA website.

Source of truth for paths and alt text: `/src/content/media.ts`

| ID | Page | Section | Current file | Type | Aspect ratio | Status | Replacement note |
|---|---|---|---|---|---|---|---|
| brand-logo-light | global | brand | `/brand/opopa-logo-light.webp` (+ `.png`) | Image | 1200:403 | Final | Approved light-background logo lockup |
| brand-logo-dark | global | brand | `/brand/opopa-logo-dark.webp` (+ `.png`) | Image | 1200:403 | Final | Derived dark variant; preserve geometry and oxide-red |
| brand-mark-light | global | brand | `/brand/opopa-mark-light.png` | Image | 1:1 | Final | Compact monogram |
| brand-mark-dark | global | brand | `/brand/opopa-mark-dark.png` | Image | 1:1 | Final | Dark-surface monogram variant |
| brand-favicon | global | brand | `/brand/opopa-favicon.png` | Image | 1:1 | Final | Optimized favicon set also includes 16/32/ICO/apple-touch |
| home-hero-01 | Home | Hero | `/images/hero/hero-industrial-port.jpg` | Image | 3:2 | Placeholder | Replace with final China–Europe industrial hero |
| home-context-01 | Home | Context | `/images/hero/hero-manufacturing-floor.jpg` | Image | 16:10 | Placeholder | Replace with documentary manufacturing photography |
| service-sales-enablement | Services | Sales Enablement | `/images/services/service-sales-enablement.jpg` | Image | 3:2 | Placeholder | Replace with commercial training context photography |
| service-expert-partner-sourcing | Services | Expert & Partner Sourcing | `/images/services/service-expert-partner-sourcing.jpg` | Image | 3:2 | Placeholder | Replace with specialist / partner qualification photography |
| service-outsourced-sales | Services | Outsourced Sales | `/images/services/service-outsourced-sales.jpg` | Image | 3:2 | Placeholder | Replace with European sales representation photography |
| service-sales-ai-automation | Services | Sales AI & Automation | `/images/services/service-sales-ai-automation.jpg` | Image | 3:2 | Placeholder | Replace with restrained commercial-operations photography — avoid generic AI imagery |
| industry-industrial-equipment | Industries | Industrial Equipment | `/images/industries/industry-industrial-equipment.jpg` | Image | 3:2 | Placeholder | Replace with heavy machinery photography |
| industry-advanced-manufacturing | Industries | Advanced Manufacturing | `/images/industries/industry-advanced-manufacturing.jpg` | Image | 4:3 | Placeholder | Replace with advanced manufacturing photography |
| industry-green-technology | Industries | Green Technology | `/images/industries/industry-green-technology.jpg` | Image | 3:2 | Placeholder | Replace with green-tech / energy equipment photography |
| industry-mobility-infrastructure | Industries | Mobility & Infrastructure | `/images/industries/industry-mobility-infrastructure.jpg` | Image | 16:9 | Placeholder | Replace with mobility / infrastructure photography |
| about-main-01 | About | Hero | `/images/about/about-china-europe.jpg` | Image | 3:2 | Placeholder | Replace with China–Europe industrial context — no flags/clichés |
| team-max-marchesseau-laskar | About | Founders | `/images/team/profile-MM-2026.webp` (+ `.png`) | Image | 4:5 | Final | Founder portrait — Max Marchesseau Laskar |
| team-raphael-levy | About | Founders | `/images/team/profile-RL-2026.webp` (+ `.png`) | Image | 4:5 | Final | Founder portrait — Raphael Sacha Antoine Levy |
| insight-market-entry | Insights | Article | `/images/insights/insight-market-entry.jpg` | Image | 3:2 | Placeholder | Replace with article-specific industrial photography |
| insight-european-sales | Insights | Article | `/images/insights/insight-european-sales.jpg` | Image | 3:2 | Placeholder | Replace with article-specific industrial photography |
| insight-distributor-strategy | Insights | Article | `/images/insights/insight-distributor-strategy.jpg` | Image | 3:2 | Placeholder | Replace with logistics / distribution photography |

## Replacement workflow

1. Drop the new file into the matching `/public/images/...` path (or update the path in `media.ts`).
2. Preserve expected aspect ratio where possible.
3. Update alt text if the subject changes.
4. Set `status` to `final` and clear or revise `replacementNote`.
5. Update this inventory row.

## Notes

- Placeholder photography is locally stored Unsplash-sourced industrial imagery, lightly desaturated for brand fit.
- Do not hardcode media URLs in page components — use `/src/content/media.ts`.
- Brand logos were optimized from source PNGs; dark logo preserves oxide-red and converts ink elements to Warm Ivory.
