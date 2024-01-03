import { app } from '@/app'
import { type Challenge } from '@/database/models/challenge'
import { prisma } from '@/database/prisma'
import { type ChallengeDTO } from '@/dtos/challenge-dto'

import supertest from 'supertest'

async function createChallenge (): Promise<Challenge> {
  const challenge = await prisma.challenge.create({
    data: {
      description: 'Test',
      title: 'Challenge Test 1',
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
  return challenge
}

describe('/api/v1/challenges/:id', () => {
  let challenge: ChallengeDTO

  beforeAll(async () => {
    challenge = await createChallenge()
  })

  it('should return 200 when get challenge with correct params', async () => {
    const response = await supertest(app)
      .get(`/api/v1/challenges/${challenge.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(challenge)
  })

  it('should return 404 when try to get a non-existent challenge', async () => {
    const invalidId = 'any_invalid_id'

    const response = await supertest(app)
      .get(`/api/v1/challenges/${invalidId}`)

    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Challenge not found')
  })
})
