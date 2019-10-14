import React from "react"

const Feature = ({ feature: { name, description } }) => (
  <div className="features__feature">
    <div>
      <img src="https://placehold.it/300x200" />
    </div>
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  </div>
)
export default Feature
