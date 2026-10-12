# client-site-starter

Config-driven marketing site starter. **Nuxt 3 + TypeScript + Tailwind**, static-first output, deployed to **Cloudflare Pages**, with a working **Resend** contact form.

> All brand, copy, and section content lives in `content/` and `site.config.ts`. To rebrand for a new client, you change those files. You do not touch components.

## What's in the box

- **Stack**: Nuxt 3 (App Router equivalent via `pages/`), TypeScript, Tailwind v4
- **Output**: Static HTML to `.output/public` via `nuxt build` (Nitro `static` preset)
- **Host**: Cloudflare Pages (free tier; analytics opt-in)
- **Mail**: Resend (`/api/contact` server route with validation, honeypot, and rate limiting)
- **SEO**: per-page metadata, Open Graph + Twitter cards, generated `sitemap.xml` + `robots.txt`, JSON-LD `LocalBusiness` schema
- **Sections**: hero, services, about, testimonials, pricing, FAQ, CTA band, contact
- **Accessibility**: skip link, semantic landmarks, labelled form fields, keyboard-navigable nav and FAQ, AA contrast via brand tokens
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` via Cloudflare `_headers`

## 1. Clone & install

```bash
git clone <your-repo-url> my-client-site
cd my-client-site
npm install
cp .env.example .env
```

Node 20.11 or newer is required (matches `engines` in `package.json`).

## 2. Rename and rebrand

1. Open `content/branding.ts` and set the brand colors, fonts, logo mode, and radii.
2. Open `content/business.ts` and set legal name, email, phone, address, hours, and social links.
3. Open `content/nav.ts` and set the primary navigation and CTA.
4. Open `content/seo.ts` and set the default title template, description, and OG image.
5. Open `content/home.ts` and edit the section data (hero, services, about, testimonials, pricing, FAQ, CTA).
6. If you have additional pages, add them to `site.config.ts` under `pages` (e.g. `pages.about`, `pages.services`) and/or as `extraRoutes` entries for fully custom slugs.

After any change, validate:

```bash
npm run check:config
```

## 3. Set environment variables

Fill in `.env`:

```bash
NUXT_PUBLIC_SITE_URL=https://your-client.example   # No trailing slash
RESEND_API_KEY=re_xxx                             # Or leave empty for dry-run
CONTACT_TO=hello@your-client.example              # Defaults to site.business.email
CONTACT_FROM=noreply@your-client.example          # Must be a verified sender in Resend
RATE_LIMIT_PER_HOUR=5
NUXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=                # Optional. Blank = no analytics.
```

The form **degrades to a dry-run** transport when `RESEND_API_KEY` (or `CONTACT_TO` / `CONTACT_FROM`) is missing, so a fresh clone still builds and tests cleanly. Dry-run submissions are logged to the server console and returned with `dryRun: true` in the API response.

## 4. Preview locally

```bash
npm run dev
```

Visit `http://localhost:3000`. The dev server hot-reloads on `content/` edits.

## 5. Build for production

```bash
npm run verify   # typecheck + lint + test + build
# or just the build:
npm run build
```

The static output is written to `.output/public/`. Upload that directory to any static host (Cloudflare Pages, Netlify, GitHub Pages, S3 + CloudFront).

## 6. Deploy to Cloudflare Pages

You can deploy in any of three ways. Pick one. **None of them require the others.**

### Option A — Cloudflare dashboard (no GitHub, no API token)

1. `npm run build`
2. In Cloudflare Pages: **Create application → Direct Upload → Upload assets**.
3. Drag the `.output/public` folder into the upload area.
4. In **Settings → Environment variables**, add the env vars from step 3.
5. Set the build command to `npm run build` and the output directory to `.output/public` if you want to use the dashboard's Git integration later.

