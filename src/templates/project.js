import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = ({ data: { sanityProject: project } }) => {
  return (
    <Layout>
      <SEO title={project.name} />
      <div class="ProjectPage">
        <h2 class="ProjectPage--title">{project.name}</h2>
        <p class="ProjectPage--description">{project.description}</p>
        <div class="ProjectPage--image">
          <Img fixed={project.image.asset.fixed} />
        </div>
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
