import React, { useReducer } from 'react'
import { FIELDS } from './data'
import { Form, FormField } from './Common'
import useForm from './hooks/useForm'
import loginReducer, { ACTION } from './reducers/login'

export const TEST_ID = {
  container: 'container',
  logoutButton: 'logoutButton'
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

const LoginOrRegister = () => {
  const [{ user, page, serverError }, dispatch] = useReducer(loginReducer, {
    user: '',
    page: 'login',
    serverError: ''
  } as never)

  const login = ({
    username,
    password
  }: {
    username: string
    password: string
  }) => dispatch({ type: ACTION.login, username, password })
  const register = ({
    username,
    password,
    repeatPassword
  }: {
    username: string
    password: string
    repeatPassword: string
  }) => dispatch({ type: ACTION.register, username, password, repeatPassword })

  return (
    <div data-testid={TEST_ID.container}>
      {!user && page === 'login' && (
        <Login
          onLogin={login}
          onGoto={() => dispatch({ type: ACTION.gotoRegister })}
          serverError={serverError}
        />
      )}
      {!user && page === 'register' && (
        <Register
          onRegister={register}
          onGoto={() => dispatch({ type: ACTION.gotoLogin })}
          serverError={serverError}
        />
      )}
      {user && (
        <LoggedIn
          user={user}
          logout={() => dispatch({ type: ACTION.logout })}
        />
      )}
    </div>
  )
}

export default LoginOrRegister
