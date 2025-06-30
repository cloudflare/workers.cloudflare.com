export const client = {
  fetch: async (query: string, params?: any) => {
    // Since this runs on the server side, we need to construct the full URL
    // In production, this will be handled by the worker proxy
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8788' 
      : 'https://workers.cloudflare.com'
    
    const url = new URL('/api/sanity', baseUrl)
    url.searchParams.set('query', query)
    if (params) {
      url.searchParams.set('params', JSON.stringify(params))
    }

    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`Sanity query failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.result
  }
}
