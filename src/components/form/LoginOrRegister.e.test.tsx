import React from 'react'
import { mount } from 'enzyme'
import { getText, click, setValue, submitForm } from '../../testHelpers.e'
import { TEST_ID as FORM_TEST_ID } from './Common'
import LoginOrRegister, {
  TEST_ID,
  SERVER_ERROR,
  VALID_USERNAME,
  VALID_PASSWORD
} from './LoginOrRegister'

const expectTexts = (wrapper: any, texts: string[]) => {
  texts.forEach(text =>
    expect(getText(wrapper, TEST_ID.container)).toContain(text)
  )
}
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
  expectTexts(wrapper, ['Logged in', 'Logout', VALID_USERNAME])
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
      wrapper.update()
      expectOnLoginPage(wrapper)
    })
  })

  describe('login/register/logout', () => {
    it('can login', () => {
      expect.assertions(5 + 3)

      setValue(wrapper, 'username', VALID_USERNAME)
      setValue(wrapper, 'password', VALID_PASSWORD)
      submitForm(wrapper)
      wrapper.update()
      expectOnLoggedInPage(wrapper)
    })

    it('can register', () => {
      expect.assertions(5 + 6 + 3)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID_USERNAME)
      setValue(wrapper, 'password', VALID_PASSWORD)
      setValue(wrapper, 'repeatPassword', VALID_PASSWORD)

      submitForm(wrapper)
      wrapper.update()
      expectOnLoggedInPage(wrapper)
    })

    it('can login and then logout', () => {
      expect.assertions(5 + 3 + 5)

      // login
      setValue(wrapper, 'username', VALID_USERNAME)
      setValue(wrapper, 'password', VALID_PASSWORD)
      submitForm(wrapper)
      wrapper.update()
      expectOnLoggedInPage(wrapper)

      // logout
      click(wrapper, TEST_ID.logoutButton)
      wrapper.update()
      expectOnLoginPage(wrapper)
    })
  })

  describe('server errors', () => {
    const submitToSeeError = (error: string) => {
      submitForm(wrapper)
      wrapper.update()
      expectTexts(wrapper, [error])
    }
    it('login: error for missing username', () => {
      expect.assertions(5 + 1)
      setValue(wrapper, 'password', VALID_PASSWORD)
      submitToSeeError(SERVER_ERROR.cannotAuthenticate)
    })
    it('login: error for missing password', () => {
      expect.assertions(5 + 1)
      setValue(wrapper, 'username', VALID_USERNAME)
      submitToSeeError(SERVER_ERROR.cannotAuthenticate)
    })

    it('register: error for missing username', () => {
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'password', VALID_PASSWORD)
      setValue(wrapper, 'repeatPassword', VALID_PASSWORD)
      submitToSeeError(SERVER_ERROR.usernamePasswordRequired)
    })
    it('register: error for missing password', () => {
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID_USERNAME)
      submitToSeeError(SERVER_ERROR.passwordsMustMatch)
    })
    it('register: error for password mismatch', () => {
      expect.assertions(6 + 5 + 1)

      gotoToRegisterPage(wrapper)
      setValue(wrapper, 'username', VALID_USERNAME)
      setValue(wrapper, 'password', VALID_PASSWORD)
      setValue(wrapper, 'repeatPassword', VALID_PASSWORD + '1')
      submitToSeeError(SERVER_ERROR.passwordsMustMatch)
    })
  })
})
