import { getAssetFromKV, mapRequestToAsset } from "@cloudflare/kv-asset-handler"

import { hydrateEdgeState } from "./edge_state"
import { clap, transformClap, unclap, hydrate } from "./clap"

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener("fetch", event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      )
    }
    event.respondWith(new Response("Internal Error", { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  if (event.request.method === "POST") {
    if (url.pathname.includes("/clap")) {
      return await clap(event.request)
    }
    if (url.pathname.includes("/unclap")) {
      return await unclap(event.request)
    }
  }

  if (url.pathname.includes("/_hydrate")) {
    return await hydrate(event.request)
  }

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    }
    return hydrateEdgeState({
      response: getAssetFromKV(event, options),
      state: transformClap(event.request),
    })
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}
