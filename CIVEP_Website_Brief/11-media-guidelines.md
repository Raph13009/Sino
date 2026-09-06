# Media Guidelines

## General rule

All placeholder images and videos must be stored locally in `/public`.

Do not use random external image URLs in production components.

Every media asset must have:
- a clear semantic filename
- a known page/section association
- alt text
- recommended aspect ratio
- replacement notes

## Folder structure

/public/images/hero
/public/images/services
/public/images/industries
/public/images/about
/public/images/insights
/public/images/team

/public/video/hero
/public/video/sections

## Naming convention

Examples:

hero-industrial-port.jpg
hero-manufacturing-china.jpg

service-market-entry.jpg
service-partner-network.jpg
service-sales-enablement.jpg
service-outsourced-sales.jpg

industry-industrial-equipment.jpg
industry-green-tech.jpg
industry-advanced-manufacturing.jpg
industry-mobility-infrastructure.jpg

about-china-europe.jpg

## Placeholder media

For V1, placeholder images/videos are acceptable.

They must:
- match the intended subject
- be easy to replace later
- never be hardcoded in multiple files
- be referenced through a centralized media configuration

## Central asset registry

Create a single file such as:

`/src/content/media.ts`

All page media references should be defined there.

Example:

export const media = {
  home: {
    hero: {
      src: "/images/hero/hero-industrial-port.jpg",
      alt: "Industrial port infrastructure in Europe",
      replacementNote: "Replace with final China-Europe industrial hero image"
    }
  }
}

## Replacement workflow

The goal is to make every placeholder asset easy to replace later.

When replacing an asset:
- update the path in `/src/content/media.ts`
- do not edit page components unless structurally necessary
- preserve the expected aspect ratio
- preserve alt text quality
- update `replacementNote` once the final asset is approved

## Image optimization

Use Next.js image optimization where appropriate.

Requirements:
- use `next/image` for local images when possible
- define width and height or use a stable aspect ratio
- avoid layout shift
- prefer WebP / AVIF when possible
- lazy-load below-the-fold images
- preload only critical hero media
- do not use oversized source images unnecessarily

## Video rules

If video is used:

- video must be muted if autoplaying
- no autoplay with sound
- always provide a poster image
- use `playsInline`
- avoid heavy background videos on mobile
- provide a static image fallback when appropriate
- compress video aggressively
- do not let video degrade Core Web Vitals

## Media inventory

Create and maintain a media inventory in:

`/docs/MEDIA-INVENTORY.md`

For every asset, list:

| ID | Page | Section | Current file | Type | Aspect ratio | Status | Replacement note |
|---|---|---|---|---|---|---|---|

Example:

| home-hero-01 | Home | Hero | `/images/hero/hero-industrial-port.jpg` | Image | 16:9 | Placeholder | Replace with final China-Europe industrial hero |