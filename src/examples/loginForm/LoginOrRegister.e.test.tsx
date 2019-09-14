import React from 'react'
import { mount } from 'enzyme'
import { click, setValue, submitForm, expectTexts } from '../../testHelpers.e'
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
    it('can login', done => {
      expect.assertions(5 + 3)

      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      submitForm(wrapper)
      setImmediate(() => {
        wrapper.update()
        expectOnLoggedInPage(wrapper)
        done()
      })
    })

    it('can register', done => {
      expect.assertions(5 + 6 + 3)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      setValue(wrapper, 'repeatPassword', VALID.password)

      submitForm(wrapper)
      setImmediate(() => {
        wrapper.update()
        expectOnLoggedInPage(wrapper)
        done()
      })
    })

    it('can login and then logout', done => {
      expect.assertions(5 + 3 + 5)

      // login
      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      submitForm(wrapper)
      setImmediate(() => {
        wrapper.update()
        expectOnLoggedInPage(wrapper)

        // logout
        click(wrapper, TEST_ID.logoutButton)
        wrapper.update()
        expectOnLoginPage(wrapper)
        done()
      })
    })
  })

  describe('server errors', () => {
    const submitToSeeError = (error: string, done: any) => {
      submitForm(wrapper)
      setImmediate(() => {
        wrapper.update()
        expectTexts(wrapper, [error])
        done()
      })
    }
    it('login: error for missing username', done => {
      api1.login.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.cannotAuthenticate))
      )
      expect.assertions(5 + 1)
      setValue(wrapper, 'password', VALID.password)
      submitToSeeError(mockServerError.cannotAuthenticate, done)
    })
    it('login: error for missing password', done => {
      api1.login.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.cannotAuthenticate))
      )
      expect.assertions(5 + 1)
      setValue(wrapper, 'username', VALID.username)
      submitToSeeError(mockServerError.cannotAuthenticate, done)
    })

    it('register: error for missing username', done => {
      api1.register.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.usernamePasswordRequired))
      )
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'password', VALID.password)
      setValue(wrapper, 'repeatPassword', VALID.password)
      submitToSeeError(mockServerError.usernamePasswordRequired, done)
    })
    it('register: error for missing password', done => {
      api1.register.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.passwordsMustMatch))
      )
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID.username)
      submitToSeeError(mockServerError.passwordsMustMatch, done)
    })
    it('register: error for password mismatch', done => {
      api1.register.mockImplementation(() =>
        Promise.reject(new Error(mockServerError.passwordsMustMatch))
      )
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID.username)
      setValue(wrapper, 'password', VALID.password)
      setValue(wrapper, 'repeatPassword', VALID.password + '1')
      submitToSeeError(mockServerError.passwordsMustMatch, done)
    })
  })
})
