import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

import { flatten, normalizeCollection } from "../utils"

import "./built-with-workers-page.css"
import "./collections.css"
import "./collection.css"

const IndexPage = ({
  data: {
    allSanityCollection,
    allSanityFeature,
    allSanityProject,
    sanityLayout,
  },
}) => {
  const allCollections = flatten(allSanityCollection)
  let collections = sanityLayout.collections.map(collection =>
    allCollections.find(({ id }) => id === collection.id)
  )
  collections = collections.map(collection =>
    normalizeCollection(
      collection,
      flatten(allSanityFeature),
      flatten(allSanityProject)
    )
  )

  return (
    <Layout>
      <SEO />

      <div className="BuiltWithWorkersPage">
        <div className="BuiltWithWorkersPage--hero">
          <h1>Built with Workers</h1>
          <p>Projects across the web utilizing Cloudflare&nbsp;Workers.</p>
        </div>

        <div className="Collections">
          {collections.map((collection, i) => (
            <div className="Collections--collection">
              <div className="Collection">
                <div className="Collection--header">
                  <h2 className="Collection--title">{collection.name}</h2>
                  {i === 0 && (
                    <span className="Collection--submission-link">
                      <a className="Link Link-with-right-arrow Link-is-juicy" href="https://forms.gle/hK4wNQeXtAUR6Ud19">Submit a project</a>
                    </span>
                  )}
                </div>

                <div className="Collection--projects">
                  {collection.projects.map(project => (
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
    id
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
    id
    name
    shortDescription
    longDescription
    slug
    developer
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
      id
      name
      slug
    }
  }

  fragment Collection on SanityCollection {
    id
    name
    feature {
      id
    }
    projects {
      id
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

    allSanityCollection {
      edges {
        node {
          ...Collection
        }
      }
    }

    sanityLayout(page_id: { eq: "homepage" }) {
      collections {
        id
      }
    }
  }
`

export default IndexPage
