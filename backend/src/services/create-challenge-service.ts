import { prisma } from '@/database/prisma'
import { type CreateChallengeDTO } from '@/dtos/challenge-dto'
import { type Challenge } from '@prisma/client'

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
