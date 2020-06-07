/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Login } from './Login'

describe('When in view', () => {
  test('it renders', () => {
    const { getByTestId } = render(<Login />)
    expect(getByTestId(/login/i)).toBeInTheDocument()
  })
})

const setup = () => {
  const utils = render(<Login />)
  const form = utils.getByTestId(/login/i)
  const username = utils.getByPlaceholderText(/username/i)
  const password = utils.getByPlaceholderText(/password/i)
  return {
    form,
    username,
    password,
    ...utils,
  }
}

describe('when a user...', () => {
  describe('enters their username, and password', () => {
    test('the username is saved in state', () => {
      const { username, form } = setup()
      fireEvent.change(username, { target: { value: 'beep' } })
      expect(form).toHaveTextContent(/beep/i)
    })
    test('the password is saved in state', () => {
      const { password, form } = setup()
      fireEvent.change(password, { target: { value: 'boop' } })
      expect(form).toHaveTextContent(/boop/i)
    })
  })
})
