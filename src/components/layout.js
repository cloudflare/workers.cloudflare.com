import "../vendor/workers-brand-assets/js/focus-visible-polyfill.js"

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"

import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
