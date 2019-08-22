export const ACTION = {
  login: 'login',
  register: 'register',
  logout: 'logout',
  gotoLogin: 'gotoLogin',
  gotoRegister: 'gotoRegister'
}

export const VALID_USERNAME = 'valid'
export const VALID_PASSWORD = 'password1'

export const SERVER_ERROR = {
  cannotAuthenticate: 'Cannot authenticate',
  usernamePasswordRequired: 'Must have username and password',
  passwordsMustMatch: 'Password and Repeat Password must match'
}

const successfulLogin = ({ username }: { username: string }) => ({
  user: username,
  page: 'loggedIn',
  serverError: ''
})

const loginReducer = (
  state: {
    user: string
    page: 'login' | 'register' | 'loggedIn'
    serverError: string
  },
  {
    type,
    username,
    password,
    repeatPassword
  }: {
    type: string
    username?: string
    password?: string
    repeatPassword?: string
  }
) => {
  switch (type) {
    case ACTION.login:
      if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
        return { ...state, serverError: SERVER_ERROR.cannotAuthenticate }
      } else {
        return successfulLogin({ username })
      }
    case ACTION.register:
      if (!repeatPassword || repeatPassword !== password) {
        return { ...state, serverError: SERVER_ERROR.passwordsMustMatch }
      } else if (!username || !password) {
        return { ...state, serverError: SERVER_ERROR.usernamePasswordRequired }
      } else {
        return successfulLogin({ username })
      }
    case ACTION.logout:
      return { ...state, user: undefined, page: 'login' }
    case ACTION.gotoLogin:
      return { ...state, page: 'login', serverError: '' }
    case ACTION.gotoRegister:
      return { ...state, page: 'register', serverError: '' }

    default:
      console.log('unknown action ', type, username, password)
      return state
  }
}

export default loginReducer
