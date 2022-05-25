import React, { useState } from "react"
import { Link } from "gatsby"

import isDOMavailable from "../isDOMavailable.js"

import Logo from "@cloudflare/cloudflare-brand-assets/resources/workers/logo/logo-combination-mark-horizontal.svg"
import "@cloudflare/cloudflare-brand-assets/css/components/cloudflare-workers-logo.css"
import "@cloudflare/cloudflare-brand-assets/css/components/button.css"

import "./nav.css"

const Nav = ({ showInput = true }) => {
  const [value, setValue] = useState("")

  const handleOnChange = event => {
    const value = event.target.value
    setValue(value)
  }

  const handleOnSubmit = event => {
    event.preventDefault()
    if (isDOMavailable) {
      window.location.href = `/search/#q=${value}`
    }
  }

  return (
    <nav className="Nav">
      <Link className="Nav--link Nav--link-logo" to="/">
        <div className="CloudflareWorkersLogo CloudflareWorkersLogo-horizontal-combination-mark">
          <Logo />
        </div>
      </Link>

      <div className="Nav--main-links">
        <div className="Nav--item">
          <Link
            className="Nav--link"
            to="/"
            activeClassName="Nav--link-is-active"
          >
            Home
          </Link>
        </div>

        <div className="Nav--item">
          <a className="Nav--link" href="https://pages.cloudflare.com">
            Pages
          </a>
        </div>

        <div className="Nav--item">
          <Link
            className="Nav--link"
            to="/built-with"
            partiallyActive={true}
            activeClassName="Nav--link-is-active"
          >
            Built with
          </Link>
        </div>

        <div className="Nav--item">
          <a className="Nav--link" href="https://workers.cloudflare.com/docs">
            Docs
          </a>
        </div>

        <div className="Nav--item">
          <a className="Nav--link" href="https://discord.gg/cloudflaredev">
            Discord
          </a>
        </div>
      </div>

      <div className="Nav--search">
        {showInput ? (
          <form
            id="search-input"
            className="Nav--search-form"
            onSubmit={handleOnSubmit}
          >
            <div className="Nav--search-icon">
              <svg
                viewBox="0 0 16 16"
                fill="currentcolor"
                role="img"
                aria-labelledby="title-6713060681049814"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="title-6713060681049814">
                  Search icon (depiction of a magnifying glass)
                </title>
                <path d="M11.999 10.585l3.458 3.458a1 1 0 01-1.414 1.414L10.585 12a6.5 6.5.0 111.414-1.414zM6.75 11.5a4.75 4.75.0 100-9.5 4.75 4.75.0 000 9.5z"></path>
              </svg>
            </div>
            <input
              className="Nav--search-input"
              type="text"
              value={value}
              placeholder="Search Cloudflare..."
              autoComplete="off"
              onChange={handleOnChange}
            />
          </form>
        ) : null}
      </div>

      <div className="Nav--account-management">
        <div className="Nav--item Nav--item-sign-in">
          <a
            className="Button Button-is-secondary"
            href="https://dash.cloudflare.com/login?redirect_uri=https%3A%2F%2Fdash.cloudflare.com%2F%3Faccount%3Dworkers"
          >
            Log in
          </a>
        </div>

        <div className="Nav--item Nav--item-sign-up">
          <a
            className="Button Button-is-primary"
            href="https://dash.cloudflare.com/sign-up/workers"
          >
            Sign up
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
