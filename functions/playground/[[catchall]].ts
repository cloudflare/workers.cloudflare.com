export const onRequest: PagesFunction<{}> = async (context) => {
  const url = new URL(context.request.url)
  const originalHost = url.host
  url.hostname = "playground.devprod.cloudflare.dev"
  url.port = ""
  url.pathname = url.pathname.slice("/playground".length)

  const response = await fetch(url, context.request)
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
