import React from 'react'

// TODO - move these to workers-brand-assets and import into workers.cloudflare.com and built-with-workers
import "../vendor/workers-brand-assets/css/components/footer.css"

const Footer = () => (
  <footer class="Footer Footer-with-top-separator">
    <div class="Footer--columns">
      <div class="Footer--column Footer--column-logo">
        <a href="https://workers.cloudflare.com" class="Footer--logo-link Link Link-without-underline">
          <img class="Footer--logo-link-image" alt="Workers logo" src="https://workers.cloudflare.com/resources/logo/logo.svg"/>
        </a>
      </div>
      <div class="Footer--column">
        <h2 class="Footer--column-title">Product</h2>
        <ul class="Footer--column-list">
          <li class="Footer--column-list-item"><a href="https://workers.cloudflare.com/sites" class="Link Link-without-underline Link-is-juicy">Workers Sites</a></li>
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/reference/storage/overview/" class="Link Link-without-underline Link-is-juicy">Key-value storage</a></li>
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/about/using-cache/" class="Link Link-without-underline Link-is-juicy">Caching</a></li>
          <li class="Footer--column-list-item"><a href="https://workers.cloudflare.com/#plans" class="Link Link-without-underline Link-is-juicy">Pricing</a></li>
        </ul>
      </div>
      <div class="Footer--column">
        <h2 class="Footer--column-title">Docs</h2>
        <ul class="Footer--column-list">
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/tutorials/" class="Link Link-without-underline Link-is-juicy">Tutorials</a></li>
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/templates/" class="Link Link-without-underline Link-is-juicy">Templates</a></li>
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/reference/tooling/" class="Link Link-without-underline Link-is-juicy">Tooling reference</a></li>
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/reference/runtime/apis/" class="Link Link-without-underline Link-is-juicy">API reference</a></li>
        </ul>
      </div>
      <div class="Footer--column">
        <h2 class="Footer--column-title">About</h2>
        <ul class="Footer--column-list">
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/about/how-it-works/" class="Link Link-without-underline Link-is-juicy">How it works</a></li>
          <li class="Footer--column-list-item"><a href="https://developers.cloudflare.com/workers/about/tips/" class="Link Link-without-underline Link-is-juicy">Tips</a></li>
          <li class="Footer--column-list-item"><a href="https://blog.cloudflare.com/serverlist/" class="Link Link-without-underline Link-is-juicy">Newsletter</a></li>
          <li class="Footer--column-list-item"><a href="https://blog.cloudflare.com/tag/serverless/" class="Link Link-without-underline Link-is-juicy">Blog</a></li>
        </ul>
      </div>
      <div class="Footer--column">
        <h2 class="Footer--column-title">Help</h2>
        <ul class="Footer--column-list">
          <li class="Footer--column-list-item"><a href="https://www.cloudflarestatus.com/" class="Link Link-without-underline Link-is-juicy">Status</a></li>
          <li class="Footer--column-list-item"><a href="https://community.cloudflare.com/c/developers/workers" class="Link Link-without-underline Link-is-juicy">Forum</a></li>
          <li class="Footer--column-list-item"><a href="https://support.cloudflare.com/hc/en-us/sections/360000215372-Cloudflare-Workers" class="Link Link-without-underline Link-is-juicy">Support</a></li>
          <li class="Footer--column-list-item"><a href="https://twitter.com/CloudflareDev" class="Link Link-without-underline Link-is-juicy">Twitter</a></li>
        </ul>
      </div>
    </div>
    <div class="Footer--legal">© 2019 Cloudflare, Inc. · <a class="Link Link-without-underline" href="https://www.cloudflare.com/privacypolicy/">Privacy</a> · <a class="Link Link-without-underline" href="https://www.cloudflare.com/website-terms/">Terms</a></div>
  </footer>
)

export default Footer
