import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {markdownSchema} from "sanity-plugin-markdown";

export default defineConfig([
  {
    name: 'production',
    title: 'Built with Workers (Production)',
    basePath: '/production',
  
    projectId: '0s2zavz0',
    dataset: 'production',

    scheduledPublishing: { enabled: false },
  
    plugins: [
      structureTool(), 
      markdownSchema(),
    ],
  
    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'development',
    title: 'Built with Workers (Development)',
    basePath: '/development',
  
    projectId: '0s2zavz0',
    dataset: 'development',

    scheduledPublishing: { enabled: false },
  
    plugins: [
      structureTool(), 
      markdownSchema(),
    ],
  
    schema: {
      types: schemaTypes,
    },
  }
])
