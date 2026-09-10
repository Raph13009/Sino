# 09 — Technical Requirements

## Recommended stack

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- shadcn/ui only where useful
- Motion / Framer Motion for restrained animation
- MDX or equivalent content system for Insights
- Vercel deployment

## Core principle

Build a content-first consulting website, not an application.

Prefer server-rendered/static content and minimal client-side JavaScript.

## Architecture

- reusable layout components
- reusable editorial content blocks
- service-page template
- industry-page template
- insight/article template
- language-ready routing
- structured metadata utilities
- structured data utilities

## Internationalization

The codebase must support:
- English as default
- Simplified Chinese as secondary language
- `/zh/` routes
- localized metadata
- future `hreflang`

Do not duplicate the entire codebase for each language.

## Content management

V1 can use local structured content / MDX.

Do not introduce a CMS unless there is a clear operational need.

The architecture should make future CMS migration possible.

## Forms

Contact form should support fields such as:
- Name
- Company
- Work email
- Country
- Industry
- Project / expansion need
- Phone / WeChat where relevant

Requirements:
- server-side validation
- spam protection
- accessible error handling
- clear success state
- privacy notice

## Performance

Target:
- excellent Lighthouse scores
- optimized fonts
- optimized images
- no unnecessary third-party scripts
- limited animation dependencies
- no large WebGL/3D experiences
- no autoplay background video unless performance is demonstrably acceptable

## Analytics

Use privacy-appropriate analytics.

Track meaningful business actions:
- contact form submission
- primary CTA clicks
- relevant service-page engagement

## Security / quality

- dependency hygiene
- no secrets committed to repo
- environment variables for integrations
- linting
- formatting
- type checking
- accessible components
