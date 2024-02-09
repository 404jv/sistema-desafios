import { ResetUserPasswordService } from '@/services/reset-user-password-service'
import { type Request, type Response } from 'express'

export class ResetUserPasswordController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const resetUserPasswordService = new ResetUserPasswordService()
    await resetUserPasswordService.execute(id)
    return response.sendStatus(204)
  }
}
