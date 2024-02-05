import { prisma } from '@/database/prisma'
import { type UserDTO } from '@/dtos/user-dto'
import { UserMapper } from '@/mappers/user-mapper'

export class ListUsersService {
  async execute (): Promise<UserDTO[]> {
    const users = await prisma.user.findMany({
      orderBy: [{ name: 'asc' }]
    })
    const usersDto = users.map(user => {
      return UserMapper.toDTO(user)
    })
    return usersDto
  }
}
