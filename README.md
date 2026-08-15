# Norka Solution — Website

Marketing site for Norka Solution, built with Next.js 16 (App Router), Tailwind CSS v4, next-intl (English/Arabic, RTL-aware), and Framer Motion.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [.env.example](.env.example) for the full list. In short:

| Variable | Required for | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | AI chat widget | [console.anthropic.com](https://console.anthropic.com) |
| `RESEND_API_KEY` | Contact form emails | [resend.com](https://resend.com) |
| `CONTACT_EMAIL` | Contact form recipient | defaults to `info@norkasolution.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp button | defaults to `971507257157` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | CMS (projects/services/testimonials) | see [Content / CMS](#content--cms) below |
| `NEXT_PUBLIC_SANITY_DATASET` | CMS | defaults to `production` |
| `SANITY_API_TOKEN` | CMS Studio + seed script | write-scoped token, see below |

Without these, the site still builds and runs — the chat widget and contact form will just fail at request time until keys are set, and content falls back to the local files described below until Sanity is configured.

## Project Structure

- `src/app/[locale]/` — localized pages (`en`/`ar`), routed via `src/proxy.ts` (next-intl middleware)
- `src/app/studio/` — embedded Sanity Studio (`/studio`), outside the localized route tree
- `src/components/` — UI components, split into `home/`, `layout/`, `ui/`, `portfolio/`
- `src/lib/data/` — local content fallback: `projects.ts`, `services.ts`, `testimonials.ts`
- `src/sanity/` — CMS schema, client, and the fallback-safe fetch layer (`lib/fetch-content.ts`)
- `src/messages/` — i18n strings (`en.json`, `ar.json`) — still the source of services copy until Sanity is configured

**Note:** `src/lib/data/projects.ts` and `testimonials.ts` currently contain placeholder/sample content (marked in code comments and in the UI as "Sample Work" / "Sample Testimonials"). Replace with real case studies and client reviews before launch — either by editing those files directly, or via Sanity once configured.

## Content / CMS

Projects, services (copy only), and testimonials can be edited from an embedded Sanity Studio instead of code. This is **fallback-safe**: with no Sanity project configured, the site reads `src/lib/data/*.ts` (and, for service copy, `src/messages/*.json`) exactly as before — nothing breaks. The moment a project ID is set, every page fetches from Sanity instead, automatically.

To set it up:

1. `npx sanity login` (or create a project at [manage.sanity.io](https://manage.sanity.io) if you'd rather not use the CLI)
2. `npx sanity init` — creates a Sanity project and dataset; note the **project ID** it prints
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=<a write-scoped token from manage.sanity.io → API → Tokens>
   ```
4. `npm run seed:sanity` — pushes the current local projects/services/testimonials into Sanity as starter documents (safe to re-run)
5. Restart the dev server, then visit `/en/studio` to edit content

Icon, accent color, and gradient for each service stay in `src/lib/data/services.ts` — those are design-system decisions, not content, so they're deliberately not editable from Studio (see the comment in `src/sanity/schemaTypes/service.ts` for why).

## Scripts

```bash
npm run dev          # start dev server (Turbopack)
npm run build        # production build
npm run start         # run the production build locally
npm run lint          # ESLint
npm run seed:sanity   # push local content into a connected Sanity dataset (see Content / CMS)
```

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `master` (or connect the repo in the Vercel dashboard) and set the environment variables above under Project Settings → Environment Variables.
