import { resolve } from "path"
import { describe, expect, it, beforeAll, afterAll, assert } from "vitest"
import { unstable_dev } from "wrangler"
import type { UnstableDevWorker } from "wrangler"

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
          "message": "Token not provided",
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
          "error": "UnexpectedError",
          "message": "Something went wrong",
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
})
