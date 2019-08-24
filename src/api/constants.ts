export const VALID = {
  username: 'valid',
  password: 'password1'
}

export const SERVER_ERROR = {
  cannotAuthenticate: 'Cannot authenticate',
  usernamePasswordRequired: 'Must have username and password',
  passwordsMustMatch: 'Password and Repeat Password must match'
}

export async function stall(stallTime = 1000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}
