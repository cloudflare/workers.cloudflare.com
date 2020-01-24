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

const ipKey = async request => {
  const ip = request.headers.get("CF-Connecting-IP")
  const userAgent = request.headers.get("User-Agent")
  return await generateHmac([ip, userAgent].join("-"))
}

const _processBookmarksForRequest = async request => {
  const { keys } = await BUILT_WITH_WORKERS.list({
    prefix: await ipKey(request),
  })
  return { bookmarks: keys.map(({ name }) => name) }
}

const shouldProcess = url => {
  const mimeType = mime.getType(url.pathname)
  return !mimeType
}

const transformBookmark = async request => {
  const url = new URL(request.url)
  if (shouldProcess(url)) {
    return _processBookmarksForRequest(request)
  }
  return new Promise(r => r(null))
}

const bookmark = async request => {
  const url = new URL(request.url)
  const matches = url.pathname.match(pattern)
  const project = matches[1]
  const kvKey = `${await ipKey(request)}:${project}`

  const data = await BUILT_WITH_WORKERS.get(kvKey)

  if (data) {
    return new Response(null, { status: 304 })
  } else {
    await BUILT_WITH_WORKERS.put(kvKey, true)
    return new Response("OK", { status: 201 })
  }
}

const unbookmark = async request => {
  const url = new URL(request.url)
  const matches = url.pathname.match(pattern)
  const project = matches[1]
  const kvKey = `${await ipKey(request)}:${project}`

  await BUILT_WITH_WORKERS.delete(kvKey)
  return new Response(null, { status: 204 })
}

export { bookmark, transformBookmark, unbookmark }
