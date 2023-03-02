import React from "react"
import PropTypes from "prop-types"

const loadTheme = `
  (() => {
    const setTheme = (theme) => {
      document.documentElement.setAttribute("theme", theme)
      localStorage.theme = theme
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)")
    query.addListener(() => {
      setTheme(query.matches ? "dark" : "light")
    })

    if (["dark", "light"].includes(localStorage.theme)) {
      setTheme(localStorage.theme)
    } else {
      setTheme(query.matches ? "dark" : "light")
    }
  })()
`

const setDomainAttr = `
  document.documentElement.setAttribute('domain', document.domain)
`

export default function HTML(props) {
  const env = process.env.NODE_ENV
  const cookieScript = env === 'production' ? (
    <>
      <script type="text/javascript" src="https://cdn.cookielaw.org/consent/d3bba612-bde9-4daa-93e3-a78dab7d1a86/OtAutoBlock.js" ></script>
      <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript" charSet="UTF-8" data-domain-script="d3bba612-bde9-4daa-93e3-a78dab7d1a86" ></script>
      <script type="text/javascript">
        function OptanonWrapper() { }
      </script>
    </>
  ) : (
    <>
      <script type="text/javascript" src="https://cdn.cookielaw.org/consent/d3bba612-bde9-4daa-93e3-a78dab7d1a86-test/OtAutoBlock.js" ></script>
      <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript" charSet="UTF-8" data-domain-script="d3bba612-bde9-4daa-93e3-a78dab7d1a86-test" ></script>
      <script type="text/javascript">
        function OptanonWrapper() { }
      </script>
    </>
  )

  return (
    <html {...props.htmlAttributes} theme="light">
      <head>
        <meta charSet="utf-8" />
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
        {cookieScript}
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
