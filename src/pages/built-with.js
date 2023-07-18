import React from "react"
import { graphql } from "gatsby"

import { isInitialRoute } from "../components/route-update-history"

import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

import { flatten, normalizeCollection, PROJECTS_PER_COLLECTION } from "../utils"

import "./built-with-workers-page.css"
import "./collections.css"
import "./collection.css"

const BuiltWithPage = ({
  data
}) => {
  const { sanityLayout } = data
  let collections = sanityLayout._rawCollections

  return (
    <Layout>
      <SEO title="Built with Workers" />

      <div className="BuiltWithWorkersPage">
        <div className="BuiltWithWorkersPage--hero">
          <h1>Built with Workers</h1>
          <p>Projects across the web utilizing Cloudflare&nbsp;Workers.</p>
          <p><a className="Button Button-is-primary" href="https://forms.gle/hK4wNQeXtAUR6Ud19">Submit a project</a></p>
        </div>

        <div className="Collections">
          {collections.map((collection, ci) => (
            <div className="Collections--collection" key={ci}>
              <div className="Collection">
                <div className="Collection--header">
                  <h2 className="Collection--title">{collection.name}</h2>
                </div>

                <div className="Collection--projects">
                  {collection.projects.slice(0, PROJECTS_PER_COLLECTION).map((project, pi) => (
                    <div className="Collection--project" key={pi}>
                      <Project project={project} isInitialRoute={isInitialRoute()} />
                    </div>
                  ))}
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
        url
      }
    }
  }

  fragment Project on SanityProject {
    name
    shortDescription
    longDescription
    slug
    developer
    thumbnail: image {
      asset {
        url
      }
    }
    image {
      asset {
        url
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

  fragment Collection on SanityCollection {
    name
  }

  query Homepage {
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
      _rawCollections(resolveReferences: { maxDepth: 10 })
    }
  }
`

export default BuiltWithPage
