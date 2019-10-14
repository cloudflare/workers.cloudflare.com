exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityFeature {
        edges {
          node {
            slug
          }
        }
      }
      allSanityProject {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const features = result.data.allSanityFeature.edges.map(({ node }) => node)
  features.forEach((node, index) => {
    const path = `/features/${node.slug}`

    createPage({
      path,
      component: require.resolve("./src/templates/feature.js"),
      context: { slug: node.slug },
    })
  })

  const projects = result.data.allSanityProject.edges.map(({ node }) => node)
  projects.forEach((node, index) => {
    const path = `/projects/${node.slug}`

    createPage({
      path,
      component: require.resolve("./src/templates/project.js"),
      context: { slug: node.slug },
    })
  })
}
