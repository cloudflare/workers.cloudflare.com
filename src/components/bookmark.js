import React, { useEffect, useState } from "react"
import { useSSR } from "../utils"

import "./bookmark.css"
import { EdgeStateContext } from "./edge_state"

const bookmark = async ({ key, setBookmarked, setState }) => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/bookmark", {
    method: "POST",
  })

  setBookmarked(true)
  setState({ [key]: true })

  return false
}

const unbookmark = async ({ key, setBookmarked, setState }) => {
  const url = new URL(window.location)
  await fetch(url.pathname + "/unbookmark", {
    method: "POST",
  })

  setBookmarked(false)
  setState({ [key]: false })

  return false
}

const hydrate = async (_state, setState) => {
  return new Promise(async resolve => {
    const url = new URL(window.location)
    const resp = await fetch(url.pathname + "/_hydrate")
    const { bookmarks } = await resp.json()
    setState(bookmarks)
    resolve()
  })
}

const BookmarkButton = ({ onClick }) => (
  <button class="Button" onClick={onClick}>
    <span class="Bookmark--icon"></span>
  </button>
)

const Bookmark = ({ bookmarked, project, setBookmarked, setLoaded }) => {
  const key = `${project.slug}_bookmarked`
  const [state, setState] = React.useContext(EdgeStateContext)

  useEffect(() => {
    async function parse() {
      if (!state || !Object.keys(state).includes(key)) {
        return hydrate(state, setState)
      }

      const kvBookmarked = state[key]
      if (kvBookmarked) {
        setBookmarked(kvBookmarked)
      }
    }

    parse()
    setLoaded(true)
  }, [state])

  return (
    <BookmarkButton
      onClick={() =>
        !bookmarked
          ? bookmark({ key, setBookmarked, setState })
          : unbookmark({ key, setBookmarked, setState })
      }
    />
  )
}

export default props => {
  const [loaded, setLoaded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const { isBrowser } = useSSR()

  return (
    <div
      class={
        "Bookmark" +
        (bookmarked ? " Bookmark-is-bookmarked" : "") +
        (loaded ? "" : " Bookmark-is-loading")
      }
    >
      {isBrowser ? (
        <Bookmark
          {...props}
          bookmarked={bookmarked}
          setBookmarked={setBookmarked}
          loaded={loaded}
          setLoaded={setLoaded}
        />
      ) : (
        <BookmarkButton />
      )}
    </div>
  )
}
