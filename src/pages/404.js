import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../vendor/workers-brand-assets/css/components/error-page.css"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <div class="ErrorPage">
      <div class="ErrorPage--content">
        <h1 class="ErrorPage--title">Not found</h1>
        <p class="ErrorPage--description">Unfortunately, the page you requested cannot be found.</p>
        <div class="ErrorPage--action">
          <a class="Button Button-is-primary" href="/">Home</a>
        </div>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
