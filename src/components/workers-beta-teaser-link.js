import React from "react"

import "./workers-beta-teaser-link.css"

export default () => (
  <a className="WorkersBetaTeaserLink" href="https://www.cloudflare.com/cloudflare-workers-durable-objects-beta/">
    <div className="WorkersBetaTeaserLink--inner">
      <div className="WorkersBetaTeaserLink--content">
        <strong>Durable&nbsp;Objects</strong>
        &nbsp;
        <span className="WorkersBetaTeaserLink--beta">BETA</span>
        {" — "}
        request access to our new strongly-consistent edge storage&nbsp;technology&nbsp;→
      </div>
    </div>
  </a>
)
