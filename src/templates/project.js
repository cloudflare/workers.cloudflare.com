import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = ({ data: { sanityProject: project } }) => {
  return (
    <Layout>
      <SEO title={project.name} />
      <div className="container mx-auto">
        <h2>{project.name}</h2>
        <h3>{project.description}</h3>
        <Img fixed={project.image.asset.fixed} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectPage($slug: String!) {
    sanityProject(slug: { eq: $slug }) {
      ...Project
    }
  }
`

export default Project
