import { prisma } from '@/database/prisma'
import { type ChallengeDTO } from '@/dtos/challenge-dto'

export async function createManyChallenges (): Promise<ChallengeDTO[]> {
  const challenge1 = await prisma.challenge.create({
    data: {
      description: 'Test',
      title: 'Test 1',
      imageUrl: 'image_test.png',
      tags: {
        createMany: {
          data: [
            {
              title: 'tech1'
            },
            {
              title: 'tech2'
            }
          ]
        }
      },
      todos: {
        createMany: {
          data: [
            {
              title: 'do something'
            },
            {
              title: 'do something else'
            }
          ]
        }
      }
    },
    include: {
      tags: true,
      todos: true
    }
  })
  const challenge2 = await prisma.challenge.create({
    data: {
      description: 'Test',
      title: 'Test 2',
      imageUrl: 'image_test.png',
      tags: {
        createMany: {
          data: [
            {
              title: 'tech3'
            },
            {
              title: 'tech4'
            }
          ]
        }
      },
      todos: {
        createMany: {
          data: [
            {
              title: 'do something'
            },
            {
              title: 'do something else'
            }
          ]
        }
      }
    },
    include: {
      tags: true,
      todos: true
    }
  })
  return [challenge1, challenge2]
}
