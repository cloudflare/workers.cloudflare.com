import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <>
      <Header description={description} title={title} />
      <div>
        <main>{children}</main>
        <footer>
          <div className="footer__container container mx-auto">
            <div>
              <h3>Features</h3>
              <ul>
                <li>KV</li>
                <li>Sites</li>
              </ul>
            </div>
            <div>
              <h3>Get Started</h3>
              <ul>
                <li>Docs</li>
                <li>Tutorials</li>
                <li>Wranglers</li>
              </ul>
            </div>
            <div>
              <h3>Follow Us</h3>
              <ul>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
