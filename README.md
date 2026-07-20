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

Without these, the site still builds and runs — the chat widget and contact form will just fail at request time until keys are set.

## Project Structure

- `src/app/[locale]/` — localized pages (`en`/`ar`), routed via `src/proxy.ts` (next-intl middleware)
- `src/components/` — UI components, split into `home/`, `layout/`, `ui/`, `portfolio/`
- `src/lib/data/` — editable content: `projects.ts`, `services.ts`, `testimonials.ts`
- `src/messages/` — i18n strings (`en.json`, `ar.json`)

**Note:** `src/lib/data/projects.ts` and `testimonials.ts` currently contain placeholder/sample content (marked in code comments and in the UI as "Sample Work" / "Sample Testimonials"). Replace with real case studies and client reviews before launch.

## Scripts

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # run the production build locally
npm run lint     # ESLint
```

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `master` (or connect the repo in the Vercel dashboard) and set the environment variables above under Project Settings → Environment Variables.
