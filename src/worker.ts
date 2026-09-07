/**
 * Canonical host + path handling for Search Console.
 *
 * - HTTP / www → one-hop 301 to https://flatfeehomesexchange.com
 * - Same-host /index.html stays 200 (no redirect) so GSC does not flag
 *   "Page with redirect"
 * - /404.html, /404, /404/ return a real 404 (Cloudflare's html_handling
 *   otherwise 307s them into a soft-200)
 * - /sitemap.xml is rewritten to sitemap-index.xml at 200
 */
const CANONICAL_HOST = 'flatfeehomesexchange.com';

const NOT_FOUND_PATHS = new Set(['/404', '/404/', '/404.html']);

interface Env {
  ASSETS: Fetcher;
}

/** Collapse /index.html → / when building an off-host redirect target (one hop). */
function directoryPath(pathname: string): string {
  if (pathname === '/index.html' || pathname.endsWith('/index.html')) {
    const next = pathname.slice(0, -'index.html'.length);
    return next === '' ? '/' : next;
  }
  return pathname;
}

function canonicalLocation(url: URL): string | null {
  const host = url.hostname.toLowerCase();
  const needsHttps = url.protocol === 'http:';
  const needsApex =
    host === `www.${CANONICAL_HOST}` || host.endsWith('.workers.dev');

  if (!needsHttps && !needsApex && host === CANONICAL_HOST) {
    return null;
  }

  const pathname = directoryPath(url.pathname);
  return new URL(pathname + url.search, `https://${CANONICAL_HOST}`).toString();
}

async function fetchAsset(env: Env, request: Request, url: URL): Promise<Response> {
  // With html_handling=none, "/" does not auto-map to index.html.
  if (url.pathname === '/' || url.pathname === '') {
    return env.ASSETS.fetch(new URL('/index.html', url.origin));
  }
  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const location = canonicalLocation(url);
    if (location) {
      return Response.redirect(location, 301);
    }

    // Serve the 404 document with a real 404 — never 200 or a client redirect.
    if (NOT_FOUND_PATHS.has(url.pathname)) {
      const asset = await env.ASSETS.fetch(new URL('/404.html', url.origin));
      const headers = new Headers(asset.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(asset.body, {
        status: 404,
        statusText: 'Not Found',
        headers,
      });
    }

    // Common crawler target — serve at 200 (no redirect chain).
    if (url.pathname === '/sitemap.xml') {
      return env.ASSETS.fetch(new URL('/sitemap-index.xml', url.origin));
    }

    return fetchAsset(env, request, url);
  },
} satisfies ExportedHandler<Env>;
