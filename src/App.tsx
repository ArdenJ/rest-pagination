import React from 'react'
import { Link, Route, useHistory, Redirect } from 'react-router-dom'

import { ENDPOINT } from './config'

import { Login } from './components/Login/Login'
import { checkLoginStatus } from './auth/handleAuthentication'
import { Dashboard } from './components/Dashboard/Dashboard'

export const App = () => {
  const history = useHistory()

  const handleRedirect = (route: string) => {
    history.push(`/${route}`)
  }

  return (
    <div data-testid='app'>
      <div>
        <Link to='/'>home</Link>
        <Link to='/login'>login</Link>
      </div>
      <Route exact path='/'>
        <h1>yo go log in</h1>
      </Route>
      <Route exact path='/login'>
        {
          checkLoginStatus('LOGGED_OUT')
            ? <Login url={ENDPOINT} handleRedirect={handleRedirect}/>
            : <Redirect to='/dashboard' />
        }
      </Route>
      <Route exact path='/dashboard'>
        {
          checkLoginStatus('LOGGED_IN')
            ? (
              <>
                <Dashboard url={ENDPOINT} handleRedirect={handleRedirect}/>
              </>
            )
            : <Redirect to='/login'/>
        }
      </Route>
    </div>
  )
}
