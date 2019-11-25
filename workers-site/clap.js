const generateHmac = async data => {
  const str2ab = str =>
    new Uint8Array(
      str.split("").map(function(char) {
        return char.charCodeAt(0)
      })
    )

  const secret = await BUILT_WITH_WORKERS.get("__HMAC_SECRET__")
  const key = await crypto.subtle.importKey(
    "raw",
    str2ab(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  )
  const sig = await crypto.subtle.sign({ name: "HMAC" }, key, str2ab(data))
  return btoa(String.fromCharCode.apply(null, new Uint8Array(sig)))
}

class EmbedClaps {
  constructor(project, clapped) {
    this._clapped = clapped
    this._project = project
  }

  element(element) {
    const clappedKey = `${this._project}_clapped`
    const script = {
      [clappedKey]: this._clapped,
    }
    element.setInnerContent(JSON.stringify(script))
  }
}

const pattern = /\/projects\/([\w|-]*)[\/]?/

const _processClapsForRequest = async request => {
  const url = new URL(request.url)
  const matches = url.pathname.match(pattern)
  const project = matches[1]
  const ip = request.headers.get("CF-Connecting-IP")
  const userAgent = request.headers.get("User-Agent")
  const ipKey = await generateHmac([ip, userAgent].join("-"))
  return BUILT_WITH_WORKERS.get(`projects:${project}:${ipKey}`)
}

const hydrate = async request => {
  const url = new URL(request.url)
  if (url.pathname.includes("/projects")) {
    const claps = await _processClapsForRequest(request)
    return new Response(JSON.stringify({ claps }), {
      headers: { "Content-type": "application/json" },
    })
  } else {
    return new Response(null, { status: 403 })
  }
}

const transformClap = async (request, response) => {
  try {
    const url = new URL(request.url)
    if (url.pathname.includes("/projects")) {
      const matches = url.pathname.match(pattern)
      const project = matches[1]
      const clapped = await _processClapsForRequest(request)
      const rewriter = new HTMLRewriter().on(
        "script#claps_json",
        new EmbedClaps(project, clapped ? true : false)
      )
      return rewriter.transform(response)
    } else {
      return response
    }
  } catch (err) {
    return new Response(err.toString())
  }
}

const clap = async request => {
  try {
    const url = new URL(request.url)
    const matches = url.pathname.match(pattern)
    const project = matches[1]

    const ip = request.headers.get("CF-Connecting-IP")
    const userAgent = request.headers.get("User-Agent")
    const ipKey = await generateHmac([ip, userAgent].join("-"))
    const kvKey = `projects:${project}:${ipKey}`

    const data = await BUILT_WITH_WORKERS.get(kvKey)
    if (data) {
      return new Response(null, { status: 304 })
    } else {
      await BUILT_WITH_WORKERS.put(kvKey, true)
      return new Response("OK", { status: 201 })
    }
  } catch (err) {
    console.error(err)
  }
}

const unclap = async request => {
  try {
    const url = new URL(request.url)
    const matches = url.pathname.match(pattern)
    const project = matches[1]
    const ip = request.headers.get("CF-Connecting-IP")
    const userAgent = request.headers.get("User-Agent")
    const ipKey = await generateHmac([ip, userAgent].join("-"))
    const kvKey = `projects:${project}:${ipKey}`
    await BUILT_WITH_WORKERS.delete(kvKey)
    return new Response("OK", { status: 204 })
  } catch (err) {
    console.error(err)
  }
}

export { clap, hydrate, transformClap, unclap }
