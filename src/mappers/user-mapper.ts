import { type UserDTO } from '@/dtos/user-dto'
import { type User } from '@prisma/client'

export class UserMapper {
  static toDTO (user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      isAdmin: user.isAdmin
    }
  }
}
