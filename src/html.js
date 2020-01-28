import React from "react"
import PropTypes from "prop-types"

const loadTheme = `
  const themeQuery = window.matchMedia("(prefers-color-scheme: dark)")

  const getTheme = () => {
    const storedTheme = localStorage.theme
    const matchedTheme = themeQuery.matches ? "dark" : "light"
    return ["dark", "light"].includes(storedTheme) ? storedTheme : matchedTheme
  }

  const updateTheme = () => document.documentElement.setAttribute("theme", getTheme())

  themeQuery.addListener(updateTheme)
  updateTheme()
`

const setDomainAttr = `
  document.documentElement.setAttribute('domain', document.domain)
`

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} theme="light">
      <head>
        <!-- COMMON TAGS -->
        <meta charset="utf-8">
        <title>Cloudflare - Built with Workers</title>
        <!-- Search Engine -->
        <meta name="image" content="https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06">
        <!-- Schema.org for Google -->
        <meta itemprop="name" content="Cloudflare - Built with Workers">
        <meta itemprop="image" content="https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06">
        <!-- Twitter -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="Cloudflare - Built with Workers">
        <meta name="twitter:site" content="@cloudflaredev">
        <meta name="twitter:creator" content="@cloudflaredev">
        <meta name="twitter:image:src" content="https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06">
        <!-- Open Graph general (Facebook, Pinterest & Google+) -->
        <meta name="og:title" content="Cloudflare - Built with Workers">
        <meta name="og:image" content="https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06">
        <meta name="og:url" content="https://workers.cloudflare.com/built-with/">
        <meta name="og:site_name" content="Cloudflare- Built with Workers">
        <meta name="og:type" content="website">
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <script dangerouslySetInnerHTML={{ __html: setDomainAttr }} />
        <script dangerouslySetInnerHTML={{ __html: loadTheme }} />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
