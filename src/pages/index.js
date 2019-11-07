import React from "react"
import { graphql } from "gatsby"

import Feature from "../components/feature"
import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

const flatten = set => set.edges.map(({ node }) => node)

const IndexPage = ({ data: { allSanityFeature, allSanityProject } }) => {
  const features = flatten(allSanityFeature)
  const featureNames = features.map(f => f.name).reverse() // TODO - manual sort?
  const projects = flatten(allSanityProject)
  const featured = projects.filter(({ featured }) => !!featured)
  const unfeatured = projects.filter(({ featured }) => !featured)

  return (
    <Layout>
      <SEO />

      {featureNames.map(featureName => (
        <div class="ProjectsRow">
          <div class="ProjectsRow--title">
            <h2 class="ProjectsRow--title-content">Built with { featureName }</h2>
          </div>

          <div class="ProjectsRow--projects">
            {projects.filter(project => project.features.length && project.features.map(f => f.name).includes(featureName)).map(project => (
              <div class="ProjectsRow--project">
                <Project project={project} />
              </div>
            ))}
            <div class="ProjectsRow--row-end-spacer"></div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  fragment Feature on SanityFeature {
    name
    description
    slug
    image {
      asset {
        fluid(maxWidth: 200) {
          ...GatsbySanityImageFluid
        }
      }
    }
  }

  fragment Project on SanityProject {
    name
    featured
    description
    slug
    image {
      asset {
        fluid(maxWidth: 440) {
          ...GatsbySanityImageFluid
        }
      }
    }
    features {
      name
      slug
    }
  }

  query Homepage {
    allSanityFeature {
      edges {
        node {
          ...Feature
        }
      }
    }
    allSanityProject {
      edges {
        node {
          ...Project
        }
      }
    }
  }
`

export default IndexPage
