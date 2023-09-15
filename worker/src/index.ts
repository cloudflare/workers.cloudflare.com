import redirects from "./redirects"

import { hydrateEdgeState } from "./edge_state"
import { bookmark, transformBookmark, unbookmark } from "./bookmark"

export default <ExportedHandler<Env>>{
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url)

      // Use prod as the origin when running as a preview on workers.dev
      if (url.hostname.endsWith("workers.dev")) {
        url.hostname = "workers.cloudflare.com"
      }

      for (const redirect of redirects) {
        if (url.pathname === redirect.path) {
          return Response.redirect(redirect.redirect, 302)
        }
      }

      const originalHost = url.host
      if (url.pathname.startsWith("/playground")) {
        url.hostname = "playground.devprod.cloudflare.dev"
        url.port = ""
        url.pathname = url.pathname.slice("/playground".length)
        const response = await fetch(url, request)
        const getSetCookie = response.headers.getSetCookie()
        if (getSetCookie) {
          const headers = new Headers(response.headers)
          headers.delete("Set-Cookie")
          getSetCookie.forEach((cook) => {
            headers.append(
              "Set-Cookie",
              cook.replace("playground.devprod.cloudflare.dev", originalHost)
            )
          })
          return new Response(response.body, { ...response, headers })
        }
        return new Response(response.body, response)
      }

      let path = url.pathname
      if (path.includes("docs")) {
        const newUrl = "https://developers.cloudflare.com/workers"
        path = path.replace("docs", "").replace("index.html", "")
        const newPath = newUrl + path
        console.log(`Redirecting to docs path: ${newPath}`)
        return Response.redirect(newPath)
      }

      if (request.method === "POST") {
        if (url.pathname.includes("/bookmark")) {
          return await bookmark(request, env.BUILT_WITH_WORKERS)
        }
        if (url.pathname.includes("/unbookmark")) {
          return await unbookmark(request, env.BUILT_WITH_WORKERS)
        }
      }

      try {
        const response = await fetch(url, request)
        const state = await transformBookmark(request, env.BUILT_WITH_WORKERS)
        return hydrateEdgeState({ response, state })
      } catch (e) {
        if (e instanceof Error) {
          return new Response(e.message ?? e.toString(), { status: 500 })
        } else {
          return new Response("Internal Error", { status: 500 })
        }
      }
    } catch {
      return new Response("Internal Error", { status: 500 })
    }
  },
}
