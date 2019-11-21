exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
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
