import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";

import Layout from "../components/layout";
import Project from "../components/project";
import { isInitialRoute } from "../components/route-update-history.js";

import { client } from "../lib/sanity";
import { PROJECTS_PER_COLLECTION, shuffle } from "../utils";

import "../styles/built-with-workers-page.css";
import "../styles/collections.css";
import "../styles/collection.css";

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

export const loader = async () => {
  const response = await client.fetch(query)
  return json(response);
};

const BuiltWithPage = () => {
  const { layout } = useLoaderData();
  let collections = layout.collections

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
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default BuiltWithPage
