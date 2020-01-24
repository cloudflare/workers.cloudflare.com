import React from "react"
import { useSSR } from "../utils"

const parseDocumentState = key => {
  const edgeStateElement = document.querySelector("#edge_state")
  const jsonData = JSON.parse(edgeStateElement.innerText) || {}
  return key ? jsonData[key] : jsonData
}

export const EdgeStateContext = React.createContext([{}, () => {}])
export const EdgeStateProvider = ({ children }) => {
  const [state, setState] = React.useState(null)

  const { isBrowser } = useSSR()
  if (!isBrowser) {
    return <>{children}</>
  }

  const edgeState = parseDocumentState("bookmarks")
  if (!state && edgeState) {
    setState(edgeState)
  }

  const updateState = (newState, options = { immutable: true }) =>
    options.immutable
      ? setState([].concat(state, newState))
      : setState(newState)

  return (
    <EdgeStateContext.Provider value={[state, updateState]}>
      {children}
    </EdgeStateContext.Provider>
  )
}
