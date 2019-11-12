import React from "react"
import { graphql } from "gatsby"

import Feature from "../components/feature"
import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

const flatten = set => set.edges.map(({ node }) => node)

const IndexPage = ({ data: { allSanityFeature, allSanityProject } }) => {
  const features = flatten(allSanityFeature)
  const projects = flatten(allSanityProject)

  return (
    <Layout>
      <SEO />

      {features.map(feature => (
        <div class="ProjectsRow">
          <div class="ProjectsRow--title">
            <h2 class="ProjectsRow--title-content">
              Built with {feature.name}
            </h2>
          </div>

          <div class="ProjectsRow--projects">
            {projects
              .filter(
                project =>
                  project.features.length &&
                  project.features.map(f => f.name).includes(feature.name)
              )
              .map(project => (
                <div class="ProjectsRow--project">
                  <Project project={project} />
                </div>
              ))}
            <div class="ProjectsRow--row-end-spacer" />
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
    shortDescription
    slug
    thumbnail: image {
      asset {
        fluid(maxWidth: 440) {
          ...GatsbySanityImageFluid
        }
      }
    }
    image {
      asset {
        fluid(maxWidth: 816) {
          ...GatsbySanityImageFluid
        }
      }
    }
    links {
      primary
      linkType
      url
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
