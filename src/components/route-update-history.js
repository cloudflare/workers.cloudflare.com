const onRouteUpdate = ({ location, prevLocation }) => {
  if (!window.__routeUpdateHistory) window.__routeUpdateHistory = []

  window.__routeUpdateHistory.push({ location, prevLocation })
}

const getRouteUpdateHistory = () => window.__routeUpdateHistory || []

const getLastRouteUpdate = () => {
  if (window.__routeUpdateHistory && window.__routeUpdateHistory.length > 0)
    return window.__routeUpdateHistory[window.__routeUpdateHistory.length - 1]
}

const isInitialRoute = () => !window.__routeUpdateHistory || window.__routeUpdateHistory.length === 0

export {
  onRouteUpdate,
  getRouteUpdateHistory,
  getLastRouteUpdate,
  isInitialRoute
}
