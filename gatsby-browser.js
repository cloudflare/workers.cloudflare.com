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
