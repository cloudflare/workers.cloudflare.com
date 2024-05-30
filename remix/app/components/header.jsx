import React from "react"
import Nav from "./nav"

import "./header.css"

const Header = ({ showInput = true }) => (
  <header className="Header">
    <Nav showInput={showInput} />
  </header>
)

export default Header
