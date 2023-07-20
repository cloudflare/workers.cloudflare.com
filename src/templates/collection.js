import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Project from "../components/project"
import { shuffle, PROJECTS_PER_COLLECTION } from "../utils"
import { isInitialRoute } from "../components/route-update-history"

import "../pages/built-with-workers-page.css"
import "./project-page.css"
import "@cloudflare/cloudflare-brand-assets/css/components/definition-list.css"

const Collection = ({ data }) => {
  const {
    allSanityProject,
    sanityCollection: collection
  } = data
  const projectIds = collection._rawProjects ? collection._rawProjects.map(({ id }) => id) : []
  const projects = allSanityProject.edges.map(({ node }) => node).filter(
    ({ id }) => projectIds.includes(id)
  )

  return (
    <Layout>
      <SEO
        title={[collection.name, "Built with Workers"].join(" · ")}
        description={collection.description}
      />

      <div className="BuiltWithWorkersPage ProjectPage">
        <div className="BuiltWithWorkersPage--hero">
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>

        <div className="Collections">
          <div className="Collections--collection">
            <div className="Collection">
              <div className="Collection--projects">
                {shuffle(projects).slice(0, 20).map((project, pi) => (
                  <div className="Collection--project" key={pi}>
                    <Project project={project} isInitialRoute={isInitialRoute()} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query CollectionPage($slug: String!) {
    allSanityProject {
      edges {
        node {
          ...Project
          id
        }
      }
    }

    sanityCollection(slug: { eq: $slug }) {
      id
      name
      description
      _rawProjects(resolveReferences: { maxDepth: 5 })
    }
  }
`

export default Collection
