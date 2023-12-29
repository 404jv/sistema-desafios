import { AuthenticateService } from '@/services/authentication-service'

import { type Request, type Response } from 'express'

export class AuthenticateController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body
    const authenticateService = new AuthenticateService()
    const userToken = await authenticateService.execute({ username, password })
    return response.status(200).json(userToken)
  }
}
