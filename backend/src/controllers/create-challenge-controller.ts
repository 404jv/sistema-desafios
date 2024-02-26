import { CreateChallengeService } from '@/services/create-challenge-service'

import { type Request, type Response } from 'express'

export class CreateChallengeController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { title, description, imageUrl, todos, tags } = request.body
    const createChallengeService = new CreateChallengeService()
    const challenge = await createChallengeService.execute({ title, description, imageUrl, todos, tags })
    return response.status(201).json(challenge)
  }
}
