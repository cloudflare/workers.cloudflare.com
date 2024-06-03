import React from "react"

import "@cloudflare/cloudflare-brand-assets/css/components/footer.css"
import "./footer.css"

const Footer = () => (
  <footer className="Footer Footer-with-top-separator">
    <div className="Footer--columns">
      <div className="Footer--column Footer--column-logo">
        <a
          href="https://workers.cloudflare.com"
          className="Footer--logo-link Link Link-without-underline"
        >
          <img
            className="Footer--logo-link-image"
            alt="Workers logo"
            src="https://workers.cloudflare.com/resources/logo/logo.svg"
          />
        </a>
      </div>
      <div className="Footer--column">
        <h2 className="Footer--column-title">Product</h2>
        <ul className="Footer--column-list">
          <li className="Footer--column-list-item">
            <a
              href="https://pages.cloudflare.com"
              className="Link Link-without-underline Link-is-juicy"
            >
              Cloudflare Pages
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/workers/platform/storage-options/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Key-value storage
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/workers/reference/how-the-cache-works/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Cache
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://workers.cloudflare.com/#plans"
              className="Link Link-without-underline Link-is-juicy"
            >
              Pricing
            </a>
          </li>
        </ul>
      </div>
      <div className="Footer--column">
        <h2 className="Footer--column-title">Docs</h2>
        <ul className="Footer--column-list">
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/workers/tutorials/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Tutorials
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/workers/templates/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Templates
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/workers/wrangler/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Tooling reference
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/workers/runtime-apis/"
              className="Link Link-without-underline Link-is-juicy"
            >
              API reference
            </a>
          </li>
        </ul>
      </div>
      <div className="Footer--column">
        <h2 className="Footer--column-title">About</h2>
        <ul className="Footer--column-list">
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/workers/reference/how-workers-works/"
              className="Link Link-without-underline Link-is-juicy"
            >
              How it works
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://workers.cloudflare.com/built-with/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Built with
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://www.youtube.com/@CloudflareWorkers"
              className="Link Link-without-underline Link-is-juicy"
            >
              YouTube
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://blog.cloudflare.com/tag/serverless/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Blog
            </a>
          </li>
        </ul>
      </div>
      <div className="Footer--column">
        <h2 className="Footer--column-title">Help</h2>
        <ul className="Footer--column-list">
          <li className="Footer--column-list-item">
            <a
              href="https://www.cloudflarestatus.com/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Status
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://discord.cloudflare.com"
              className="Link Link-without-underline Link-is-juicy"
            >
              Discord
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://developers.cloudflare.com/support/contacting-cloudflare-support/"
              className="Link Link-without-underline Link-is-juicy"
            >
              Support
            </a>
          </li>
          <li className="Footer--column-list-item">
            <a
              href="https://x.com/CloudflareDev"
              className="Link Link-without-underline Link-is-juicy"
            >
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="Footer--legal">
      © 2024 Cloudflare, Inc. ·{" "}
      <a
        className="Link Link-without-underline"
        href="https://www.cloudflare.com/privacypolicy/"
      >
        Privacy
      </a>{" "}
      ·{" "}
      <a
        className="Link Link-without-underline"
        href="https://www.cloudflare.com/website-terms/"
      >
        Terms
      </a>{" "}
      ·{" "}
      <a
        role="button"
        id="ot-sdk-btn"
        className="Link Link-without-underline ot-sdk-show-settings"
      >
        Cookie Settings
      </a>
    </div>
  </footer>
)

export default Footer
