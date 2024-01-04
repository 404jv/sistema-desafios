import { SubmitChallengeService } from '@/services/submit-challenge-service'

import { type Request, type Response } from 'express'

export class SubmitChallengeController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { repoUrl, challengeId } = request.body
    const { id: userId } = request.user
    const submitChallengeService = new SubmitChallengeService()
    const userChallenge = await submitChallengeService.execute({ challengeId, userId, repoUrl })
    return response.status(201).json(userChallenge)
  }
}
