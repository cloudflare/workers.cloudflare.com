import { randomBytes } from "crypto"
import { resolve } from "path"
import { describe, expect, it, beforeAll, afterAll, assert } from "vitest"
import { unstable_dev } from "wrangler"
import type { UnstableDevWorker } from "wrangler"
import redirects from "../src/redirects"

describe("worker", () => {
  let worker: UnstableDevWorker

  beforeAll(async () => {
    worker = await unstable_dev(resolve(__dirname, "../src/index.ts"), {
      experimental: {
        disableExperimentalWarning: true,
      },
    })
  })

  afterAll(async () => {
    await worker.stop()
  })
  describe("redirects", () => {
    describe("docs", () => {
      it("suffix", async () => {
        const resp = await worker.fetch(
          `https://workers.cloudflare.com/docs/reference/runtime/limits/`,
          {
            redirect: "manual",
          }
        )

        const location = resp.headers.get("Location")

        expect(location).toMatchInlineSnapshot(
          '"https://developers.cloudflare.com/workers//reference/runtime/limits/"'
        )
      })
      it("prefix", async () => {
        const resp = await worker.fetch(
          `https://workers.cloudflare.com/nodedocs`,
          {
            redirect: "manual",
          }
        )

        const location = resp.headers.get("Location")

        expect(location).toMatchInlineSnapshot(
          '"https://developers.cloudflare.com/workers/node"'
        )
      })
    })
    describe("static definitions", () => {
      for (const redirect of redirects) {
        it(redirect.path, async () => {
          const resp = await worker.fetch(
            `https://workers.cloudflare.com${redirect.path}`,
            {
              redirect: "manual",
            }
          )

          const location = resp.headers.get("Location")

          expect(location).toContain(redirect.redirect)
        })
      }
    })
  })
  describe("playground proxy", () => {
    it("basic", async () => {
      const resp = await worker.fetch(
        `https://workers.cloudflare.com/playground`
      )

      expect(await resp.text()).toContain(
        `<title>Cloudflare Workers Playground</title>`
      )
    })
    it("forwards method", async () => {
      const resp = await worker.fetch(
        `https://workers.cloudflare.com/playground/api/worker`,
        {
          method: "POST",
        }
      )

      expect(await resp.json()).toMatchInlineSnapshot(`
        {
          "data": {},
          "error": "UploadFailed",
          "message": "Valid token not provided",
        }
      `)
    })
    it("forwards cookie", async () => {
      const resp = await worker.fetch(
        `https://workers.cloudflare.com/playground/api/worker`,
        {
          method: "POST",
          headers: {
            Cookie: "user=some-user",
          },
        }
      )

      // An error is expected, since `some-user` is not a valid user token
      // This test is for testing the proxy behaviour. The preview behaviour with
      // valid tokens is tested in `workers-sdk`
      expect(await resp.json()).toMatchInlineSnapshot(`
        {
          "data": {},
          "error": "UploadFailed",
          "message": "Valid token not provided",
        }
      `)
    })
    it("rewrites cookie domain", async () => {
      const resp = await worker.fetch(
        `https://some-random-domain.com/playground/`
      )

      expect(resp.headers.get("set-cookie")).toContain(
        "Domain=some-random-domain.com"
      )
    })
  })

  describe("bookmark", () => {
    it("create new", async () => {
      const project = randomBytes(20).toString("hex")
      const resp = await worker.fetch(
        `https://workers.cloudflare.com/built-with/projects/${project}//bookmark`,
        {
          method: "POST",
        }
      )
      expect(resp.status).toMatchInlineSnapshot("201")
      expect(await resp.text()).toMatchInlineSnapshot('"OK"')
    })

    it("confirm existing", async () => {
      const project = randomBytes(20).toString("hex")
      await worker.fetch(
        `https://workers.cloudflare.com/built-with/projects/${project}//bookmark`,
        {
          method: "POST",
        }
      )
      const resp = await worker.fetch(
        `https://workers.cloudflare.com/built-with/projects/${project}//bookmark`,
        {
          method: "POST",
        }
      )
      expect(resp.status).toMatchInlineSnapshot("304")
      expect(await resp.text()).toMatchInlineSnapshot('""')
    })

    it("remove", async () => {
      const project = randomBytes(20).toString("hex")
      const resp = await worker.fetch(
        `https://workers.cloudflare.com/built-with/projects/${project}//bookmark`,
        {
          method: "POST",
        }
      )
      expect(resp.status).toMatchInlineSnapshot("201")
      expect(await resp.text()).toMatchInlineSnapshot('"OK"')
      const removeResp = await worker.fetch(
        `https://workers.cloudflare.com/built-with/projects/${project}//unbookmark`,
        {
          method: "POST",
        }
      )
      expect(removeResp.status).toMatchInlineSnapshot("204")
      expect(await removeResp.text()).toMatchInlineSnapshot('""')
    })
  })

  describe("edge state hydration", () => {
    it("injected", async () => {
      const resp = await worker.fetch(`https://example.com`)
      const text = await resp.text()
      const bookmarks =
        /<script id='edge_state' type='application\/json'>((.|\n)*?)<\/script>/.exec(
          text
        )

      assert(bookmarks)
      expect(JSON.parse(bookmarks?.[1])).toHaveProperty("bookmarks")
    })
    it("state=null when path matches a mime type", async () => {
      const resp = await worker.fetch(`https://example.com/page.html`)
      const text = await resp.text()
      const bookmarks =
        /<script id='edge_state' type='application\/json'>((.|\n)*?)<\/script>/.exec(
          text
        )

      expect(bookmarks?.[1]).toMatchInlineSnapshot(`
        "
                null
              "
      `)
    })
  })
})
