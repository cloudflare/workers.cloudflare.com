import redirector from "lilredirector"
import redirects from "./redirects"

import { hydrateEdgeState } from "./edge_state"
import { bookmark, transformBookmark, unbookmark } from "./bookmark"

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

  const { response: redirectResponse } = await redirector(event, redirects)
  if (redirectResponse) return redirectResponse

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
