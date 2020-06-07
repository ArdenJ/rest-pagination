import React, { useState } from 'react'

import { handleLogin } from '../../auth/handleAuthentication'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>, u:string, p:string) => {
    e.preventDefault()
    handleLogin(u, p)
  }

  return (
    <div data-testid='login'>
      <form data-testid='form' onSubmit={(e) => handleSubmit(e, email, password)}>
        <input type='text' placeholder='email' onChange={(e) => { setEmail(e.target.value) }}/>
        {/* TODO: sanitise! */}
        <input type='text' placeholder='password' onChange={(e) => { setPassword(e.target.value) }}/>
        <input data-testid='submit' type='submit'/>
      </form>
      {email}
      {password}
    </div>
  )
}
