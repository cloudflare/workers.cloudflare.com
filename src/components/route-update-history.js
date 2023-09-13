const isWindowAvailable = !!(typeof window !== "undefined")

if (isWindowAvailable) {
  window.__routeUpdateHistory = window.__routeUpdateHistory || []
}

const onRouteUpdate = ({ location, prevLocation }) => {
  if (!isWindowAvailable) return
  window.__routeUpdateHistory.push({ location, prevLocation })
}

const getRouteUpdateHistory = () => {
  if (!isWindowAvailable) return
  return window.__routeUpdateHistory
}

const getLastRouteUpdate = () => {
  if (!isWindowAvailable) return
  if (window.__routeUpdateHistory.length > 0)
    return window.__routeUpdateHistory[window.__routeUpdateHistory.length - 1]
}

const isInitialRoute = () => {
  if (!isWindowAvailable) return
  return window.__routeUpdateHistory.length === 0
}

export {
  onRouteUpdate,
  getRouteUpdateHistory,
  getLastRouteUpdate,
  isInitialRoute,
}
