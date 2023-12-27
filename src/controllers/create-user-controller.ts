import { prisma } from '@/database/prisma'
import { AppError } from '@/errors/AppError'
import { type User } from '@prisma/client'
import { type Request, type Response } from 'express'

type UserDTO = {
  id: string
  username: string
  name: string
}

export class UserMapper {
  static toDTO (user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      name: user.name
    }
  }
}

export class CreateUserService {
  async execute (name: string, username: string, password: string, confirmPassword: string): Promise<UserDTO> {
    if (password !== confirmPassword) {
      throw new AppError('confirmPassword must be equal to password', 400)
    }
    const user = await prisma.user.create({
      data: {
        name,
        password,
        username
      }
    })
    const userDTO = UserMapper.toDTO(user)
    return userDTO
  }
}

export class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, username, password, confirmPassword } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute(name as string, username as string, password as string, confirmPassword as string)
    return response.status(201).json(user)
  }
}