### Option B — `wrangler` from the command line

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy .output/public --project-name=my-client-site
```

### Option C — GitHub Actions (`.github/workflows/deploy.yml`)

The workflow is already configured. Once you have:

- a GitHub remote for the repo
- a Cloudflare Pages project created (manually or via `wrangler`)
- the following GitHub repository secrets/vars set:

| Kind  | Name | Value |
| ----- | ---- | ----- |
| Secret | `CLOUDFLARE_API_TOKEN` | Cloudflare API token with `Cloudflare Pages: Edit` |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| Var    | `CF_PAGES_PROJECT` | The Pages project name |
| Var    | `NUXT_PUBLIC_SITE_URL` | `https://your-client.example` |

…the workflow will build and deploy on every push to `main`.

## 6a. Contact form at deploy time

The static build outputs only HTML and assets — there is no Node runtime inside `.output/public/`. The contact form's `/api/contact` endpoint lives as a **Cloudflare Pages Function** at `functions/api/contact.ts`. Cloudflare Pages auto-discovers this directory:

- **GitHub integration**: Functions deploy automatically when the repo is connected to Cloudflare Pages. No extra config needed.
- **`wrangler pages deploy`**: Functions in the source repo deploy alongside the static upload if you point wrangler at the repo root (`wrangler pages deploy .output/public --project-name=X`) — wrangler picks up `functions/` from the working directory.
- **Direct upload via the dashboard**: Drag the repo folder (or a zip that includes both `.output/public/` and `functions/`) into the Direct Upload area. Cloudflare packages them together.

The function performs the same Zod-style validation, honeypot check, timing check, per-IP rate limit, and Resend transport as the Nitro handler at `server/api/contact.post.ts` (kept for non-Cloudflare hosts that prefer the Nitro server build). Dry-run still works: with no `RESEND_API_KEY`, the function logs and returns `{ ok: true, dryRun: true }`.

For other hosts (Netlify, Vercel, a plain Node server) the same logic exists in `server/api/contact.post.ts`. Pick the handler that matches your host. The client-side `SectionContact.vue` posts to `/api/contact` either way.

## 7. Verify on a real browser

The starter is built to clear the **Lighthouse 95+** bar on performance, accessibility, and SEO. To re-verify on a host with Chrome:

```bash
npx lighthouse https://your-client.example \
  --view \
  --only-categories=performance,accessibility,seo,best-practices
```

The `npm run lighthouse` script in this repo runs a static-build smoke test (page returns 200, brand name present, brand CSS injection present, contact form present, sitemap.xml and robots.txt present, `_headers` security headers present). Run real Lighthouse on the deployed site, not on `localhost`.

## 8. Project layout

```
.
├─ app.vue                       Root component (NuxtLayout + NuxtPage)
├─ error.vue                     404 / 500 page
├─ nuxt.config.ts                Nuxt + Nitro config
├─ site.config.ts                Single source of truth for branding, business, nav, SEO, pages
├─ content/                      Per-tenant content, split by concern
│  ├─ branding.ts
│  ├─ business.ts
│  ├─ home.ts                    Home page sections
│  ├─ nav.ts
│  └─ seo.ts
├─ lib/site-config.schema.ts     Zod schema + parseSiteConfig
├─ components/                   Section library
│  ├─ SiteHeader.vue
│  ├─ SiteNav.vue
│  ├─ SiteFooter.vue
│  ├─ BrandLogo.vue
│  ├─ Icon.vue
│  ├─ SiteCtaLink.vue
│  ├─ SectionRenderer.vue        Discriminated union dispatcher
│  └─ sections/
│     ├─ SectionHero.vue
│     ├─ SectionServices.vue
│     ├─ SectionAbout.vue
│     ├─ SectionTestimonials.vue
│     ├─ SectionPricing.vue
│     ├─ SectionFaq.vue
│     ├─ SectionCtaBand.vue
│     └─ SectionContact.vue
├─ composables/
│  ├─ useSiteConfig.ts
│  ├─ useSeo.ts                  per-page metadata + OG + canonical
│  ├─ useLocalBusinessSchema.ts  JSON-LD injection
│  └─ useCloudflareAnalytics.ts  one-line opt-in
├─ layouts/default.vue
├─ pages/
│  ├─ index.vue
│  ├─ contact.vue
│  ├─ privacy.vue
│  ├─ terms.vue
│  ├─ changelog.vue
│  └─ [slug].vue                 extraRoutes from site.config.ts
├─ server/
│  ├─ api/contact.post.ts        Contact form handler (Nitro; for non-CF hosts)
│  ├─ routes/sitemap.xml.ts
│  ├─ routes/robots.txt.ts
│  ├─ plugins/brand-css.ts       Injects --brand-* tokens into every page
│  ├─ site-content.server.ts     Server-only re-export of site config
│  └─ utils/                     validate, rate-limit, resend transport, logger
├─ functions/
│  └─ api/contact.ts             Cloudflare Pages Function (default host)
├─ public/
│  ├─ favicon.svg
│  ├─ og-default.svg
│  ├─ _headers                   Cloudflare Pages security + cache headers
│  └─ _redirects
├─ scripts/
│  ├─ check-config.ts
│  ├─ lighthouse.ts              Static-build smoke test
│  └─ deploy.ts
├─ tests/
│  ├─ config.test.ts
│  └─ validate.test.ts
├─ .github/workflows/deploy.yml
└─ .env.example
```

