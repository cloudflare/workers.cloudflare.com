import React from "react"
import { useSSR } from "../utils"

const parseDocumentState = () => {
  const edgeStateElement = document.querySelector("#edge_state")
  return edgeStateElement ? JSON.parse(edgeStateElement.innerText) : {}
}

export const EdgeStateContext = React.createContext([{}, () => {}])
export const EdgeStateProvider = ({ children }) => {
  const { isBrowser } = useSSR()
  if (!isBrowser) {
    return <>{children}</>
  }

  const edgeState = parseDocumentState()
  const [state, setState] = React.useState(edgeState)
  const updateState = (newState, options = { immutable: true }) =>
    options.immutable
      ? setState(Object.assign({}, state, newState))
      : setState(newState)

  return (
    <EdgeStateContext.Provider value={[state, updateState]}>
      {children}
    </EdgeStateContext.Provider>
  )
}
