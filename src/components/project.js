import React from "react"
import Img from "gatsby-image"

const Featured = ({
  project: {
    image: {
      asset: { fixed },
    },
    name,
    description,
    features,
  },
}) => (
  <div className="project__featured">
    <Img fixed={fixed} />
    <h2>{name}</h2>
    <p>{description}</p>
    <div className="features">
      {features.map(({ name }) => (
        <span>{name}</span>
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
    description,
    features,
  },
}) => (
  <div className="project">
    <Img fixed={fixed} />
    <h2>{name}</h2>
    <p>{description}</p>
    <div className="features">
      {features.map(({ name }) => (
        <span>{name}</span>
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
