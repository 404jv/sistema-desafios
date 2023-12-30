import { CreateUserService } from '@/services/create-user-service'
import { type Request, type Response } from 'express'

export class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, username, password, confirmPassword } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({ confirmPassword, password, username, name })
    return response.status(201).json(user)
  }
}
