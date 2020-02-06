import { EdgeStateContext } from "./edge_state"
import React, { useContext, useEffect, useState } from "react"
import { useLocalStorage } from "../utils"

export default key => {
  const [loaded, setLoaded] = useState(false)
  const [state, setState] = useContext(EdgeStateContext)
  const [bookmarked, setBookmarked] = useLocalStorage(key, false)

  const bookmark = async () => {
    const url = new URL(window.location)
    await fetch(url.pathname + "/bookmark", {
      method: "POST",
    })

    setBookmarked(true)
    setState([key])

    return false
  }

  const unbookmark = async () => {
    const url = new URL(window.location)
    await fetch(url.pathname + "/unbookmark", {
      method: "POST",
    })

    setBookmarked(false)
    const newState = state.filter(k => k != key)
    setState(newState, { immutable: false })

    return false
  }

  useEffect(() => {
    async function parse() {
      setLoaded(true)

      const kvBookmarked = state && !!state.find(k => k.includes(key))
      if (kvBookmarked) {
        setBookmarked(kvBookmarked)
      }
    }

    parse()
  }, [state])

  const toggleBookmark = bookmarked ? unbookmark : bookmark
  return { bookmarked, loaded, toggleBookmark }
}
