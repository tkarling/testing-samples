import React from 'react'
import { mount } from 'enzyme'
import { getText, click, setValue, submitForm } from '../../testHelpers.e'
import { TEST_ID as FORM_TEST_ID } from './Common'
import LoginOrRegister, { TEST_ID } from './LoginOrRegister'

const USERNAME = 'tuija'
const PASSWORD = '123'

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
  expectTexts(wrapper, ['Logged in', 'Logout', USERNAME])
}

const setup = () => mount(<LoginOrRegister />)

describe(LoginOrRegister, () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
    expectOnLoginPage(wrapper)
  })
  it('renders Login page', () => {
    expect.assertions(5)
    // assertions for this done in beforeEach
  })

  it('renders Register page', () => {
    expect.assertions(5 + 6)

    click(wrapper, FORM_TEST_ID.link)
    wrapper.update()
    expectOnRegisterPage(wrapper)
  })

  it('can go to register page and return to login page', () => {
    expect.assertions(5 + 6 + 5)

    click(wrapper, FORM_TEST_ID.link)
    wrapper.update()
    expectOnRegisterPage(wrapper)

    click(wrapper, FORM_TEST_ID.link)
    wrapper.update()
    expectOnLoginPage(wrapper)
  })

  // TODO: input fields
  it('can login', () => {
    expect.assertions(5 + 3)

    setValue(wrapper, 'username', USERNAME)
    setValue(wrapper, 'password', PASSWORD)
    submitForm(wrapper)
    wrapper.update()
    expectOnLoggedInPage(wrapper)
  })

  it('can register', () => {
    expect.assertions(5 + 6 + 3)

    click(wrapper, FORM_TEST_ID.link)
    wrapper.update()
    expectOnRegisterPage(wrapper)
    setValue(wrapper, 'username', USERNAME)
    setValue(wrapper, 'password', PASSWORD)
    setValue(wrapper, 'repeatPassword', PASSWORD)

    submitForm(wrapper)
    wrapper.update()
    expectOnLoggedInPage(wrapper)
  })

  it('can login and then logout', () => {
    expect.assertions(5 + 3 + 5)

    // login
    setValue(wrapper, 'username', USERNAME)
    setValue(wrapper, 'password', PASSWORD)
    submitForm(wrapper)
    wrapper.update()
    expectOnLoggedInPage(wrapper)

    // logout
    click(wrapper, TEST_ID.logoutButton)
    wrapper.update()
    expectOnLoginPage(wrapper)
  })
})
