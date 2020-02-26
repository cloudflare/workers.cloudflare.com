import React from "react"
import { Link } from "gatsby"

import Logo from "@cloudflare/workers-brand-assets/resources/logo/logo-combination-mark-horizontal.svg"

import "@cloudflare/workers-brand-assets/css/components/cloudflare-workers-logo.css"
import "@cloudflare/workers-brand-assets/css/components/button.css"

import "./nav.css"

const Nav = () => {
  return (
    <nav className="Nav">
      <Link className="Nav--link Nav--link-logo" to="/">
        <div className="CloudflareWorkersLogo CloudflareWorkersLogo-horizontal-combination-mark">
          <Logo/>
        </div>
      </Link>

      <div className="Nav--main-links">
        <div className="Nav--item">
          <Link className="Nav--link" to="/" activeClassName="Nav--link-is-active">Home</Link>
        </div>

        <div className="Nav--item">
          <Link className="Nav--link" to="/sites" activeClassName="Nav--link-is-active">Sites</Link>
        </div>

        <div className="Nav--item">
          <Link className="Nav--link" to="/built-with" partiallyActive={true} activeClassName="Nav--link-is-active">Built with</Link>
        </div>

        <div className="Nav--item">
          <a className="Nav--link" href="https://workers.cloudflare.com/docs">Docs</a>
        </div>

        <div className="Nav--item">
          <a className="Nav--link" href="https://community.cloudflare.com/tags/workers">Community</a>
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
}

export default Nav
