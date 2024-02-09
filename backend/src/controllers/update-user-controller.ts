import { UpdateUserService } from '@/services/update-user-service'

import { type Request, type Response } from 'express'

export class UpdateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id, name, username } = request.body
    const updateUserService = new UpdateUserService()
    const userUpdated = await updateUserService.execute({ id, name, username })
    return response.status(200).json(userUpdated)
  }
}
