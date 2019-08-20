import React, { useState, useCallback } from 'react'
import { FIELDS } from './data'
import { Form, FormField } from './Common'
import useForm from './hooks/useForm'

export const TEST_ID = {
  container: 'container',
  logoutButton: 'logoutButton'
}

export const SERVER_ERROR = {
  usernamePasswordRequired: 'Must have username and password',
  passwordsMustMatch: 'Password and Repeat Password must match'
}

const Login = ({
  onGoto,
  onLogin,
  serverError
}: {
  onGoto?: any
  onLogin?: any
  serverError?: string
}) => {
  const { inputs, onChange, onSubmit } = useForm({
    callback: onLogin
  })

  return (
    <Form
      onSubmit={onSubmit}
      title="Sign In"
      link={{ label: 'Need an account? Sign Up', onClick: onGoto }}
      serverError={serverError}
    >
      <FormField
        {...FIELDS.username}
        value={inputs.username}
        onChange={onChange}
      />
      <FormField
        {...FIELDS.password}
        value={inputs.password}
        onChange={onChange}
      />
    </Form>
  )
}

const Register = ({
  onGoto,
  onRegister,
  serverError
}: {
  onGoto?: any
  onRegister?: any
  serverError?: string
}) => {
  const { inputs, onChange, onSubmit } = useForm({
    callback: onRegister
  })
  return (
    <Form
      onSubmit={onSubmit}
      title="Sign Up"
      link={{ label: 'Return to Sign In', onClick: onGoto }}
      serverError={serverError}
    >
      <FormField
        {...FIELDS.username}
        value={inputs.username}
        autoComplete="off"
        onChange={onChange}
      />
      <FormField
        {...FIELDS.password}
        value={inputs.password}
        autoComplete="off"
        onChange={onChange}
      />
      <FormField
        {...FIELDS.repeatPassword}
        value={inputs.repeatPassword}
        autoComplete="off"
        onChange={onChange}
      />
    </Form>
  )
}

const LoggedIn = ({ user, logout }: { user: string; logout: any }) => (
  <div>
    <div>Logged in as {user}</div>
    <button data-testid={TEST_ID.logoutButton} onClick={logout}>
      Logout
    </button>
  </div>
)

const usePage = () => {
  const [user, setUser] = useState()
  const [page, setPage] = useState('login')
  const [serverError, setServerError] = useState('')

  const gotoLogin = () => {
    setPage('login')
    setServerError('')
  }
  const gotoRegister = () => {
    setPage('register')
    setServerError('')
  }
  const login = ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    if (username && password) {
      setUser(username)
      setPage('loggedIn')
      setServerError('')
      return true
    } else {
      setServerError(SERVER_ERROR.usernamePasswordRequired)
      return false
    }
  }
  const register = ({
    username,
    password,
    repeatPassword
  }: {
    username: string
    password: string
    repeatPassword: string
  }) => {
    if (!repeatPassword || repeatPassword !== password) {
      setServerError(SERVER_ERROR.passwordsMustMatch)
      return false
    }
    return login({ username, password })
  }
  const logout = () => {
    setUser(undefined)
    setPage('login')
  }

  return {
    user,
    page,
    serverError,
    gotoLogin,
    gotoRegister,
    login,
    register,
    logout
  }
}

const LoginOrRegister = () => {
  const {
    user,
    page,
    serverError,
    gotoLogin,
    gotoRegister,
    login,
    register,
    logout
  } = usePage()

  return (
    <div data-testid={TEST_ID.container}>
      {!user && page === 'login' && (
        <Login
          onLogin={login}
          onGoto={gotoRegister}
          serverError={serverError}
        />
      )}
      {!user && page === 'register' && (
        <Register
          onRegister={register}
          onGoto={gotoLogin}
          serverError={serverError}
        />
      )}
      {user && <LoggedIn user={user} logout={logout} />}
    </div>
  )
}

export default LoginOrRegister
