import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Clap from "../components/clap"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Markdown from "../components/markdown"

import "../pages/built-with-workers-page.css"
import "./project-page.css"
import "../vendor/workers-brand-assets/css/components/definition-list.css"

const getPrimaryLinkText = (linkType) => {
  switch (linkType) {
    case "website": return "Visit website";
    case "twitter": return "View on Twitter";
    case "code": return "Read code";
    case "blog-post": return "Read announcement";
    default: return "Learn more";
  }
}

const getLinkText = (linkType) => {
  switch (linkType) {
    case "website": return "Website";
    case "twitter": return "Twitter";
    case "code": return "Code";
    case "blog-post": return "Announcement";
    default: return "Learn more";
  }
}

const Project = ({ data: { sanityProject: project } }) => {
  return (
    <Layout>
      <SEO title={project.name} />

      <div className="BuiltWithWorkersPage ProjectPage">
        <div className="ProjectPage--header">
          <div className="ProjectPage--header-content">
            <h2 className="ProjectPage--title">{project.name}</h2>
            <p className="ProjectPage--description">{project.shortDescription}</p>
            <p className="ProjectPage--description"><Clap project={project} /></p>
          </div>

          {project.links.length > 0 && (
            <div className="ProjectPage--header-action">
              {[project.links[0]].map(({ linkType, url }) => (
                <a className="ProjectPage--header-action-button Button Button-is-primary" href={url}>
                  {getPrimaryLinkText(linkType)}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="ProjectPage--image">
          <Img fluid={project.image.asset.fluid} />
        </div>

        {project.longDescription && (
          <div className="ProjectPage--body">
            <div className="ProjectPage--about">
              <Markdown source={project.longDescription}/>
            </div>

            {(project.developer || project.links.length > 0) && (
              <div className="ProjectPage--metadata">
                <dl className="DefinitionList">
                  <dt className="DefinitionList--term">Developer</dt>
                  <dd className="DefinitionList--definition">Cloudflare</dd>

                  {project.links.length > 0 && (
                    <>
                      <dt className="DefinitionList--term">Links</dt>
                      <dd className="DefinitionList--definition">
                        {project.links.map(({ linkType, url }) => (
                          <span className="ProjectPage--metadata-link">
                            <a className="Link Link-with-right-arrow" href={url}>
                              {getLinkText(linkType)}
                            </a>
                          </span>
                        ))}
                      </dd>
                    </>
                  )}
                </dl>
              </div>
            )}
          </div>
        )}

        <div className="ProjectPage--more">
          <div className="Collection Collection-is-centered">
            <div className="Collection--header">
              <h2 className="Collection--title">Also built with Workers...</h2>
            </div>

            <div className="Collection--projects">
              <div className="Collection--project">
                <a className="Project---link Project---link-fills-height">
                  <div className="Project Project-fills-height">
                    <div className="Project--image">
                      <img title="ProPublica screenshot" src="https://cdn.sanity.io/images/0s2zavz0/production/4f5788b38acdf7bed5674c6ff8940c0d1d8c5dad-2880x1800.png?w=880&h=550&fit=crop&fm=webp"/>
                    </div>
                    <div className="Project--content">
                      <h2 className="Project--title">ProPublica</h2>
                      <p className="Project--description">An independent, non-profit newsroom that produces investigative journalism in the public interest.</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="Collection--project">
                <a className="Project---link Project---link-fills-height">
                  <div className="Project Project-fills-height">
                    <div className="Project--image">
                      <img title="ProPublica screenshot" src="https://cdn.sanity.io/images/0s2zavz0/production/4f5788b38acdf7bed5674c6ff8940c0d1d8c5dad-2880x1800.png?w=880&h=550&fit=crop&fm=webp"/>
                    </div>
                    <div className="Project--content">
                      <h2 className="Project--title">ProPublica</h2>
                      <p className="Project--description">An independent, non-profit newsroom that produces investigative journalism in the public interest.</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="Collection--project">
                <a className="Project---link Project---link-fills-height">
                  <div className="Project Project-fills-height">
                    <div className="Project--image">
                      <img title="ProPublica screenshot" src="https://cdn.sanity.io/images/0s2zavz0/production/4f5788b38acdf7bed5674c6ff8940c0d1d8c5dad-2880x1800.png?w=880&h=550&fit=crop&fm=webp"/>
                    </div>
                    <div className="Project--content">
                      <h2 className="Project--title">ProPublica</h2>
                      <p className="Project--description">An independent, non-profit newsroom that produces investigative journalism in the public interest.</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="Collection--project">
                <a className="Project---link Project---link-fills-height">
                  <div className="Project Project-fills-height">
                    <div className="Project--image">
                      <img title="ProPublica screenshot" src="https://cdn.sanity.io/images/0s2zavz0/production/4f5788b38acdf7bed5674c6ff8940c0d1d8c5dad-2880x1800.png?w=880&h=550&fit=crop&fm=webp"/>
                    </div>
                    <div className="Project--content">
                      <h2 className="Project--title">ProPublica</h2>
                      <p className="Project--description">An independent, non-profit newsroom that produces investigative journalism in the public interest.</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="Collection--project">
                <a className="Project---link Project---link-fills-height">
                  <div className="Project Project-fills-height">
                    <div className="Project--image">
                      <img title="ProPublica screenshot" src="https://cdn.sanity.io/images/0s2zavz0/production/4f5788b38acdf7bed5674c6ff8940c0d1d8c5dad-2880x1800.png?w=880&h=550&fit=crop&fm=webp"/>
                    </div>
                    <div className="Project--content">
                      <h2 className="Project--title">ProPublica</h2>
                      <p className="Project--description">An independent, non-profit newsroom that produces investigative journalism in the public interest.</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="Collection--project">
                <a className="Project---link Project---link-fills-height">
                  <div className="Project Project-fills-height">
                    <div className="Project--image">
                      <img title="ProPublica screenshot" src="https://cdn.sanity.io/images/0s2zavz0/production/4f5788b38acdf7bed5674c6ff8940c0d1d8c5dad-2880x1800.png?w=880&h=550&fit=crop&fm=webp"/>
                    </div>
                    <div className="Project--content">
                      <h2 className="Project--title">ProPublica</h2>
                      <p className="Project--description">An independent, non-profit newsroom that produces investigative journalism in the public interest.</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="Collection--spacer"/>
            </div>
          </div>
        </div>
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
