import React from 'react'
import { Link, Route, useHistory, Redirect } from 'react-router-dom'

import { ENDPOINT } from './config'

import { Login } from './components/Login/Login'
import { checkLoginStatus } from './auth/handleAuthentication'
import { Dashboard } from './components/Dashboard/Dashboard'

export const App = () => {
  const history = useHistory()

  const handleRedirect = (route: string) => {
    return history.push(`/${route}`)
  }

  console.log('check status: ', checkLoginStatus('LOGGED_IN'))
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
      <PrivateRoute path='/dashboard'>
        <Dashboard url={ENDPOINT}/>
      </PrivateRoute>
    </div>
  )
}

const PrivateRoute = ({ children, path }:{children: JSX.Element, path: string}) => {
  return (
    <Route exact path={path}
      render={({ location }) =>
        checkLoginStatus('LOGGED_IN') ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
        )
      }
    />
  )
}
