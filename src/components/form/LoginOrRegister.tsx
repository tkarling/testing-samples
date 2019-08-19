import React, { useState, useCallback } from 'react'
import { FIELDS } from './data'
import { Form, FormField } from './Common'
import useForm from './hooks/useForm'

export const TEST_ID = {
  container: 'container',
  logoutButton: 'logoutButton'
}

const Login = ({ onGoto, onLogin }: { onGoto?: any; onLogin?: any }) => {
  const { inputs, onChange, onSubmit } = useForm({
    callback: onLogin
  })

  return (
    <Form
      onSubmit={onSubmit}
      title="Sign In"
      link={{ label: 'Need an account? Sign Up', onClick: onGoto }}
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

const Register = ({ onGoto, onLogin }: { onGoto?: any; onLogin?: any }) => {
  const { inputs, onChange, onSubmit } = useForm({
    callback: onLogin
  })
  return (
    <Form
      onSubmit={onSubmit}
      title="Sign Up"
      link={{ label: 'Return to Sign In', onClick: onGoto }}
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

  const gotoLogin = useCallback(() => {
    setPage('login')
  }, [])
  const gotoRegister = useCallback(() => {
    setPage('register')
  }, [])
  const login = useCallback(
    ({ username, password }: { username: string; password: string }) => {
      if (username && password) {
        setUser(username)
        setPage('loggedIn')
      }
    },
    []
  )
  const logout = useCallback(() => {
    setUser(undefined)
    setPage('login')
  }, [])

  return { user, page, gotoLogin, gotoRegister, login, logout }
}

const LoginOrRegister = () => {
  const { user, page, gotoLogin, gotoRegister, login, logout } = usePage()

  return (
    <div data-testid={TEST_ID.container}>
      {!user && page === 'login' && (
        <Login onLogin={login} onGoto={gotoRegister} />
      )}
      {!user && page === 'register' && (
        <Register onLogin={login} onGoto={gotoLogin} />
      )}
      {user && <LoggedIn user={user} logout={logout} />}
    </div>
  )
}

export default LoginOrRegister
