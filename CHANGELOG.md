# Changelog

## 2026-09-29

- Replaced the image-only placeholder with a domain acquisition site for flatfeehomesexchange.com.
- Added title, description, canonical, Open Graph, and Twitter cards on every page.
- Added JSON-LD for Organization, WebSite, Product/Offer, FAQPage, Article, and breadcrumbs.
- Added pages: how to buy, guides, FAQ, contact, privacy.
- Asking price stays “on request” until `ASKING_PRICE` is set in `src/data/site.ts`.
- Kept Cloudflare Workers static assets. Worker now maps directory URLs, redirects bare paths to the trailing-slash canonical, and sends security headers.
- Preserved the Google site verification meta tag and apex/www canonical redirects.
- No fabricated testimonials, viewer counts, or countdown discounts.
- No analytics tag installed. Button events stay in the visitor’s browser (`dataLayer` if you add a tag later).

## Earlier

- Atmospheric single-image page with an inquire link.
