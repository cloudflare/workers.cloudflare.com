import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Feature = ({
  feature: {
    image: {
      asset: { fluid },
    },
    name,
    slug,
    description,
  },
}) => (
  <div className="features__feature">
    <div className="h-full">
      <Img fluid={fluid} />
    </div>
    <div className="flex-1">
      <h3>
        <Link to={`/features/${slug}`}>{name}</Link>
      </h3>
      <p>{description}</p>
    </div>
  </div>
)
export default Feature
