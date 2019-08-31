export const ACTION = {
  login: 'login',
  logout: 'logout',
  gotoLogin: 'gotoLogin',
  gotoRegister: 'gotoRegister'
}

const loginReducer = (
  state: {
    user: string
    page: 'login' | 'register' | 'loggedIn'
  },
  {
    type,
    username
  }: {
    type: string
    username?: string
  }
) => {
  switch (type) {
    case ACTION.login:
      if (username) {
        return { user: username, page: 'loggedIn' }
      } else {
        console.error('Should not login with nonexistent username ', username)
        return state
      }
    case ACTION.logout:
      return { ...state, user: undefined, page: 'login' }
    case ACTION.gotoLogin:
      return { ...state, page: 'login' }
    case ACTION.gotoRegister:
      return { ...state, page: 'register' }

    default:
      console.log('unknown action ', type, username)
      return state
  }
}

export default loginReducer
