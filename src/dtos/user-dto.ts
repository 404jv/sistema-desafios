export type UserDTO = {
  id: string
  username: string
  name: string
}

export type CreateUserDTO = {
  username: string
  name: string
  password: string
  confirmPassword: string
}
