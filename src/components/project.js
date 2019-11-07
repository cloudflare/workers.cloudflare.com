import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Featured = ({
  project: {
    image: {
      asset: { fluid },
    },
    name,
    slug,
    description,
    features,
  },
}) => (
  <div className="Project Project-is-featured">
    <div class="Project--image">
      <Img fluid={fluid} />
    </div>

    <div class="Project--content">
      <h2 class="Project--title">
        <Link class="Link Link-without-underline Link-is-juicy" to={`/projects/${slug}`}>{name}</Link>
      </h2>
      <p class="Project--description">{description}</p>

      <div className="Project--features">
        {features.map(({ name, slug }) => (
          <Link to={`/features/${slug}`}>
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  </div>
)

const Project = ({
  project: {
    image: {
      asset: { fluid },
    },
    name,
    slug,
    description,
    features,
  },
}) => (
  <Link class="Project---link Project---link-fills-height" to={`/projects/${slug}`}>
    <div class="Project Project-fills-height">
      <div class="Project--image">
        <Img fluid={fluid} />
      </div>

      <div class="Project--content">
        <h2 class="Project--title">
          {name}
        </h2>
        <p class="Project--description">{description}</p>
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

const Variants = ({ variant, project }) => {
  switch (variant) {
    case "featured":
      return <Featured project={project} />
    default:
      return <Project project={project} />
  }
}

export default Variants
