import { prisma } from '@/database/prisma'
import { type CreateUserDTO, type UserDTO } from '@/dtos/user-dto'
import { AppError } from '@/errors/AppError'
import { UserMapper } from '@/mappers/user-mapper'
import bcrypt from 'bcrypt'

export class CreateUserService {
  async execute ({ confirmPassword, name, password, username }: CreateUserDTO): Promise<UserDTO> {
    if (password !== confirmPassword) {
      throw new AppError('confirmPassword must be equal to password', 400)
    }
    const userAlreadyExists = await prisma.user.findFirst({
      where: { username }
    })
    if (userAlreadyExists !== null) {
      throw new AppError('username already exists', 400)
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        password: passwordHash,
        username
      }
    })
    const userDTO = UserMapper.toDTO(user)
    return userDTO
  }
}
