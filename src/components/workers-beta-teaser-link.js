import React from "react"

import "./workers-beta-teaser-link.css"

export default () => (
  <a className="WorkersBetaTeaserLink" href="https://pages.cloudflare.com/">
    <div className="WorkersBetaTeaserLink--inner">
      <div className="WorkersBetaTeaserLink--content">
        <strong>Cloudflare&nbsp;Pages</strong>
        &nbsp;
        <span className="WorkersBetaTeaserLink--beta">BETA</span>
        {" — "}
        request access to deploy JAMstack sites on Cloudflare's&nbsp;edge&nbsp;→
      </div>
    </div>
  </a>
)
