import React from "react"
import { graphql, Link } from "gatsby"

import Feature from "../components/feature"
import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

const flatten = set => set.edges.map(({ node }) => node)

const IndexPage = ({ data: { allSanityFeature, allSanityProject } }) => {
  const features = flatten(allSanityFeature)
  const projects = flatten(allSanityProject)
  const featured = projects.filter(({ featured }) => !!featured)
  const unfeatured = projects.filter(({ featured }) => !featured)

  return (
    <Layout>
      <SEO />
      <div className="featured__container container mx-auto">
        {featured.map(project => (
          <Project variant="featured" project={project} />
        ))}
      </div>

      <div className="features__container">
        <div className="container mx-auto">
          <h2>Learn more</h2>
          <div className="features__collection">
            {features.map(feature => (
              <Feature feature={feature} />
            ))}
          </div>
        </div>
      </div>

      <div className="projects__container">
        <div className="container mx-auto">
          <div className="projects__collection">
            {unfeatured.map(project => (
              <Project project={project} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Homepage {
    allSanityFeature {
      edges {
        node {
          name
          description
          slug
        }
      }
    }
    allSanityProject {
      edges {
        node {
          name
          description
          slug
          featured
          image {
            _key
            _type
          }
          features {
            name
            slug
          }
        }
      }
    }
  }
`

export default IndexPage
