import React from "react"

const Featured = ({ project: { name, description, features } }) => (
  <div className="project__featured">
    <img src="https://placehold.it/400x300" />
    <h2>{name}</h2>
    <p>{description}</p>
    <div className="features">
      {features.map(({ name }) => (
        <span>{name}</span>
      ))}
    </div>
  </div>
)

const Project = ({ project: { name, description, features } }) => (
  <div className="project">
    <img src="https://placehold.it/400x300" />
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
