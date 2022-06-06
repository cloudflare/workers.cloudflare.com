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

// Fixing 3rd Party Modules: https://www.gatsbyjs.com/docs/debugging-html-builds/#fixing-third-party-modules

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /coveo-search-ui/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
