import React from "react"

// h/t https://react.30secondsofcode.org/snippet/useSSR
const isDOMavailable = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)

const useSSR = (callback, delay) => {
  const [inBrowser, setInBrowser] = React.useState(isDOMavailable)

  React.useEffect(() => {
    setInBrowser(isDOMavailable)
    return () => {
      setInBrowser(false)
    }
  }, [])

  const useSSRObject = React.useMemo(
    () => ({
      isBrowser: inBrowser,
      isServer: !inBrowser,
      canUseWorkers: typeof Worker !== "undefined",
      canUseEventListeners: inBrowser && !!window.addEventListener,
      canUseViewport: inBrowser && !!window.screen,
    }),
    [inBrowser]
  )

  return React.useMemo(
    () => Object.assign(Object.values(useSSRObject), useSSRObject),
    [inBrowser]
  )
}

const SSRChecker = (Component, props) => {
  const { isBrowser } = useSSR()
  return isBrowser ? <Component {...props} /> : null
}
export default SSRChecker
