/**
 * Canonical host + path handling for Search Console.
 *
 * - HTTP / www / workers.dev → one-hop 301 to https://flatfeehomesexchange.com
 * - Extensionless paths gain a trailing slash (one hop) so canonicals match
 * - Directory URLs map to index.html because html_handling is none
 * - /404.html, /404, /404/ return a real 404
 * - /sitemap.xml is served from sitemap-index.xml at 200
 */
const CANONICAL_HOST = "flatfeehomesexchange.com";

const NOT_FOUND_PATHS = new Set(["/404", "/404/", "/404.html"]);

interface Env {
  ASSETS: Fetcher;
}

function directoryPath(pathname: string): string {
  if (pathname === "/index.html" || pathname.endsWith("/index.html")) {
    const next = pathname.slice(0, -"index.html".length);
    return next === "" ? "/" : next;
  }
  return pathname;
}

function canonicalLocation(url: URL): string | null {
  const host = url.hostname.toLowerCase();
  const needsHttps = url.protocol === "http:";
  const needsApex = host === `www.${CANONICAL_HOST}` || host.endsWith(".workers.dev");

  if (!needsHttps && !needsApex && host === CANONICAL_HOST) {
    return null;
  }

  const pathname = directoryPath(url.pathname);
  return new URL(pathname + url.search, `https://${CANONICAL_HOST}`).toString();
}

function withHeaders(response: Response, pathname: string, status = response.status): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  if (pathname.startsWith("/_astro/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (pathname.endsWith(".html") || pathname === "/" || pathname.endsWith("/")) {
    headers.set("Cache-Control", "public, max-age=300, must-revalidate");
  }
  return new Response(response.body, {
    status,
    statusText: status === 404 ? "Not Found" : response.statusText,
    headers,
  });
}

async function fetchAsset(env: Env, request: Request, url: URL): Promise<Response> {
  let pathname = url.pathname;
  if (pathname === "/" || pathname === "") {
    pathname = "/index.html";
  } else if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }
  if (pathname !== url.pathname) {
    return env.ASSETS.fetch(new URL(pathname, url.origin));
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

    const bare =
      url.pathname !== "/" &&
      !url.pathname.endsWith("/") &&
      !url.pathname.includes(".");
    if (bare) {
      return Response.redirect(new URL(`${url.pathname}/${url.search}`, `https://${CANONICAL_HOST}`), 301);
    }

    if (NOT_FOUND_PATHS.has(url.pathname)) {
      const asset = await env.ASSETS.fetch(new URL("/404.html", url.origin));
      const headers = new Headers(asset.headers);
      headers.set("X-Robots-Tag", "noindex, nofollow");
      headers.set("X-Content-Type-Options", "nosniff");
      return new Response(asset.body, { status: 404, statusText: "Not Found", headers });
    }

    if (url.pathname === "/sitemap.xml") {
      const asset = await env.ASSETS.fetch(new URL("/sitemap-index.xml", url.origin));
      return withHeaders(asset, url.pathname);
    }

    const asset = await fetchAsset(env, request, url);
    if (asset.status === 404) {
      const notFound = await env.ASSETS.fetch(new URL("/404.html", url.origin));
      const headers = new Headers(notFound.headers);
      headers.set("X-Robots-Tag", "noindex, nofollow");
      headers.set("X-Content-Type-Options", "nosniff");
      return new Response(notFound.body, { status: 404, statusText: "Not Found", headers });
    }

    return withHeaders(asset, url.pathname);
  },
} satisfies ExportedHandler<Env>;
