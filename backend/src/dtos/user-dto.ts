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

export type UpdateUserDTO = {
  id: string
  username: string
  name: string
}

export type AuthenticationUserDTO = {
  username: string
  password: string
}

export type AuthenticateResponseDTO = {
  token: string
  user: UserDTO
}
