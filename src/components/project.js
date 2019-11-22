import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import "./project.css"

const Project = ({
  project: {
    thumbnail: {
      asset: { fluid },
    },
    name,
    slug,
    shortDescription,
    features,
  },
}) => (
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
    </div>
  </Link>
)

export default Project
