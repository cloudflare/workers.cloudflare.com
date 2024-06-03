import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/cloudflare";

import Layout from "../components/layout";
import Project from "../components/project";
import { isInitialRoute } from "../components/route-update-history.js";

import { client } from "../lib/sanity";
import { PROJECTS_PER_COLLECTION, shuffle } from "../utils";

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

export const query = `
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

export const loader = async ({ params: { slug } }) => {
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
              {shuffle(collection.projects)
                .slice(0, PROJECTS_PER_COLLECTION)
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
