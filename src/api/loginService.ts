import { SERVER_ERROR, VALID, stall } from './constants'

export class loginServiceApi {
  successfulLogin = ({ username }: { username: string }) => ({
    user: username,
    page: 'loggedIn',
    serverError: ''
  })

  login = (username: string, password: string) =>
    stall().then(() => {
      if (username !== VALID.username || password !== VALID.password) {
        throw new Error(SERVER_ERROR.cannotAuthenticate)
      } else {
        return {}
      }
    })

  register = (username: string, password: string, repeatPassword: string) =>
    stall().then(() => {
      if (!repeatPassword || repeatPassword !== password) {
        throw new Error(SERVER_ERROR.passwordsMustMatch)
      } else if (!username || !password) {
        throw new Error(SERVER_ERROR.usernamePasswordRequired)
      } else {
        return {}
      }
    })
}

export const api2 = new loginServiceApi()
export const api1 = new loginServiceApi()
