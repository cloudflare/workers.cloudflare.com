import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import useBookmarkState from "./bookmark_state"
import BookmarkIcon from "./bookmark_icon"

import "./project.css"

const Project = ({ isInitialRoute, project }) => {
  const {
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
          <img className="Project--image-img" src={project.image.asset.url} />
        </div>

        <div className="Project--content">
          <h2 className="Project--title">{name}</h2>
          <p className="Project--description">{shortDescription}</p>
        </div>

        {bookmarked && (
          <div className={`Project--bookmark${isInitialRoute ? ' Project--bookmark-should-fade-in' : ''}`}>
            <BookmarkIcon withGradientFill withShadow />
          </div>
        )}
      </div>
    </Link>
  )
}

export default Project
