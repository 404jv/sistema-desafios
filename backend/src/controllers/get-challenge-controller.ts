import { GetChallengeService } from '@/services/get-challenge-service'

import { type Request, type Response } from 'express'

export class GetChallengeController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id: challengeId } = request.params
    const { id: userId } = request.user
    const getChallengeService = new GetChallengeService()
    const challenge = await getChallengeService.execute(challengeId, userId)
    return response.status(200).json(challenge)
  }
}
