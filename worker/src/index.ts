export default <ExportedHandler<Env>>{
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url)

      // Use prod as the origin when running as a preview on workers.dev
      if (url.hostname.endsWith("workers.dev")) {
        url.hostname = "workers.cloudflare.com"
      }

      const originalHost = url.host
      
      // Sanity API proxy endpoint
      if (url.pathname.startsWith("/api/sanity")) {
        if (!env.SANITY_TOKEN) {
          return new Response("Sanity token not configured", { status: 500 })
        }

        // Extract the query from the request body or URL params
        const query = url.searchParams.get("query")
        const params = url.searchParams.get("params")
        
        if (!query) {
          return new Response("Query parameter is required", { status: 400 })
        }

        // Construct the Sanity API URL
        const sanityUrl = new URL(
          `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2024-05-31/data/query/${env.SANITY_DATASET}`
        )
        sanityUrl.searchParams.set("query", query)
        if (params) {
          sanityUrl.searchParams.set("params", params)
        }

        // Make the request to Sanity with the token
        const sanityResponse = await fetch(sanityUrl.toString(), {
          headers: {
            "Authorization": `Bearer ${env.SANITY_TOKEN}`,
            "Content-Type": "application/json"
          }
        })

        // Return the response from Sanity with CORS headers
        const corsHeaders = {
          "Access-Control-Allow-Origin": origin || "https://workers.cloudflare.com",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, s-maxage=300"
        }

        // Handle preflight requests
        if (request.method === "OPTIONS") {
          return new Response(null, {
            status: 204,
            headers: corsHeaders
          })
        }

        return new Response(sanityResponse.body, {
          status: sanityResponse.status,
          headers: corsHeaders
        })
      }

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
