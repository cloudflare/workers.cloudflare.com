import React from "react"
import lscache from "lscache"

import isDOMavailable from "./isDOMavailable.js"

const flatten = set => set.edges.map(({ node }) => node)

const normalizeCollection = (collection, projects) => {
  let normalized = collection

  if (collection.projects.length) {
    const collectionProjects = collection.projects.map(({ id }) =>
      projects.find(project => project.id === id)
    )
    normalized.projects = collectionProjects
  }

  return normalized
}

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
