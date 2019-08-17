import React, { useState, useCallback } from 'react'
import { FIELDS } from './data'
import { Form, FormField } from './Common'
import useForm from './hooks/useForm'

const Login = ({
  onChange,
  onSubmit,
  onGoto
}: {
  onChange?: any
  onSubmit?: any
  onGoto?: any
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      title="Sign In"
      link={{ label: 'Need an account? Sign Up', onClick: onGoto }}
    >
      <FormField field={FIELDS.username} onChange={onChange} />
      <FormField field={FIELDS.password} onChange={onChange} />
    </Form>
  )
}

const Register = ({
  onChange,
  onSubmit,
  onGoto
}: {
  onChange?: any
  onSubmit?: any
  onGoto?: any
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      title="Sign Up"
      link={{ label: 'Return to Sign In', onClick: onGoto }}
    >
      <FormField field={FIELDS.username} onChange={onChange} />
      <FormField field={FIELDS.password} onChange={onChange} />
      <FormField field={FIELDS.repeatPassword} onChange={onChange} />
    </Form>
  )
}

const usePage = () => {
  const [page, setPage] = useState('login')
  const gotoLogin = useCallback(() => {
    setPage('login')
  }, [])
  const gotoRegister = useCallback(() => {
    setPage('register')
  }, [])
  const gotoLoggedIn = useCallback(() => {
    setPage('loggedIn')
  }, [])
  return { page, gotoLogin, gotoRegister, gotoLoggedIn }
}

const LoginOrRegister = () => {
  const { page, gotoLogin, gotoRegister, gotoLoggedIn } = usePage()
  const { onChange, onSubmit } = useForm({
    callback: gotoLoggedIn
  })

  return (
    <div>
      {page === 'login' && (
        <Login onSubmit={onSubmit} onChange={onChange} onGoto={gotoRegister} />
      )}
      {page === 'register' && (
        <Register onSubmit={onSubmit} onChange={onChange} onGoto={gotoLogin} />
      )}
      {page === 'loggedIn' && (
        <div>
          <div>Logged in</div>
          <button onClick={gotoLogin}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default LoginOrRegister
