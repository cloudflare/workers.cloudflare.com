import React from "react"
import { Link } from "gatsby"

import Feature from "../components/feature"
import Layout from "../components/layout"
import Project from "../components/project"
import SEO from "../components/seo"

const featured = [
  {
    title: "Project One",
    description: "Description",
    features: [
      {
        name: "Workers KV",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
  {
    title: "Project Two",
    description: "Description",
    features: [
      {
        name: "Workers KV",
      },
      {
        name: "HTMLRewriter",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description",
    features: [
      {
        name: "HTMLRewriter",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
]

const projects = [
  {
    title: "Project Four",
    description: "Description",
    features: [
      {
        name: "Workers KV",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
  {
    title: "Project Five",
    description: "Description",
    features: [
      {
        name: "Workers KV",
      },
      {
        name: "HTMLRewriter",
      },
    ],
  },
  {
    title: "Project Six",
    description: "Description",
    features: [
      {
        name: "HTMLRewriter",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
  {
    title: "Project Seven",
    description: "Description",
    features: [
      {
        name: "HTMLRewriter",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
  {
    title: "Project Eight",
    description: "Description",
    features: [
      {
        name: "Workers KV",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
  {
    title: "Project Nine",
    description: "Description",
    features: [
      {
        name: "Workers KV",
      },
      {
        name: "HTMLRewriter",
      },
    ],
  },
  {
    title: "Project Ten",
    description: "Description",
    features: [
      {
        name: "HTMLRewriter",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
  {
    title: "Project Eleven",
    description: "Description",
    features: [
      {
        name: "HTMLRewriter",
      },
      {
        name: "Workers Sites",
      },
    ],
  },
]

const features = [
  {
    title: "Workers KV",
    description: "Description",
  },
  {
    title: "Workers Sites",
    description: "Description",
  },
  {
    title: "HTML Rewriter",
    description: "Description",
  },
  {
    title: "Feature #4",
    description: "Description",
  },
]

const IndexPage = () => (
  <Layout>
    <SEO />
    <div className="featured__container container mx-auto">
      {featured.map(project => (
        <Project variant="featured" project={project} />
      ))}
    </div>

    <div className="features__container">
      <div className="container mx-auto">
        <h2>Learn more</h2>
        <div className="features__collection">
          {features.map(feature => (
            <Feature feature={feature} />
          ))}
        </div>
      </div>
    </div>

    <div className="projects__container">
      <div className="container mx-auto">
        <div className="projects__collection">
          {projects.map(project => (
            <Project project={project} />
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
