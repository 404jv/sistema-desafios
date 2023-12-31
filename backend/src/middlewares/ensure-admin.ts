import { AppError } from '@/errors/AppError'

import { type NextFunction, type Request, type Response } from 'express'
export async function ensureIsAdmin (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const user = request.user
  if (!user.isAdmin) {
    throw new AppError('Unauthorized', 401)
  }
  next()
}
