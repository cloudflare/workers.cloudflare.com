import mime from "mime"

const generateHmac = async (data: string, kvStore: KVNamespace) => {
  const str2ab = (str: string) =>
    new Uint8Array(str.split("").map((char: string) => char.charCodeAt(0)))

  const secret = (await kvStore.get("__HMAC_SECRET__")) ?? "__HMAC_SECRET__"
  const key = await crypto.subtle.importKey(
    "raw",
    str2ab(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  )
  const sig = await crypto.subtle.sign({ name: "HMAC" }, key, str2ab(data))
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(sig)]))
}

const pattern = /\/projects\/([\w|-]*)[\/]?/

const ipKey = async (request: Request, kvStore: KVNamespace) => {
  const ip = request.headers.get("CF-Connecting-IP")
  const userAgent = request.headers.get("User-Agent")
  return await generateHmac([ip, userAgent].join("-"), kvStore)
}

const _processBookmarksForRequest = async (
  request: Request,
  kvStore: KVNamespace
) => {
  const { keys } = await kvStore.list({
    prefix: await ipKey(request, kvStore),
  })
  return { bookmarks: keys.map(({ name }) => name) }
}

const shouldProcess = (url: URL) => {
  const mimeType = mime.getType(url.pathname)
  return !mimeType
}

const transformBookmark = async (request: Request, kvStore: KVNamespace) => {
  const url = new URL(request.url)
  if (shouldProcess(url)) {
    return _processBookmarksForRequest(request, kvStore)
  }
  return new Promise((r) => r(null))
}

const bookmark = async (request: Request, kvStore: KVNamespace) => {
  const url = new URL(request.url)
  const matches = url.pathname.match(pattern)
  const project = matches?.[1]
  const kvKey = `${await ipKey(request, kvStore)}:${project}`

  const data = await kvStore.get(kvKey)

  if (data) {
    return new Response(null, { status: 304 })
  } else {
    await kvStore.put(kvKey, "true")
    return new Response("OK", { status: 201 })
  }
}

const unbookmark = async (request: Request, kvStore: KVNamespace) => {
  const url = new URL(request.url)
  const matches = url.pathname.match(pattern)
  const project = matches?.[1]
  const kvKey = `${await ipKey(request, kvStore)}:${project}`

  await kvStore.delete(kvKey)
  return new Response(null, { status: 204 })
}

export { bookmark, transformBookmark, unbookmark }
