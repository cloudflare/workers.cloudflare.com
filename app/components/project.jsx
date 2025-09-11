import React from "react"
import { Link } from "@remix-run/react"
import { cacheableUrl } from "../utils"

import "../styles/project.css"

const Project = ({ isInitialRoute, project }) => {
  const { name, slug, shortDescription } = project

  return (
    <Link
      className="Project---link Project---link-fills-height"
      to={`/built-with/projects/${slug}`}
    >
      <div className="Project Project-fills-height">
        <div className="Project--image">
          <img className="Project--image-img" src={cacheableUrl(project.image.asset.url)} />
        </div>

        <div className="Project--content">
          <h2 className="Project--title">{name}</h2>
          <p className="Project--description">{shortDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default Project
