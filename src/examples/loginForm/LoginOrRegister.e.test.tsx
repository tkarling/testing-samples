import React from 'react'
import {
  mount,
  click,
  setValue,
  submitForm,
  expectTexts,
  callSetImmediate
} from '../../testHelpers.e'
import { TEST_ID as FORM_TEST_ID } from '../../components/Form'
import LoginOrRegister, { TEST_ID } from './LoginOrRegister'
import { SERVER_ERROR as mockServerError, VALID } from '../../api/constants'

import { api1 } from '../../api/loginService'
jest.mock('../../api/loginService', () => {
  return {
    api1: {
      login: jest.fn(() => Promise.resolve({})),
      register: jest.fn(() => Promise.resolve({}))
    }
  }
})

const expectOnLoginPage = (wrapper: any) => {
  expectTexts(wrapper, [
    'Sign In',
    'Need an account?',
    'Username',
    'Password',
    'Submit'
  ])
}
const expectOnRegisterPage = (wrapper: any) => {
  expectTexts(wrapper, [
    'Sign Up',
    'Return',
    'Username',
    'Password',
    'Repeat Password',
    'Submit'
  ])
}
const expectOnLoggedInPage = (wrapper: any) => {
  expectTexts(wrapper, ['Logged in', 'Logout', VALID.username])
}

const gotoToRegisterPage = (wrapper: any) => {
  click(wrapper, FORM_TEST_ID.link)
  wrapper.update()
  expectOnRegisterPage(wrapper)
}

const setup = () => mount(<LoginOrRegister />)

describe(LoginOrRegister, () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
    expectOnLoginPage(wrapper)
  })

  describe('Basic rendering', () => {
    it('renders Login page', () => {
      expect.assertions(5)
      // assertions for this done in beforeEach
    })

    it('renders Register page', () => {
      expect.assertions(5 + 6)
      gotoToRegisterPage(wrapper)
    })

    it('can go to register page and return to login page', () => {
      expect.assertions(5 + 6 + 5)
      gotoToRegisterPage(wrapper)

      click(wrapper, FORM_TEST_ID.link)
      expectOnLoginPage(wrapper)
    })
  })

  describe('login/register/logout', () => {
    it('can login', async () => {
      expect.assertions(5 + 3)

      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      submitForm(wrapper)
      await callSetImmediate()
      wrapper.update()
      expectOnLoggedInPage(wrapper)
    })

    it('can register', async () => {
      expect.assertions(5 + 6 + 3)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      setValue(wrapper, 'repeatPassword', VALID.password)

      submitForm(wrapper)
      await callSetImmediate()
      wrapper.update()
      expectOnLoggedInPage(wrapper)
    })

    it('can login and then logout', async () => {
      expect.assertions(5 + 3 + 5)

      // login
      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      submitForm(wrapper)
      await callSetImmediate()
      wrapper.update()
      expectOnLoggedInPage(wrapper)

      // logout
      click(wrapper, TEST_ID.logoutButton)
      wrapper.update()
      expectOnLoginPage(wrapper)
    })
  })

  describe('server errors', () => {
    const submitToSeeError = async (error: string) => {
      submitForm(wrapper)
      await callSetImmediate()
      wrapper.update()
      expectTexts(wrapper, [error])
    }
    it('login: error for missing username', async () => {
      api1.login.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.cannotAuthenticate))
      )
      expect.assertions(5 + 1)
      setValue(wrapper, 'password', VALID.password)
      await submitToSeeError(mockServerError.cannotAuthenticate)
    })
    it('login: error for missing password', async () => {
      api1.login.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.cannotAuthenticate))
      )
      expect.assertions(5 + 1)
      setValue(wrapper, 'username', VALID.username)
      await submitToSeeError(mockServerError.cannotAuthenticate)
    })

    it('register: error for missing username', async () => {
      api1.register.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.usernamePasswordRequired))
      )
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'password', VALID.password)
      setValue(wrapper, 'repeatPassword', VALID.password)
      await submitToSeeError(mockServerError.usernamePasswordRequired)
    })
    it('register: error for missing password', async () => {
      api1.register.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.passwordsMustMatch))
      )
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID.username)
      await submitToSeeError(mockServerError.passwordsMustMatch)
    })
    it('register: error for password mismatch', async () => {
      api1.register.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.passwordsMustMatch))
      )
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      setValue(wrapper, 'repeatPassword', VALID.password + '1')
      await submitToSeeError(mockServerError.passwordsMustMatch)
    })
  })
})
