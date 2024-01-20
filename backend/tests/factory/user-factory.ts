import { authConfig } from '@/config/auth'
import { prisma } from '@/database/prisma'
import { type AuthenticateResponseDTO } from '@/dtos/user-dto'
import { UserMapper } from '@/mappers/user-mapper'

import { hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function CreateAdminUserAndAuthenticate (): Promise<string> {
  const user = await prisma.user.create({
    data: {
      name: 'admin_test',
      password: hashSync('password', 10),
      username: 'admin',
      isAdmin: true
    }
  })
  const userDto = UserMapper.toDTO(user)
  const token = jwt.sign({ user: userDto }, authConfig.secretToken, {
    subject: user.id,
    expiresIn: authConfig.expiresInToken
  })
  return token
}

export async function CreateUserAndAuthenticate (): Promise<AuthenticateResponseDTO> {
  const user = await prisma.user.create({
    data: {
      name: 'user_test',
      password: hashSync('password', 10),
      username: 'user_test',
      isAdmin: false
    }
  })
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
