import { ListChallengesService } from '@/services/list-challenge-service'

import { type Request, type Response } from 'express'

export class ListChallengesController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listChallengesService = new ListChallengesService()
    const challenges = await listChallengesService.execute()
    return response.status(200).json(challenges)
  }
}
