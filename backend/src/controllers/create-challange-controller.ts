import { type Request, type Response } from 'express'

export class CreateChallengeController {
  async handle (request: Request, response: Response): Promise<Response> {
    return response.sendStatus(201)
  }
}
