import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import BookmarkIcon from "../components/bookmark_icon"
import Layout from "../components/layout"
import Markdown from "../components/markdown"
import RelatedProject from "../components/project"
import SEO from "../components/seo"
import useBookmarkState from "../components/bookmark_state"

import { flatten, normalizeCollection, PROJECTS_PER_COLLECTION, shuffle } from "../utils"

import "../pages/built-with-workers-page.css"
import "./project-page.css"
import "@cloudflare/cloudflare-brand-assets/css/components/definition-list.css"

const getPrimaryLinkText = linkType => {
  switch (linkType) {
    case "announcement":
      return "Read announcement"
    case "blog":
      return "Read blog"
    case "code":
      return "Read code"
    case "linkedin":
      return "View on LinkedIn"
    case "twitter":
      return "View on Twitter"
    case "website":
      return "Visit website"
    default:
      return "Learn more"
  }
}

const getLinkText = linkType => {
  switch (linkType) {
    case "announcement":
      return "Announcement"
    case "blog":
      return "Blog"
    case "code":
      return "Code"
    case "linkedin":
      return "LinkedIn"
    case "twitter":
      return "Twitter"
    case "website":
      return "Website"
    default:
      return "Learn more"
  }
}

const BOOKMARK_STATE = {
  bookmarked: "bookmarked",
  loading: "loading",
  unbookmarked: "unbookmarked",
}

const Project = ({
  data: { allSanityCollection, allSanityFeature, allSanityProject, sanityProject: project },
}) => {
  const allCollections = flatten(allSanityCollection)
  let collections = allCollections.map(collection =>
    normalizeCollection(collection, flatten(allSanityProject))
  )

  const collectionForProject = collections.find(collection =>
    collection._rawProjects && collection._rawProjects.filter(project => project).find(({ id }) => id === project.id)
  )

  const featureIds = project._rawFeatures ? project._rawFeatures.map(({ id }) => id) : []
  const featuresForProject = allSanityFeature.edges.map(({ node }) => node).filter(
    ({ id }) => featureIds.includes(id)
  )

  const { bookmarked, loaded, toggleBookmark } = useBookmarkState(project.slug)

  const bookmarkState = loaded
    ? bookmarked
      ? BOOKMARK_STATE.bookmarked
      : BOOKMARK_STATE.unbookmarked
    : BOOKMARK_STATE.loading

  return (
    <Layout>
      <SEO
        title={[project.name, "Built with Workers"].join(" · ")}
        description={project.shortDescription}
        image={project.image.asset.url}
      />

      <div className="BuiltWithWorkersPage ProjectPage">
        <div className="ProjectPage--header">
          <div className="ProjectPage--header-content">
            <div className="ProjectPage--back-link">
              <Link
                className="Link Link-with-left-arrow Link-is-juicy"
                to="/built-with"
              >
                Back
              </Link>
            </div>
            <h2 className="ProjectPage--title">{project.name}</h2>
            <p className="ProjectPage--description">
              {project.shortDescription}
            </p>
          </div>

          {project.links && project.links.length > 0 && (
            <div className="ProjectPage--header-actions">
              <div className="ProjectPage--header-action-primary">
                {[project.links[0]].map(({ linkType, url }) => (
                  <a
                    className="ProjectPage--header-action-button Button Button-is-primary"
                    href={url}
                    key={url}
                  >
                    {getPrimaryLinkText(linkType)}
                  </a>
                ))}
              </div>

              <div
                className="ProjectPage--header-action-bookmark"
                data-bookmark-state={bookmarkState}
              >
                <button
                  className="ProjectPage--header-action-button Button"
                  onClick={toggleBookmark}
                >
                  <span className="ProjectPage--header-action-bookmark-icon">
                    <BookmarkIcon withGradientFill={bookmarked} />
                  </span>
                  <span className="ProjectPage--header-action-bookmark-text">
                    {bookmarked ? "Bookmarked" : "Bookmark"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="ProjectPage--image">
          <img src={project.image.asset.url} style={{ objectFit: "cover", width: "100%" }} />
        </div>

        {project.longDescription && (
          <div className="ProjectPage--body">
            <div className="ProjectPage--about">
              <Markdown children={project.longDescription} />
            </div>

            {(project.developer || project.links && project.links.length > 0) && (
              <div className="ProjectPage--metadata">
                <dl className="DefinitionList">
                  {project.developer && (
                    <>
                      <dt className="DefinitionList--term">Developer</dt>
                      <dd className="DefinitionList--definition">
                        {project.developer}
                      </dd>
                    </>
                  )}
                  {project.links && project.links.length > 0 && (
                    <>
                      <dt className="DefinitionList--term">Links</dt>
                      <dd className="DefinitionList--definition">
                        {project.links.map(({ linkType, url }) => (
                          <span
                            className="ProjectPage--metadata-link"
                            key={url}
                          >
                            <a
                              className="Link Link-with-right-arrow"
                              href={url}
                            >
                              {getLinkText(linkType)}
                            </a>
                          </span>
                        ))}
                      </dd>
                    </>
                  )}
                  {featuresForProject && featuresForProject.length > 0 && (
                    <>
                      <dt className="DefinitionList--term">Features</dt>
                      <dd className="DefinitionList--definition">
                        {featuresForProject.map(({ name, slug }) => (
                          <span
                            className="ProjectPage--metadata-link"
                            key={slug}
                          >
                            <a
                              className="Link Link-with-right-arrow"
                              href={`/built-with/features/${slug}`}
                            >
                              {name}
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
              {collectionForProject &&
                shuffle(collectionForProject._rawProjects)
                  .filter(({ id }) => id !== project.id)
                  .slice(0, PROJECTS_PER_COLLECTION)
                  .map(project => (
                    <div className="Collection--project" key={project.id}>
                      <RelatedProject project={project} />
                    </div>
                  ))}
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
      id
      _rawFeatures(resolveReferences: { maxDepth: 10 })
    }

    allSanityProject {
      edges {
        node {
          ...Project
          id
        }
      }
    }

    allSanityCollection {
      edges {
        node {
          ...Collection
          id
          _rawProjects(resolveReferences: { maxDepth: 10 })

          feature {
            ...Feature
            id
          }

          projects {
            ...Project
          }
        }
      }
    }

    allSanityFeature {
      edges {
        node {
          id
          name
          slug
        }
      }
    }

  }
`

export default Project
