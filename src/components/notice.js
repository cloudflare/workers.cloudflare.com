import React from "react"

import "./notice.css"

export default () => (
  <div className="HeroSection--notice-wrap">
    <a className="Notice" href="https://cloudflare.com/full-stack-week">
      <div className="Notice--inner">
        <div className="Notice--content">
          <strong>Welcome to Full Stack Week 2021</strong>
          &nbsp;
          {" — "}
          Tune in as we make a series of announcements to empower developers&nbsp;→
        </div>
      </div>
    </a>
  </div>
)
