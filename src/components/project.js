import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Bookmark from "./bookmark"
import "./project.css"

const Project = ({ project }) => {
  const {
    thumbnail: {
      asset: { fluid },
    },
    name,
    slug,
    shortDescription,
  } = project

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

        <Bookmark project={project} readOnly />
      </div>
    </Link>
  )
}

export default Project
