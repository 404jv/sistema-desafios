import { prisma } from '@/database/prisma'
import { type CreateUserDTO, type UserDTO } from '@/dtos/user-dto'
import { AppError } from '@/errors/AppError'
import { UserMapper } from '@/mappers/user-mapper'

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
