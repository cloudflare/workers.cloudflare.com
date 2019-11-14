import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Project = ({ data: { sanityProject: project } }) => {
  return (
    <Layout>
      <SEO title={project.name} />
      <div className="ProjectPage">
        <h2 className="ProjectPage--title">{project.name}</h2>
        <p className="ProjectPage--description">{project.shortDescription}</p>
        <div className="ProjectPage--image">
          <Img fluid={project.image.asset.fluid} />
        </div>
        {project.links.map(({ linkType, url }) => (
          <div>
            <a href={url}>{linkType}</a>
          </div>
        ))}
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
