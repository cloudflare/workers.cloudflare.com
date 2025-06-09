import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/cloudflare";

import Layout from "../components/layout";
import Project from "../components/project";
import { isInitialRoute } from "../components/route-update-history.js";

import { createSanityClient } from "../lib/sanity";
import { PROJECTS_PER_COLLECTION, sortAndLimitProjects } from "../utils";

import "../styles/built-with-workers-page.css";
import "../styles/collections.css";
import "../styles/collection.css";

export const meta = () => {
  return [
    { title: "Built with Workers ・ Cloudflare Workers©" },
    { name: "description", content: "Build your next application with Cloudflare Workers" },
    { name: "og:title", content: "Built with Workers ・ Cloudflare Workers©" },
    { name: "og:description", content: "Build your next application with Cloudflare Workers" },
    { name: "og:image", content: "https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06" },
    { name: "twitter:title", content: "Built with Workers ・ Cloudflare Workers©" },
    { name: "twitter:description", content: "Build your next application with Cloudflare Workers" },
    { name: "twitter:image:src", content: "https://repository-images.githubusercontent.com/215130914/0a128400-41f5-11ea-8dc8-b1c09a48fa06" },
  ];
};

export const query = `
  {
    "layout": *[_type == "layout" && page_id == "homepage"][0] {
      collections[]-> {
        ...,
        projects[]-> {
          ...,
          image { asset -> { url }}
        }
      }
    }
  }
`

export const loader = async ({ context }) => {
  const client = createSanityClient(context.env.SANITY_API_TOKEN);
  const response = await client.fetch(query)
  return json(response);
};

const BuiltWithPage = () => {
  const { layout } = useLoaderData();
  let collections = layout ? layout.collections : []

  return (
    <Layout>
      <div className="BuiltWithWorkersPage">
        <div className="BuiltWithWorkersPage--hero">
          <h1>Built with Cloudflare</h1>
          <p>Projects running on the Developer Platform</p>
          <p>
            <a
              className="Button Button-is-primary"
              href="https://forms.gle/hK4wNQeXtAUR6Ud19"
            >
              Submit a project
            </a>
          </p>
        </div>

        <div className="Collections">
          {collections.map((collection, ci) => (
            <div className="Collections--collection" key={ci}>
              <div className="Collection">
                <div className="Collection--header">
                  <h2 className="Collection--title">
                    <Link to={`/built-with/collections/${collection.slug}`}>
                      {collection.name}
                    </Link>
                  </h2>
                </div>

                <div className="Collection--projects">
                  {sortAndLimitProjects(collection)
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
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default BuiltWithPage
