import redirector from 'lilredirector'
import redirects from './redirects'

import { hydrateEdgeState } from "./edge_state"
import { bookmark, transformBookmark, unbookmark } from "./bookmark"

const DEBUG = false

addEventListener("fetch", (event) => {
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

  const { response: redirectResponse } = await redirector(event, redirects)
  if (redirectResponse) return redirectResponse

  const originalHost = url.host
  if (url.pathname.startsWith("/playground")) {
    url.host = "playground.devprod.cloudflare.dev"
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

  if (event.request.method === "POST") {
    if (url.pathname.includes("/bookmark")) {
      return await bookmark(event.request)
    }
    if (url.pathname.includes("/unbookmark")) {
      return await unbookmark(event.request)
    }
  }

  try {
    const response = await fetch(url)
    const state = await transformBookmark(event.request)
    return hydrateEdgeState({ response, state })
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 })
  }
}
