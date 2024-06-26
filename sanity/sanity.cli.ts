import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  graphql: [
    {
      id: 'production',
      workspace: 'production'
    },
    {
      id: 'development',
      workspace: 'development'
    }
  ],
  api: {
    projectId: '0s2zavz0',
    dataset: 'production'
  }
})
