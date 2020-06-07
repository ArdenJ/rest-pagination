import { ENDPOINT } from './../config'

// TODO: handle authentication w/ simple backend server:
// https://medium.com/@benjamin.botto/secure-access-token-storage-with-single-page-applications-part-2-921fce24e1b5

// TODO: DO NOT LEAVE IN LOCAL STORAGE. At bear min it should perssist in a singleton

// making a post request to /login will return an 'accessToken' that which can be used to authenticate
// other requests. N.B. the token has an option expiry param (60s etc.) which can be used to test re-auth
export const handleLogin = async (email:string, password:string) => {
  await fetch(`${ENDPOINT}login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `{"email":"${email}","password":"${password}"}`
  })
    .then(res => {
      if (res.status === 200) return res.json()
      throw new Error('Something went wrong 😢')
    })
    .then(res => {
      const TOKEN = (function() {
        let instance

        const createInstance = () => {
          // eslint-disable-next-line no-new-object
          return new Object(res.accessToken)
        }

        return {
          getInstance: function () {
            if (!instance) {
              instance = createInstance()
            }
            return instance
          }
        }
      })()
      return TOKEN.getInstance()
    }).catch(e => {
      console.error(e)
    })
}
