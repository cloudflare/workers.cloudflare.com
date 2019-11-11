import React from 'react'
import Nav from './nav'

// TODO - move these to workers-brand-assets and import into workers.cloudflare.com and built-with-workers
import '../vendor/workers.cloudflare.com/css/components/header.css'

const Header = () => (
  <header class="Header">
    <Nav />
  </header>
)

export default Header
