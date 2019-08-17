export interface Field {
  id: string
  label?: string
  placeholder?: string
  name?: string
  type?: string
  required?: boolean
  regX?: string
}

const REGX = {
  username: /^[a-zA-Z]+$/,
  password: /^[a-zA-Z0-9]+$/
}
export const FIELDS = {
  username: {
    id: 'username',
    label: 'Username',
    placeholder: 'Email or Username',
    required: true,
    regx: REGX.username
  },
  password: {
    id: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    regx: REGX.password
  },
  repeatPassword: {
    id: 'repeatPassword',
    label: 'Repeat Password',
    type: 'password',
    required: true,
    regx: REGX.password
  }
}
