import { GetChallengeService } from '@/services/get-challenge-service'

import { type Request, type Response } from 'express'

export class GetChallengeController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const getChallengeService = new GetChallengeService()
    const challenge = await getChallengeService.execute(id)
    return response.status(200).json(challenge)
  }
}
