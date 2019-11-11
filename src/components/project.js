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
    short_description,
    features,
    links,
  },
}) => (
  <Link
    class="Project---link Project---link-fills-height"
    to={`/projects/${slug}`}
  >
    <div class="Project Project-fills-height">
      <div class="Project--image">
        <Img fluid={fluid} />
      </div>

      <div class="Project--content">
        <h2 class="Project--title">{name}</h2>
        <p class="Project--description">{short_description}</p>
        <div className="Project--features">
          {features.map(({ name, slug }) => (
            <Link to={`/features/${slug}`}>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Link>
)

export default Project
