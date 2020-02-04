import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import useBookmarkState from "./bookmark_state"
import "./project.css"

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

  return (
    <div className="Project--bookmark" data-is-bookmarked={bookmarked}>
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
  )
}

const Project = ({ project }) => {
  const {
    thumbnail: {
      asset: { fluid },
    },
    name,
    slug,
    shortDescription,
  } = project

  const { bookmarked } = useBookmarkState(project.slug)

  return (
    <Link
      className="Project---link Project---link-fills-height"
      to={`/built-with/projects/${slug}`}
    >
      <div className="Project Project-fills-height">
        <div className="Project--image">
          <Img fluid={fluid} />
        </div>

        <div className="Project--content">
          <h2 className="Project--title">{name}</h2>
          <p className="Project--description">{shortDescription}</p>
        </div>

        <BookmarkIndicator bookmarked={bookmarked} />
      </div>
    </Link>
  )
}

export default Project
