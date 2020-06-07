import React from 'react'

import { Login } from './components/Login/Login'

export const App = (props) => {
  return (
    <div data-testid='app'>
      <Login />
    </div>
  )
}
