import React from "react"

const flatten = set => set.edges.map(({ node }) => node)

const normalizeCollection = (collection, features, projects) => {
  let normalized = collection
  if (collection.feature) {
    const featureId = collection.feature.id
    const feature = features.find(({ id }) => featureId === id)
    normalized.feature = feature
    const featureProjects = projects.filter(project =>
      project.features.find(({ id }) => id === feature.id)
    )
    normalized.projects = featureProjects
  }

  if (collection.projects.length) {
    const collectionProjects = collection.projects.map(({ id }) =>
      projects.find(project => project.id === id)
    )
    normalized.projects = collectionProjects
  }

  return normalized
}

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

export { flatten, normalizeCollection, useSSR }
