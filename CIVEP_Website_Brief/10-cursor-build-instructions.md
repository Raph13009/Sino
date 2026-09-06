# 10 — Cursor Build Instructions

## Source of truth

Before making any design or implementation decision, read all files in this folder.

Treat these documents as binding project context.

Do not invent business positioning, services, claims, design rules, SEO strategy, or information architecture when those topics are already documented.

## Build philosophy

This website is for a premium China → Europe industrial market-entry and commercial consulting firm.

It must NOT look like:
- a SaaS landing page
- an AI startup
- a crypto company
- a creative agency portfolio
- a generic shadcn template

## Implementation sequence

Do not build the entire website in one uncontrolled pass.

Build in this order:

1. Foundation
   - Next.js project structure
   - global styles
   - design tokens
   - typography
   - metadata utilities
   - language-ready routing

2. Global components
   - navigation
   - footer
   - CTA patterns
   - editorial section primitives

3. Homepage
   - complete and visually refine before expanding the system

4. Expertise index + service pages

5. Industries index + industry pages

6. Insights index + article template

7. About

8. Contact

9. Chinese routing infrastructure

10. SEO / structured-data audit

11. Performance / accessibility / mobile audit

## Design rules

- Prefer editorial layouts over card grids
- Use cards sparingly
- Avoid excessive border radius
- Avoid gradients unless explicitly included in the approved art direction
- Avoid generic icon grids
- Avoid unnecessary badges
- Avoid fake dashboards
- Avoid decorative charts with no business meaning
- Use industrial photography as a major visual asset
- Preserve whitespace and strong typographic hierarchy
- Motion must remain subtle

## Copy rules

Do not invent:
- case studies
- clients
- metrics
- testimonials
- offices
- partnerships
- team credentials

If content is missing, use an explicit TODO in the code rather than fabricating a claim.

## SEO rules

SEO requirements in `07-seo-strategy.md` are mandatory.

Every public page must be designed with search intent, metadata, internal linking and semantic HTML in mind.

## Quality gate

Before considering a page complete, verify:
- desktop
- tablet
- mobile
- accessibility
- metadata
- semantic headings
- image optimization
- performance
- no placeholder copy
- no generic SaaS visual patterns
