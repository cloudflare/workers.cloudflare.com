import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Featured = ({
  project: {
    image: {
      asset: { fixed },
    },
    name,
    slug,
    description,
    features,
  },
}) => (
  <div className="project">
    <Img fixed={fixed} />
    <h2>
      <Link to={`/projects/${slug}`}>{name}</Link>
    </h2>
    <p>{description}</p>
    <div className="features">
      {features.map(({ name, slug }) => (
        <Link to={`/features/${slug}`}>
          <span>{name}</span>
        </Link>
      ))}
    </div>
  </div>
)

const Project = ({
  project: {
    image: {
      asset: { fixed },
    },
    name,
    slug,
    description,
    features,
  },
}) => (
  <div className="project">
    <Img fixed={fixed} />
    <h2>
      <Link to={`/projects/${slug}`}>{name}</Link>
    </h2>
    <p>{description}</p>
    <div className="features">
      {features.map(({ name, slug }) => (
        <Link to={`/features/${slug}`}>
          <span>{name}</span>
        </Link>
      ))}
    </div>
  </div>
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
