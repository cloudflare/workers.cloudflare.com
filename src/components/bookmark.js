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

const hydrate = async ({ slug, state, setRequestedHydration, setState }) => {
  return new Promise(async resolve => {
    setRequestedHydration(true)
    const resp = await fetch(`/built-with/projects/${slug}/_hydrate`)
    const { bookmarks } = await resp.json()
    setState(bookmarks)
    resolve()
  })
}

const BookmarkIndicator = ({ bookmarked }) => {
  const uid = () =>
    `id${
      Math.random()
        .toString()
        .split(".")[1]
    }`
  const gradientID = uid()
  const shadowID = uid()
  const pathID = uid()

  return bookmarked ? (
    <div className="Project--bookmark">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 34">
        <defs>
          <linearGradient id={gradientID} x1="76%" x2="12%" y1="0%" y2="107%">
            <stop offset="0%" stopColor="#f8ac4a" />
            <stop offset="100%" stopColor="#f48424" />
          </linearGradient>
          <filter
            id={shadowID}
            width="140%"
            height="130%"
            x="-20%"
            y="-10%"
            filterUnits="objectBoundingBox"
          >
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation="1.5"
            />
            <feColorMatrix
              in="shadowBlurOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.184188179 0"
            />
          </filter>
          <path
            id={pathID}
            d="M2 0h22a2 2 0 012 2v29.586a1 1 0 01-1.707.707L13.707 21.707a1 1 0 00-1.414 0L1.707 32.293A1 1 0 010 31.586V2a2 2 0 012-2z"
          />
        </defs>
        <use
          fill="#000"
          filter={"url(#" + shadowID + ")"}
          href={"#" + pathID}
        />
        <use fill={"url(#" + gradientID + ")"} href={"#" + pathID} />
      </svg>
    </div>
  ) : null
}

const BookmarkButton = ({ bookmarked = false, onClick }) => (
  <button
    className="ProjectPage--header-action-button Button"
    onClick={onClick}
  >
    <span className="ProjectPage--header-action-bookmark-icon"></span>
    <span className="ProjectPage--header-action-bookmark-text">
      {bookmarked ? "Remove" : "Bookmark"}
    </span>
  </button>
)

const Bookmark = ({
  bookmarked,
  project,
  readOnly = false,
  setBookmarked,
  setLoaded,
}) => {
  const key = `${project.slug}_bookmarked`
  const [requestedHydration, setRequestedHydration] = useState(false)
  const [state, setState] = React.useContext(EdgeStateContext)

  useEffect(() => {
    async function parse() {
      if (!requestedHydration) {
        return hydrate({
          slug: project.slug,
          state,
          setState,
          setRequestedHydration,
        })
      }

      const kvBookmarked = state[key]
      if (kvBookmarked) {
        setBookmarked(kvBookmarked)
      }
    }

    parse()
    setLoaded(true)
  }, [state])

  return readOnly ? (
    <BookmarkIndicator bookmarked={bookmarked} />
  ) : (
    <div
      className="ProjectPage--header-action-bookmark"
      data-is-bookmarked={bookmarked}
    >
      <BookmarkButton
        bookmarked={bookmarked}
        onClick={() =>
          !bookmarked
            ? bookmark({ key, setBookmarked, setState })
            : unbookmark({ key, setBookmarked, setState })
        }
      />
    </div>
  )
}

export default props => {
  const [loaded, setLoaded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const { isBrowser } = useSSR()

  return (
    <>
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
    </>
  )
}
