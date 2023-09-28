import { EdgeStateContext } from "./edge_state"
import { useContext, useEffect, useState } from "react"
import { useLocalStorage } from "../utils"

export default (key) => {
  const [loaded, setLoaded] = useState(false)
  const [state, setState] = useContext(EdgeStateContext)
  const [lsBookmarked, setLsBookmarked] = useLocalStorage(key, false)
  const [bookmarked, setBookmarked] = useState(false)

  const bookmark = async () => {
    const url = new URL(window.location)
    setLsBookmarked("bookmarked")
    setState([key])

    await fetch(url.pathname + "/bookmark", {
      method: "POST",
    })

    return false
  }

  const unbookmark = async () => {
    const url = new URL(window.location)
    setLsBookmarked("unbookmarking")
    const newState = state.filter((k) => !k.includes(key))
    setState(newState, { immutable: false })

    await fetch(url.pathname + "/unbookmark", {
      method: "POST",
    })

    return false
  }

  useEffect(() => {
    async function parse() {
      setLoaded(true)

      const kvBookmarked = state && !!state.find((k) => k.includes(key))

      switch (lsBookmarked) {
        case "bookmarked":
          return setBookmarked(true)
        case "unbookmarking":
          return setBookmarked(false)
        default:
          if (kvBookmarked) {
            setBookmarked(kvBookmarked)
            return setLsBookmarked("bookmarked")
          }
      }
    }

    parse()
  }, [key, lsBookmarked, setLsBookmarked, state])

  const toggleBookmark = bookmarked ? unbookmark : bookmark
  return { bookmarked, loaded, toggleBookmark }
}
