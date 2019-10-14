import React from "react"

const Featured = ({
  project: {
    image: {
      asset: {
        fixed: { src, srcSet },
      },
    },
    name,
    description,
    features,
  },
}) => (
  <div className="project__featured">
    <img src={src} srcSet={srcSet} />
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
      asset: {
        fixed: { src, srcSet },
      },
    },
    name,
    description,
    features,
  },
}) => (
  <div className="project">
    <img src={src} srcSet={srcSet} />
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
