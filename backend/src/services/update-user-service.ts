import { prisma } from '@/database/prisma'
import { type UpdateUserDTO, type UserDTO } from '@/dtos/user-dto'
import { AppError } from '@/errors/AppError'
import { UserMapper } from '@/mappers/user-mapper'

export class UpdateUserService {
  async execute ({ id, name, username }: UpdateUserDTO): Promise<UserDTO> {
    const user = await prisma.user.findFirst({ where: { id } })
    if (user === null) {
      throw new AppError('User not found', 404)
    }
    const usernameExists = await prisma.user.findFirst({ where: { username } })
    if (usernameExists !== null) {
      throw new AppError('Username already exists', 400)
    }
    const newUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        username
      }
    })
    const userDto = UserMapper.toDTO(newUser)
    return userDto
  }
}
