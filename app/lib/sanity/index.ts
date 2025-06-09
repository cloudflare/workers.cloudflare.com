import { createClient } from '@sanity/client'

export const createSanityClient = (token?: string) => {
  return createClient({
    projectId: '0s2zavz0',
    dataset: 'production',
    token,
    useCdn: true,
    apiVersion: '2024-05-31'
  })
}
