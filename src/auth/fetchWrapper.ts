export const goFetch = async (endpoint: string, method: 'GET' | 'POST' | 'PUT', { ...customConfig }): Promise<void | [] | ErrorConstructor> => {
  const headers = { 'Content-Type': 'application/json' }
  const config = {
    method: method,
    body: customConfig.body,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }
  return await window.fetch(endpoint, config).then(
    res => {
      const data = res.json()
      return res.ok ? data : new Error(`Unable to resolve: ${data}`)
    }
  )
}
