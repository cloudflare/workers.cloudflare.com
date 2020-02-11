import React from "react"
import lscache from "lscache"

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

function useLocalStorage(key, initialValue) {
  const { isBrowser } = useSSR()
  const [storedValue, setStoredValue] = React.useState(() => {
    if (!isBrowser) {
      return initialValue
    }

    try {
      const item = lscache.get(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = value => {
    if (!isBrowser) {
      return
    }

    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      lscache.set(key, JSON.stringify(valueToStore), 1)
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export { flatten, normalizeCollection, useLocalStorage, useSSR }
