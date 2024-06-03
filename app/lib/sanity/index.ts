import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '0s2zavz0',
  dataset: 'production',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: true,
  apiVersion: '2024-05-31'
})
