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

export const getUsers = async (url: string, appId: string, token: string | null, page: number): Promise<any> => {
  const customHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `${token}`,
  }
  const result = fetch(`${url}/apps/${appId}/users?offset=${(page * 25) - 25}`, {
    method: 'GET',
    headers: customHeaders
  })
    .then(res => {
      if (res.status === 200) return res.json()
      return 'error'
    })
    .then(data => {
      // if the data from the API has users to display return them
      // else return a message 'LAST' message
      return data.users.length > 0 ? data : 'LAST'
    })
    .catch(e => {
      throw new Error('Daymn, something went wrong')
    })
  return await result
}
