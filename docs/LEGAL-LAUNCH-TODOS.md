# Legal launch TODOs

Outstanding items before treating `/legal` and `/privacy` as final.

## Confirmed

- Business / brand name: **CIVEP**
- Status: French individual entrepreneur / micro-entrepreneur
- SIRET: **92011864300021**
- Temporary contact email: **raphaellevy027@gmail.com**
- Activity: European market-entry, commercial advisory and outsourced sales for Chinese industrial and green-tech companies
- Analytics: **not active** (no Google Analytics / Search Console configured yet)

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
