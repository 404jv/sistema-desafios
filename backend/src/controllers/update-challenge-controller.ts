import { prisma } from '@/database/prisma'
import { type ChallengeDTO } from '@/dtos/challenge-dto'
import { type Request, type Response } from 'express'

export class UpdateChallengeService {
  async execute (data: ChallengeDTO): Promise<ChallengeDTO> {
    const challenge = await prisma.challenge.findFirst({
      where: {
        id: data.id
      }
    })
    if (challenge === null && data.id !== undefined) {
      throw new Error('Challenge not found')
    }
    const updatedChallenge = await prisma.challenge.update({
      where: { id: data.id },
      data: {
        description: data.description,
        imageUrl: data.imageUrl,
        title: data.title,
        tags: {
          updateMany: {
            where: {
              id: {
                in: data.tags.map(tag => tag.id)
              }
            },
            data: {
              title: { set: data.tags[0] }
            }
          }
        },
        // Update only the title of existing todos
        todos: {
          updateMany: {
            where: {
              id: {
                in: data.todos.map(todo => todo.id)
              }
            },
            data: {
              title: { set: data.todos.map(todo => ({ title: todo.title })) }
            }
          }
        }
      }
    })
  }
}

export class UpdateChallengeController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id, title, description, imageUrl, todos, tags } = request.body
    return response.status(200).json()
  }
}
