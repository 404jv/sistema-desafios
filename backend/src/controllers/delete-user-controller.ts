import { DeleteUserService } from '@/services/delete-user-service'
import { type Request, type Response } from 'express'

export class DeleteUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteUserService = new DeleteUserService()
    await deleteUserService.execute(id)
    return response.status(204).json()
  }
}
