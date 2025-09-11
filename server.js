import { createRequestHandler } from "@remix-run/cloudflare";
import * as remixBuild from "./build/server";

const handleRemixRequest = createRequestHandler(remixBuild);

const redirects = {
  '/docs': 'https://developers.cloudflare.com/workers'
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (redirects[url.pathname]) {
      return Response.redirect(redirects[url.pathname])
    }

    // Try to serve static assets first using Workers Assets
    if (env.ASSETS) {
      try {
        const asset = await env.ASSETS.fetch(request);
        if (asset.status !== 404) {
          // Set appropriate cache headers
          const headers = new Headers(asset.headers);
          const ttl = url.pathname.startsWith("/assets/")
            ? 60 * 60 * 24 * 365 // 1 year for assets
            : 60 * 5; // 5 minutes for other files
          headers.set('Cache-Control', `public, max-age=${ttl}`);
          return new Response(asset.body, {
            status: asset.status,
            headers
          });
        }
      } catch (error) {
        // Asset not found, continue to Remix handler
      }
    }

    if (url.pathname.startsWith("/api/v1/image-proxy")) {
      const url = new URL(request.url)
      const originalUrl = url.searchParams.get("url")
      if (!originalUrl) {
        return new Response("Missing url", { status: 400 })
      }

      let cache = caches.default
      const cacheKey = originalUrl
      const cachedResponse = await cache.match(cacheKey)
      if (cachedResponse) {
        return cachedResponse
      }

      const response = await fetch(originalUrl, request)
      cache.put(cacheKey, response.clone())
      return response
    }


    // Handle with Remix
    try {
      const loadContext = {
        cloudflare: {
          // This object matches the return value from Wrangler's
          // `getPlatformProxy` used during development via Remix's
          // `cloudflareDevProxyVitePlugin`:
          // https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy
          cf: request.cf,
          ctx: {
            waitUntil: ctx.waitUntil,
            passThroughOnException: ctx.passThroughOnException,
          },
          caches,
          env,
        },
        // Pass env directly for access to SANITY_TOKEN
        env,
      };
      return await handleRemixRequest(request, loadContext);
    } catch (error) {
      console.log(error);
      return new Response(error.toString(), { status: 500 });
    }
  },
};
