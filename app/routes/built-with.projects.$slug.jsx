import React from "react";
import uniq from 'lodash/uniq';
import { Stream } from "@cloudflare/stream-react";
import { Link, useLoaderData } from "@remix-run/react"
import { json, redirect } from "@remix-run/cloudflare";
import { ClientOnly } from "remix-utils/client-only"

import { cacheableUrl } from "../utils"
import { getSanityClient } from "../lib/sanity"
import Layout from "../components/layout"
import Markdown from "../components/markdown"
import RelatedProject from "../components/project"

import {
  normalizeCollection,
  PROJECTS_PER_COLLECTION,
} from "../utils"

import "@cloudflare/cloudflare-brand-assets/css/components/definition-list.css"
import "../styles/built-with-workers-page.css"
import "../styles/collection.css"
import "../styles/project-page.css"

export const meta = ({ data }) => {
  const { image, name, shortDescription } = data.project
  const title = `${name} ・ Built with Workers ・ Cloudflare Workers©`

  return [
    { title },
    { name: "description", content: shortDescription },
    { name: "og:title", content: title },
    { name: "og:description", content: shortDescription },
    { name: "og:image", content: cacheableUrl(image.asset.url) },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: shortDescription },
    { name: "twitter:image:src", content: cacheableUrl(image.asset.url) }
  ];
};

const getPrimaryLinkText = (linkType) => {
  switch (linkType) {
    case "announcement":
      return "Read announcement"
    case "blog":
      return "Read blog"
    case "code":
      return "Read code"
    case "demo":
      return "Demo"
    case "discord":
      return "Discord"
    case "linkedin":
      return "View on LinkedIn"
    case "twitter":
      return "View on Twitter"
    case "website":
      return "Visit website"
    case "youtube":
      return "YouTube"
    default:
      return "Learn more"
  }
}

const getLinkText = (linkType) => {
  switch (linkType) {
    case "announcement":
      return "Announcement"
    case "blog":
      return "Blog"
    case "code":
      return "Code"
    case "demo":
      return "Demo"
    case "discord":
      return "Discord"
    case "linkedin":
      return "LinkedIn"
    case "twitter":
      return "Twitter"
    case "website":
      return "Website"
    case "youtube":
      return "YouTube"
    default:
      return "Learn more"
  }
}

const Project = () => {
  const data = useLoaderData();

  let { collections, features, projects, project } = data;

  const collectionForProject = collections.find(
    (collection) =>
      collection.projects &&
      collection.projects
        .filter((project) => project)
        .find(({ id }) => id === project.id)
  )

  const relatedProjects = collectionForProject &&
    uniq(collectionForProject.projects).slice(0, PROJECTS_PER_COLLECTION)

  const featureIds = project.features ? project.features.map(({ _id }) => _id) : []
  const featuresForProject = features.filter(({ _id }) => featureIds.includes(_id))

  return (
    <Layout>
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
            </div>
          )}
        </div>

        <div className="ProjectPage--image">
          {project.stream_video_id ? (
            <Stream
              controls src={project.stream_video_id}
              letterboxColor="transparent"
              poster={cacheableUrl(project.image.asset.url)}
            />
          ) : (
            <img
              src={cacheableUrl(project.image.asset.url)}
              style={{ objectFit: "cover", width: "100%" }}
            />
          )}
        </div>

        {project.longDescription && (
          <div className="ProjectPage--body">
            <div className="ProjectPage--about">
              <Markdown children={project.longDescription} />
            </div>

            {(project.developer ||
              (project.links && project.links.length > 0)) && (
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
                        {featuresForProject.map(({ external_url, name, slug }) => (
                          <span
                            className="ProjectPage--metadata-link"
                            key={external_url || slug}
                          >
                            <a
                              className="Link Link-with-right-arrow"
                              href={external_url ? external_url : `/built-with/collections/${slug}`}
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
              {relatedProjects
                .map((project) => (
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

const query = `
  {
    "project": *[_type == "project" && slug == $slug]{
      ...,
      features[]->,
      image { asset -> { url }},
    }[0],

    "projects": *[_type == "project"],
    "collections": *[_type == "collection"]{
      ...,
      projects[] -> {
        ...,
        image { asset -> { url }}
      }
    },

    "features": *[_type == "feature"]
  }
`

export const loader = async ({ params: { slug }, context }) => {
  // In dev mode, pass token from context; in production it uses cloudflare:workers env
  const sanityToken = context?.cloudflare?.env?.SANITY_TOKEN || context?.env?.SANITY_TOKEN;
  const client = getSanityClient(sanityToken);
  const response = await client.fetch(query, { slug })
  if (!response.project) return redirect("/not-found")
  return json(response);
};

export default Project
