# CIVEP contact form

The contact form on `/contact` (and `/zh/contact`) submits on the CIVEP site through a Next.js Server Action. Visitors are never redirected to a third-party page. Email is sent with [Resend](https://resend.com).

## Required environment variable

| Name | Required | Where it is used | Notes |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | **Yes** | Server Action only (`src/lib/contact/email.ts`) | Never prefix with `NEXT_PUBLIC_`. Never expose it to the browser. |
| `RESEND_FROM_EMAIL` | No | Sender address | Leave unset until `civep.com` is verified. Defaults to Resend’s onboarding sender `CIVEP <beth.t@example.com>`. |
| `CONTACT_NOTIFICATION_EMAIL` | No | Internal notification recipient | Defaults to `raphaellevy027@gmail.com` (also `siteConfig.email`). |
| `NEXT_PUBLIC_SITE_URL` | No | Site metadata | Not used for mail delivery. |

Copy `.env.example` to `.env.local` for local development. `.env.local` is gitignored.

## Create a Resend account

1. Sign up at [https://resend.com/signup](https://resend.com/signup).
2. Open [API Keys](https://resend.com/api-keys).
3. Create a key with sending permission.
4. Store the value as `RESEND_API_KEY`. Do not commit it.

Until a domain is verified, Resend only allows sending from `beth.t@example.com`. This implementation uses that address by default so mail can be tested without claiming `contact@civep.com`.

## Add `RESEND_API_KEY`

### Local

Add the key to `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxx
```

Restart `npm run dev` after changing env files.

### Vercel

In the Vercel project:

1. Open **Settings → Environment Variables**.
2. Add `RESEND_API_KEY` for Production, Preview, and Development.
3. Mark it as sensitive.
4. Redeploy so the new variable is available.

Do not add `NEXT_PUBLIC_RESEND_API_KEY`.

You can also add it with the CLI:

```bash
printf '%s' 'your-key' | vercel env add RESEND_API_KEY production preview development --sensitive
```

## Verify the future CIVEP domain

When the production domain is ready:

1. In Resend, open **Domains** and add `civep.com`.
2. Add the DNS records Resend shows (SPF, DKIM, and any MX/verification records).
3. Wait until the domain status is verified.
4. Set the sender:

```bash
RESEND_FROM_EMAIL=CIVEP <contact@civep.com>
```

Add the same variable in Vercel, then redeploy.

Do not set `RESEND_FROM_EMAIL` to `contact@civep.com` before the domain is verified. Resend will reject unverified senders.

## Recipient configuration

Internal notifications currently go to:

`raphaellevy027@gmail.com`

Configured in this order:

1. `CONTACT_NOTIFICATION_EMAIL` if set
2. `siteConfig.email` in `src/lib/site.ts`

The notification subject is:

`New CIVEP enquiry — [Company name]`

The visitor also receives a short confirmation email. Replies to that confirmation go to the notification inbox.

## What the form sends

Server-side Zod validation covers:

- name
- company
- work email
- country
- industry (must match the published options)
- project / expansion need
- phone / WeChat, if provided

Spam controls:

- hidden honeypot field (`website`)
- in-memory rate limit (5 attempts / 15 minutes / IP)
- duplicate-submission guard for the same email + IP

Submitted field values are not sent to analytics.

## Test locally

1. Set `RESEND_API_KEY` in `.env.local`.
2. Run `npm run dev`.
3. Open `/contact`.
4. Submit empty required fields — inline field errors should appear and values should stay in the form.
5. Submit a valid enquiry using an inbox you can open.
6. Confirm:
   - the page stays on `/contact` and shows the success state
   - the notification email arrives at the CIVEP inbox
   - the confirmation email arrives at the visitor address
7. In browser DevTools → Network, confirm no request includes `RESEND_API_KEY`.

Without `RESEND_API_KEY`, validation still runs. Delivery returns the generic visitor error and logs a server-side message that the key is missing.

## Test on Vercel

1. Confirm `RESEND_API_KEY` is set for the target environment.
2. Deploy a Preview or Production build.
3. Submit the live `/contact` form.
4. Check Resend **Emails** (and **Logs**) for both messages.
5. Confirm the visitor is not redirected off the CIVEP domain.

## Code map

- UI: `src/components/contact/ContactForm.tsx`
- Server Action: `src/lib/contact/actions.ts`
- Validation: `src/lib/contact/schema.ts`
- Resend delivery: `src/lib/contact/email.ts`
- Sender / recipient config: `src/lib/contact/config.ts`
