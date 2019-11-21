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

  const {
    data: { allSanityProject },
  } = result

  const projects = allSanityProject.edges.map(({ node }) => node)
  projects.forEach((node, _index) => {
    const path = `/built-with/projects/${node.slug}`

    createPage({
      path,
      component: require.resolve("./src/templates/project.js"),
      context: { slug: node.slug },
    })
  })
}
