import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

const flatten = set => set.edges.map(({ node }) => node)

const Feature = ({ data: { sanityFeature: feature, allSanityProject } }) => {
  const projects = flatten(allSanityProject)
  const featured = projects.filter(({ featured }) => !!featured)
  return (
    <Layout>
      <SEO title={feature.name} />
      <div className="container mx-auto">
        <h2>{feature.name}</h2>
        <h3>{feature.description}</h3>
        <Img fixed={feature.image.asset.fixed} />

        <div className="featured">
          {featured.map(project => (
            <Project variant="featured" project={project} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query FeaturePage($slug: String!) {
    sanityFeature(slug: { eq: $slug }) {
      ...Feature
    }

    allSanityProject(
      filter: { features: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...Project
        }
      }
    }
  }
`

export default Feature
