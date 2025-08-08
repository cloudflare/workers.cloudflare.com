import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/cloudflare";

import Layout from "../components/layout";
import Project from "../components/project";
import { isInitialRoute } from "../components/route-update-history.js";

import { sortProjects } from "../utils";

import { getSanityClient } from "../lib/sanity";

import "../styles/built-with-workers-page.css";
import "../styles/collections.css";
import "../styles/collection.css";

export const meta = ({ data: { collection } }) => {
  const title = [collection.name, "Built with Workers", "Cloudflare Workers©"].join("・")

  return [
    { title },
    { name: "description", content: collection.description },
    { name: "og:title", content: title },
    { name: "og:description", content: collection.description },
    { name: "og:image", content: "https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: collection.description },
    { name: "twitter:image:src", content: "https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06" },
  ];
};

const query = `
  {
    "collection": *[_type == "collection" && slug == $slug][0] {
      ...,
      projects[]-> {
        ...,
        image { asset -> { url }}
      }
    }
  }
`

export const loader = async ({ params: { slug }, context }) => {
  const sanityToken = context.cloudflare?.env?.SANITY_TOKEN || context.env?.SANITY_TOKEN;
  const client = getSanityClient(sanityToken);
  const response = await client.fetch(query, { slug })
  return json(response);
};

const BuiltWithPage = () => {
  const { collection } = useLoaderData();

  return (
    <Layout>
      <div className="BuiltWithWorkersPage">
        <div className="BuiltWithWorkersPage--hero">
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>

        <div className="Collections">
          <div className="Collection">
            <div className="Collection--projects">
              {sortProjects(collection)
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
    </Layout>
  )
}

export default BuiltWithPage
