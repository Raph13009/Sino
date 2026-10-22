# Legal launch TODOs

Outstanding items before treating `/legal` and `/privacy` as final.

## Confirmed

- Business / brand name: **OPOPA**
- Status: French individual entrepreneur / micro-entrepreneur
- SIRET: **92011864300021**
- Contact email: **contact@opopa-partners.com**
- Activity: European market-entry, commercial advisory and outsourced sales for Chinese industrial and green-tech companies
- Analytics: **Vercel Web Analytics** (cookieless) + optional **GA4** via `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Production only). GA4 uses Consent Mode v2 + site banner; inactive when the env var is unset. Privacy “Analytics and cookies” names both tools.
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

- [x] Update Privacy Policy “Analytics and cookies” section (EN/ZH)
- [x] Consent Mode v2 + cookie banner when GA4 Measurement ID is set
- [x] Document international transfers for Google Analytics in privacy copy
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel Production once the GA4 web stream exists
- [ ] Optional counsel review of analytics wording

## Source of truth in code

- Content: `src/content/locales/en.ts` and `src/content/locales/zh.ts` (`legal`, `privacy`)
- Shared SIRET / email: `src/lib/site.ts`
