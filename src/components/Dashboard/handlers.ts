/* eslint-disable quote-props */
export const fetchApps = async (url: string, token: string | null): Promise<any> => {
  const customHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `${token}`,
  }
  const result = fetch(`${url}/apps`, {
    method: 'GET',
    headers: customHeaders
  })
    .then(res => {
      if (res.status === 200) return res.json()
      return 'error'
    })
    .then(data => {
      return data
    })
    .catch(e => {
      throw new Error('Daymn, something went wrong')
    })
  return await result
}
