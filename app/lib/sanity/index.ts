import { createClient } from '@sanity/client'

// This function should only be called server-side where env is available
export const getSanityClient = (token?: string) => {
  return createClient({
    projectId: '0s2zavz0',
    dataset: 'production',
    token: token,
    useCdn: true,
    apiVersion: '2024-05-31'
  })
}

// Legacy client for backwards compatibility - will be removed
export const client = getSanityClient()
