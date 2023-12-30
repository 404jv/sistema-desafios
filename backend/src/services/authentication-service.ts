import { authConfig } from '@/config/auth'
import { prisma } from '@/database/prisma'
import { type AuthenticationUserDTO, type UserDTO } from '@/dtos/user-dto'
import { AppError } from '@/errors/AppError'
import { UserMapper } from '@/mappers/user-mapper'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type AuthenticateResponse = {
  token: string
  user: UserDTO
}

export class AuthenticateService {
  async execute ({ username, password }: AuthenticationUserDTO): Promise<AuthenticateResponse> {
    const user = await prisma.user.findFirst({ where: { username } })
    if (user === null) {
      throw new AppError('Username or password invalid', 401)
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new AppError('Username or password invalid', 401)
    }
    const userDto = UserMapper.toDTO(user)
    const token = jwt.sign({ user: userDto }, authConfig.secretToken, {
      subject: user.id,
      expiresIn: authConfig.expiresInToken
    })
    return {
      token,
      user: userDto
    }
  }
}
