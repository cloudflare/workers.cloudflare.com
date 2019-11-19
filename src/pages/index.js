import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

import "./built-with-workers-page.css"
import "./collections.css"
import "./collection.css"

const flatten = set => set.edges.map(({ node }) => node)

const IndexPage = ({ data: { allSanityFeature, allSanityProject } }) => {
  const features = flatten(allSanityFeature)
  const projects = flatten(allSanityProject)

  return (
    <Layout>
      <SEO />

      <div className="BuiltWithWorkersPage">
        <div className="Collections">
          {features.map(feature => (
            <div className="Collections--collection">
              <div className="Collection">
                <div className="Collection--header">
                  <h2 className="Collection--title">
                    Built with {feature.name}
                  </h2>
                </div>

                <div className="Collection--projects">
                  {projects
                    .filter(
                      project =>
                        project.features.length &&
                        project.features.map(f => f.name).includes(feature.name)
                    )
                    .map(project => (
                      <div className="Collection--project">
                        <Project project={project} />
                      </div>
                    ))}
                  <div className="Collection--spacer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    longDescription
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
        fluid(maxWidth: 952) {
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
