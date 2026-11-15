# Digital Marketing & Growth Strategy — Design Spec

**Date:** 2026-11-15  
**Status:** Approved for implementation (user: proceed without further questions)

## Goal

Add a peer service page under **Commercial development in Europe**, ordered after Sales AI & Automation, presenting OPOPA’s digital marketing, market research and growth capabilities.

## Placement

| Item | Value |
|------|--------|
| Slug | `digital-marketing` |
| URL | `/services/digital-marketing` (+ `/zh/...`) |
| Group | `access` |
| Order | Sales Representation → Sales AI → Digital Marketing |
| Homepage | Secondary card in access group (featured remains Sales Representation) |
| Nav | Own card via catalog |

## Page type

Dedicated `DigitalMarketingPage` component (not generic leaf), reusing OPOPA primitives.

## Sections

1. Hero — H1, accent subhead, body, CTA → contact, image  
2. Outcomes — three commercial objectives  
3. Services — seven offerings, grouped, restrained layout  
4. How we work — static 4-step process  
5. Approach — commercial strategy + digital execution  
6. Related services + Final CTA  

## SEO

- Primary: digital marketing strategy  
- Secondary: digital marketing consulting, digital customer acquisition, European market research, go-to-market strategy, e-commerce growth consulting  
- Title: `Digital Marketing & Growth Strategy in Europe | OPOPA`  
- Description: Market research, digital acquisition and e-commerce optimization…  
- Canonical/hreflang/OG/JSON-LD via existing helpers  

## Claim boundaries

- No ONSPRY name/logo  
- No invented results, ROAS, or sales growth claims  
- Informed by client research/plans; page states OPOPA capabilities only  

## Non-goals

- Homepage redesign, FAQ schema filler, pinned process scroller, new design tokens, production deploy  
