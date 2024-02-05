import { ListUsersService } from '@/services/list-users-controller'
import { type Request, type Response } from 'express'

export class ListUsersController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService()
    const users = await listUsersService.execute()
    return response.status(200).json(users)
  }
}
