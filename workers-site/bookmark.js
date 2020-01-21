import mime from "mime"

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

const pattern = /\/projects\/([\w|-]*)[\/]?/

const _generateKey = async request => {
  const url = new URL(request.url)
  const matches = url.pathname.match(pattern)
  const project = matches[1]
  const ip = request.headers.get("CF-Connecting-IP")
  const userAgent = request.headers.get("User-Agent")
  const ipKey = await generateHmac([ip, userAgent].join("-"))
  const kvKey = `projects:${project}:${ipKey}`
  return {
    kvKey,
    project,
  }
}

const _processBookmarksForRequest = async request => {
  const { kvKey, project } = await _generateKey(request)
  return {
    [`${project}_bookmarked`]: await BUILT_WITH_WORKERS.get(kvKey),
  }
}

const shouldProcess = url => {
  const mimeType = mime.getType(url.pathname)
  const projectUrl = url.pathname.includes("/projects")
  return !mimeType && projectUrl
}

const hydrate = async request => {
  const url = new URL(request.url)
  if (shouldProcess(url)) {
    const bookmarks = await _processBookmarksForRequest(request)
    return new Response(JSON.stringify({ bookmarks }), {
      headers: { "Content-type": "application/json" },
    })
  } else {
    return new Response(null, { status: 403 })
  }
}

const transformBookmark = async request => {
  const url = new URL(request.url)
  if (shouldProcess(url)) {
    return _processBookmarksForRequest(request)
  }
  return new Promise(r => r(null))
}

const bookmark = async request => {
  const { kvKey } = await _generateKey(request)
  const data = await BUILT_WITH_WORKERS.get(kvKey)

  if (data) {
    return new Response(null, { status: 304 })
  } else {
    await BUILT_WITH_WORKERS.put(kvKey, true)
    return new Response("OK", { status: 201 })
  }
}

const unbookmark = async request => {
  const { kvKey } = await _generateKey(request)
  await BUILT_WITH_WORKERS.delete(kvKey)
  return new Response(null, { status: 204 })
}

export { bookmark, hydrate, transformBookmark, unbookmark }
