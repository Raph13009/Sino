# Legal launch TODOs

Outstanding items before treating `/legal` and `/privacy` as final.

## Confirmed

- Business / brand name: **OPOPA**
- Status: French individual entrepreneur / micro-entrepreneur
- SIRET: **92011864300021**
- Temporary contact email: **raphaellevy027@gmail.com**
- Activity: European market-entry, commercial advisory and outsourced sales for Chinese industrial and green-tech companies
- Analytics: **Vercel Web Analytics** is mounted in production (`@vercel/analytics`). It is cookieless. **Google Analytics 4 is not shipped.** The privacy policy still says third-party analytics requiring consent are not used — counsel should decide whether Vercel Analytics needs to be named.
- Search Console: HTML meta verification is in `src/app/layout.tsx`. That can verify a **URL-prefix** property. A **Domain** property still requires DNS.
- Contact form email delivery: **Resend** (see `docs/CONTACT-FORM.md`)

## Must complete

- [ ] Full legal name of the operator (Legal Notice + Privacy Policy)
- [ ] Professional / registered business address
- [ ] Publication director (usually the same legal name for a sole trader)
- [ ] Confirmed hosting provider legal name
- [ ] Confirmed hosting provider registered address
- [ ] Optional counsel review of both pages before launch

## After analytics / tracking is added

- [ ] Update Privacy Policy “Analytics and cookies” section
- [ ] Document consent mechanism if required
- [ ] Document international transfer safeguards for new processors

## Source of truth in code

- Content: `src/content/locales/en.ts` and `src/content/locales/zh.ts` (`legal`, `privacy`)
- Shared SIRET / email: `src/lib/site.ts`
