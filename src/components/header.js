import React from 'react'
import Nav from './nav'

import '../vendor/workers.cloudflare.com/css/components/header.css'

// TODO - move this to workers-brand-assets and import into workers.cloudflare.com and built-with-workers
const Header = () => (
  <header class="Header">
    <Nav />
  </header>
)

export default Header
