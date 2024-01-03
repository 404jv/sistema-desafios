import { prisma } from '@/database/prisma'
import { type Challenge } from '@prisma/client'
import { type Request, type Response } from 'express'

export type CreateChallengeDTO = {
  title: string
  description: string
  imageUrl: string
  todos: string[]
  tags: string[]
}

export class CreateChallengeService {
  async execute (data: CreateChallengeDTO): Promise<Challenge> {
    const challenge = await prisma.challenge.create({
      data: {
        description: data.description,
        imageUrl: data.imageUrl,
        title: data.title,
        todos: {
          createMany: {
            data: data.todos.map(todo => ({
              title: todo
            }))
          }
        },
        tags: {
          createMany: {
            data: data.tags.map(tag => ({
              title: tag
            }))
          }
        }
      },
      include: {
        todos: true,
        tags: true
      }
    })
    return challenge
  }
}

export class CreateChallengeController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { title, description, imageUrl, todos, tags } = request.body
    const createChallengeService = new CreateChallengeService()
    const challenge = await createChallengeService.execute({ title, description, imageUrl, todos, tags })
    return response.status(201).json(challenge)
  }
}
