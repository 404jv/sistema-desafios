import { prisma } from '@/database/prisma'
import { type UserDTO } from '@/dtos/user-dto'
import { UserMapper } from '@/mappers/user-mapper'

export class ListUsersService {
  async execute (): Promise<UserDTO[]> {
    const users = await prisma.user.findMany({
      orderBy: [{ name: 'asc' }],
      include: {
        userChallenge: true
      }
    })
    const usersDto = users.map(user => {
      const userDto = UserMapper.toDTO(user)
      userDto.totalChallenges = user.userChallenge.length
      return userDto
    })
    return usersDto
  }
}
