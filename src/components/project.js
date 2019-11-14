import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

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
    to={`/projects/${slug}`}
  >
    <div className="Project Project-fills-height">
      <div className="Project--image">
        <Img fluid={fluid} />
      </div>

      <div className="Project--content">
        <h2 className="Project--title">{name}</h2>
        <p className="Project--description">{shortDescription}</p>
        <div className="Project--features">
          {features.map(({ name, slug }) => (
            <Link key={slug} to={`/features/${slug}`}>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Link>
)

export default Project
