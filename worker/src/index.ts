export default <ExportedHandler<Env>>{
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url)

      // Use prod as the origin when running as a preview on workers.dev
      if (url.hostname.endsWith("workers.dev")) {
        url.hostname = "workers.cloudflare.com"
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
    } catch {
      return new Response("Internal Error", { status: 500 })
    }
  },
}
