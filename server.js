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
      const originalUrl = url.searchParams.get("url")
      if (!originalUrl) {
        return new Response("Missing url parameter", { status: 400 })
      }

      // Security: Validate URL to prevent SSRF attacks
      const ALLOWED_DOMAINS = ['cdn.sanity.io', 'sanity.io'];
      let parsedUrl;
      try {
        parsedUrl = new URL(originalUrl);
        // Only allow HTTPS URLs from Sanity domains
        if (parsedUrl.protocol !== 'https:') {
          return new Response("Only HTTPS URLs are allowed", { status: 403 });
        }
        const isAllowed = ALLOWED_DOMAINS.some(domain => 
          parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
        );
        if (!isAllowed) {
          return new Response("URL not allowed", { status: 403 });
        }
      } catch (error) {
        return new Response("Invalid URL", { status: 400 });
      }

      // Use cache with proper key
      const cache = caches.default;
      const cacheKey = new Request(originalUrl, { method: 'GET' });
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        // Add cache hit header
        const headers = new Headers(cachedResponse.headers);
        headers.set('X-Cache', 'HIT');
        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          headers
        });
      }

      // Fetch with timeout and error handling
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(originalUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'CloudflareWorkers-ImageProxy/1.0'
          }
        });
        
        clearTimeout(timeoutId);
        
        // Validate response
        if (!response.ok) {
          return new Response(`Upstream error: ${response.status}`, { 
            status: response.status 
          });
        }
        
        // Validate content type is an image
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
          return new Response("Invalid content type - only images are allowed", { 
            status: 400 
          });
        }
        
        // Add cache headers
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=86400'); // 24 hours
        headers.set('X-Cache', 'MISS');
        
        const newResponse = new Response(response.body, {
          status: response.status,
          headers
        });
        
        // Store in cache
        ctx.waitUntil(cache.put(cacheKey, newResponse.clone()));
        
        return newResponse;
      } catch (error) {
        console.error('Image proxy error:', error);
        if (error.name === 'AbortError') {
          return new Response("Request timeout", { status: 504 });
        }
        return new Response("Proxy error", { status: 500 });
      }
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
