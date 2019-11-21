const flatten = set => set.edges.map(({ node }) => node)

const normalizeCollection = (collection, features, projects) => {
  let normalized = collection
  if (collection.feature) {
    const featureId = collection.feature.id
    const feature = features.find(({ id }) => featureId === id)
    normalized.feature = feature
    const featureProjects = projects.filter(project =>
      project.features.find(({ id }) => id === feature.id)
    )
    normalized.projects = featureProjects
  }

  if (collection.projects.length) {
    const collectionProjects = collection.projects.map(({ id }) =>
      projects.find(project => project.id === id)
    )
    normalized.projects = collectionProjects
  }

  return normalized
}

export { flatten, normalizeCollection }
