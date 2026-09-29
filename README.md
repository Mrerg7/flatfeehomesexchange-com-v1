# flatfeehomesexchange.com

Premium domain acquisition site for **flatfeehomesexchange.com**. Astro static output, Tailwind CSS 4, deployed as **Cloudflare Workers Static Assets** (free plan, assets + a small routing worker).

## Stack

- Astro (static)
- Tailwind CSS 4 via `@tailwindcss/vite`
- `@astrojs/sitemap`
- Cloudflare Images for the brand mark
- Open Graph, Twitter cards, canonical URLs, JSON-LD
- `robots.txt` + sitemap

## Price

Asking price is **on request** until you set a number:

```ts
// src/data/site.ts
export const ASKING_PRICE: number | null = null;
```

Use a whole dollar amount, for example `5500`, to print a Buy Now price and add `price` to the Product schema. Inquiries go to `sales@desertrich.com` and open the visitor’s mail app. This site does not charge a card.

## Local development

```bash
npm install
npm run dev
```

## Build and deploy (Cloudflare Workers, free plan)

```bash
npm run build
npm run deploy
```

`wrangler.toml` serves `./dist` and runs `src/worker.ts` first for canonical hosts, trailing slashes, sitemap aliasing, and security headers. No `@astrojs/cloudflare` adapter.

Production: https://flatfeehomesexchange.com

## Before a production deploy

1. Confirm `ASKING_PRICE` is the number you will honor, or leave it `null`.
2. Build locally and spot-check `/`, `/buy/`, `/guides/`, `/faq/`, `/contact/`.
3. Deploy during a quiet hour.
4. In Google Search Console, resubmit `https://flatfeehomesexchange.com/sitemap.xml`.
5. Watch the worker logs for a day. There is no third-party analytics tag in this build. Cloudflare Web Analytics can be pasted into `src/layouts/Layout.astro` if you want page counts.

## What this site is not

It is not a brokerage, a home-exchange product, or a marketplace of other people’s domains. The only name for sale is flatfeehomesexchange.com.
