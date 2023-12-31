export type UserDTO = {
  id: string
  username: string
  name: string
  isAdmin: boolean
}

export type CreateUserDTO = {
  username: string
  name: string
  password: string
  confirmPassword: string
}

export type AuthenticationUserDTO = {
  username: string
  password: string
}
