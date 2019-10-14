import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ description, title }) => (
  <header>
    <div className="container mx-auto">
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      <h2>{description}</h2>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  siteDescription: PropTypes.string.isRequired,
}

export default Header
