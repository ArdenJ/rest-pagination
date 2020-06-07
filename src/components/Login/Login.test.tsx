/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Login } from './Login'

import { mocked } from 'ts-jest/utils'

jest.mock('node-fetch', () => {
  return jest.fn()
})

describe('When in view', () => {
  test('it renders', () => {
    const { getByTestId } = render(<Login />)
    expect(getByTestId(/login/i)).toBeInTheDocument()
  })
})

const setup = () => {
  const utils = render(<Login />)
  const form = utils.getByTestId(/login/i)
  const email = utils.getByPlaceholderText(/email/i)
  const password = utils.getByPlaceholderText(/password/i)
  const submit = utils.getByTestId(/submit/i)
  return {
    form,
    email,
    password,
    submit,
    ...utils,
  }
}

describe('when a user...', () => {
  describe('enters their email, and password', () => {
    test('the email is saved in state', () => {
      const { email, form } = setup()
      fireEvent.change(email, { target: { value: 'beep' } })
      expect(form).toHaveTextContent(/beep/i)
    })
    test('the password is saved in state', () => {
      const { password, form } = setup()
      fireEvent.change(password, { target: { value: 'boop' } })
      expect(form).toHaveTextContent(/boop/i)
    })
  })
  describe('submits their credentials', () => {
    beforeEach(() => {
      mocked(fetch).mockClear()
    })

    // FIXME: These fail, but also so does everything else and this is the only thing that even runs!?
    test('once', async () => {
      mocked(fetch).mockImplementation((): Promise<any> => {
        return Promise.resolve({
          json() {
            return Promise.resolve({ accessToken: '010101010' })
          }
        })
      })

      const { email, password, submit } = setup()
      fireEvent.change(email, { target: { value: 'beep' } })
      fireEvent.change(password, { target: { value: 'boop' } })
      fireEvent.click(submit)
      expect(mocked(fetch).mock.calls.length).toBe(1)
    })
  })
})