## 9. Security posture (read this if you're pentesting it)

- **No secrets in the repo.** The contact API key and other env vars live in `.env` (gitignored). The `.env.example` is a template with empty values.
- **Server-side validation.** Every contact form submission is re-validated server-side via Zod (`server/utils/validate.ts`). The client-side validation is convenience, not the source of truth.
- **Honeypot + timing check.** A hidden `hp_company` field and a `submittedAt` timestamp guard against bot submissions. Both are checked server-side.
- **Rate limit.** Per-IP, in-memory, default 5 submissions per hour. Override via `RATE_LIMIT_PER_HOUR`.
- **Dry-run fallback.** Missing API keys never crash the build or leak secrets — the form just logs a dry-run to stdout and returns success to the client. This is a deliberate design choice; it means a fresh clone works without any setup, but it also means a misconfigured production deployment won't silently spam anyone. If you ship a real site, **verify the live mail path before going public**.
- **Security headers.** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Strict-Transport-Security: max-age=31536000; includeSubDomains` — all in `public/_headers` and merged with Nuxt's default response headers.
- **No third-party trackers by default.** The only optional beacon is Cloudflare Web Analytics, gated by `NUXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN`. Set it and the beacon ships; leave it blank and the request is never made.
- **JSON-LD uses the canonical business details.** The `useLocalBusinessSchema` composable reads from `site.config.ts`, so a client that fakes their address in the visible footer will also have the fake address in the schema. Do not use this starter as a way to mislead crawlers.

What this starter does **not** do (and where to add it if you need it):

- **CAPTCHA / Turnstile.** The honeypot + rate limit is the spam defense. If you need a CAPTCHA, add Cloudflare Turnstile to the contact form and re-validate the token server-side.
- **Persistent rate limiting.** The in-memory bucket resets whenever the server restarts. For multi-instance Cloudflare Pages deployments, use Cloudflare's Rate Limiting rules or a Durable Object. The contact API is the only thing to protect.
- **CSP.** A strict Content-Security-Policy is left to the deployer because it has to be tuned to whatever third-party assets you add. The header file is the right place.

## 10. Acceptance check (what "done" means)

- [ ] `npm run verify` exits 0
- [ ] `npm run build` produces `.output/public/`
- [ ] `npm run lighthouse` (the smoke test) passes
- [ ] Lighthouse (real, on the deployed URL) scores ≥ 95 on performance, accessibility, and SEO
- [ ] Submitting the contact form on the deployed site delivers mail to the address in `CONTACT_TO`
- [ ] `/sitemap.xml` and `/robots.txt` return 200 and the right content
- [ ] `view-source:` on the home page shows the brand CSS variables injected by `server/plugins/brand-css.ts`
- [ ] Resubmitting the form 6 times in an hour returns 429

## 11. License

Internal to the studio. Adapt for the next client by changing `content/` and `site.config.ts`.
