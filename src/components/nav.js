import React from "react"

import Logo from "@cloudflare/workers-brand-assets/resources/logo/logo-combination-mark-horizontal.svg"

import "@cloudflare/workers-brand-assets/css/components/cloudflare-workers-logo.css"
import "@cloudflare/workers-brand-assets/css/components/button.css"

// TODO - move this to workers-brand-assets and import into workers.cloudflare.com and built-with-workers
import "../vendor/workers.cloudflare.com/css/components/nav.css"

const Nav = () => (
  <nav className="Nav">
    <a className="Nav--link Nav--link-logo" href="https://workers.cloudflare.com">
      <div className="CloudflareWorkersLogo CloudflareWorkersLogo-horizontal-combination-mark">
        <Logo/>
      </div>
    </a>

    <div className="Nav--main-links">
      <div className="Nav--item">
        <a className="Nav--link" href="https://workers.cloudflare.com/sites">Workers Sites</a>
      </div>

      <div className="Nav--item">
        <a className="Nav--link Nav--link-is-active" href="https://workers.cloudflare.com/built-with">Built with Workers</a>
      </div>

      <div className="Nav--item">
        <a className="Nav--link" href="https://workers.cloudflare.com/docs">Docs</a>
      </div>

      <div className="Nav--item">
        <a className="Nav--link" href="https://support.cloudflare.com/hc/en-us/sections/360000215372-Cloudflare-Workers">Support</a>
      </div>
    </div>

    <div className="Nav--account-management">
      <div className="Nav--item Nav--item-sign-in">
        <a className="Button Button-is-secondary" href="https://dash.cloudflare.com/login?redirect_uri=https%3A%2F%2Fdash.cloudflare.com%2F%3Faccount%3Dworkers">Log in</a>
      </div>

      <div className="Nav--item Nav--item-sign-up">
        <a className="Button Button-is-primary" href="https://dash.cloudflare.com/sign-up/workers">Sign up</a>
      </div>
    </div>
  </nav>
)

export default Nav
