exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityCollection {
        edges {
          node {
            slug
          }
        }
      }

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

  const {
    data: { allSanityCollection, allSanityFeature, allSanityProject },
  } = result

  const collections = allSanityCollection.edges.map(({ node }) => node)
  collections.forEach((node, _index) => {
    const path = `/built-with/collections/${node.slug}`

    createPage({
      path,
      component: require.resolve("./src/templates/collection.js"),
      context: { slug: node.slug },
    })
  })

  const features = allSanityFeature.edges.map(({ node }) => node)
  features.forEach((node, _index) => {
    const path = `/built-with/features/${node.slug}`

    createPage({
      path,
      component: require.resolve("./src/templates/feature.js"),
      context: { slug: node.slug },
    })
  })

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
