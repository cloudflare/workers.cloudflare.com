import React from "react"

const Feature = ({
  feature: {
    image: {
      asset: {
        fixed: { src, srcSet },
      },
    },
    name,
    description,
  },
}) => (
  <div className="features__feature">
    <div className="h-full">
      <img src={src} srcSet={srcSet} />
    </div>
    <div className="flex-1">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  </div>
)
export default Feature
