import React, { useState } from 'react'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>, u:string, p:string) => {
    e.preventDefault()
    console.log('username: ', u, 'password: ', p)
  }

  return (
    <div data-testid='login'>
      <form data-testid='form' onSubmit={(e) => handleSubmit(e, username, password)}>
        <input type='text' placeholder='username' onChange={(e) => { setUsername(e.target.value) }}/>
        {/* TODO: sanitise! */}
        <input type='text' placeholder='password' onChange={(e) => { setPassword(e.target.value) }}/>
        <input type='submit'/>
      </form>
      {username}
      {password}
    </div>
  )
}
