import { authConfig } from '@/config/auth'
import { type UserDTO } from '@/dtos/user-dto'
import { AppError } from '@/errors/AppError'

import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

interface IPayload {
  sub: string
  user: UserDTO
}

export async function ensureAuthenticated (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization
  if (authHeader === undefined || authHeader === null) {
    throw new AppError('Token missing', 401)
  }
  const [, token] = authHeader.split(' ')
  try {
    const { user } = jwt.verify(token, authConfig.secretToken) as IPayload
    request.user = {
      id: user.id,
      isAdmin: user.isAdmin
    }
    next()
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}
