import React from "react"
import Img from "gatsby-image"

const Feature = ({
  feature: {
    image: {
      asset: { fixed },
    },
    name,
    description,
  },
}) => (
  <div className="features__feature">
    <div className="h-full">
      <Img fixed={fixed} />
    </div>
    <div className="flex-1">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  </div>
)
export default Feature
