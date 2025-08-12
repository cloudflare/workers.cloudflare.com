import { createClient } from '@sanity/client'
import { env } from 'cloudflare:workers'

// This function should only be called server-side where env is available
export const getSanityClient = (token?: string) => {
  return createClient({
    projectId: '0s2zavz0',
    dataset: 'production',
    token: token || env.SANITY_TOKEN,
    useCdn: true,
    apiVersion: '2024-05-31'
  })
}

