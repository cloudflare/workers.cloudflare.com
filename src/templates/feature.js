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

const Feature = ({ data }) => {
  const { allSanityProject, sanityFeature: feature } = data
  console.log(feature)
  const projects = allSanityProject.edges.map(({ node }) => node)

  const featureProjects = projects.filter(
    (project) =>
      project &&
      project._rawFeatures &&
      project._rawFeatures.map(({ id: fId }) => fId).includes(feature.id)
  )

  return (
    <Layout>
      <SEO
        title={[feature.name, "Built with Workers"].join(" · ")}
        description={feature.description}
      />

      <div className="BuiltWithWorkersPage ProjectPage">
        <div className="BuiltWithWorkersPage--hero">
          <h1>{feature.name}</h1>
          <p>{feature.description}</p>
        </div>

        <div className="Collections">
          <div className="Collections--collection">
            <div className="Collection">
              <div className="Collection--projects">
                {shuffle(featureProjects)
                  .slice(0, 20)
                  .map((project, pi) => (
                    <div className="Collection--project" key={pi}>
                      <Project
                        project={project}
                        isInitialRoute={isInitialRoute()}
                      />
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
          _rawFeatures(resolveReferences: { maxDepth: 10 })
        }
      }
    }

    sanityFeature(slug: { eq: $slug }) {
      name
      description
      id
      slug
    }
  }
`

export default Feature
