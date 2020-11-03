import "focus-visible-polyfill"

import "@cloudflare/cloudflare-brand-assets/css/global/box-sizing.css"
import "@cloudflare/cloudflare-brand-assets/css/global/element-normalization.css"
import "@cloudflare/cloudflare-brand-assets/css/global/sizes-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/font-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/brand-color-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/theme-color-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/theme-helpers.css"
import "@cloudflare/cloudflare-brand-assets/css/global/selection-color.css"
import "@cloudflare/cloudflare-brand-assets/css/global/html.css"

import "@cloudflare/cloudflare-brand-assets/css/helpers/desktop-and-mobile-only.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/is-smooth-scrolling.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/is-visually-hidden.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/with-styled-webkit-scrollbars.css"

import React from "react"
import { EdgeStateProvider } from "./src/components/edge_state"
import { globalHistory } from "@reach/router"

export const onInitialClientRender = () => {
  /**
   * This is a workaround for a bug in Gatsby
   *
   * See https://github.com/gatsbyjs/gatsby/issues/8357 for more details
   */
  globalHistory._onTransitionComplete()
}

export const wrapRootElement = ({ element }) => (
  <EdgeStateProvider>{element}</EdgeStateProvider>
)

export { onRouteUpdate } from "./src/components/route-update-history.js"
