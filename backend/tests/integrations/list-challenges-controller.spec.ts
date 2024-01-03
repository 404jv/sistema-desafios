import { app } from '@/app'
import { prisma } from '@/database/prisma'
import { type Challenge } from '@prisma/client'
import { createManyChallenges } from '@/tests/factory/challenge-factory'

import supertest from 'supertest'

describe('/api/v1/challenges/list', () => {
  let challenges: Challenge[]

  beforeAll(async () => {
    await prisma.challenge.deleteMany()
    challenges = await createManyChallenges()
  })

  afterAll(async () => {
    await prisma.challenge.deleteMany()
  })

  it('should return 200 when list challenges', async () => {
    const response = await supertest(app)
      .get('/api/v1/challenges/list')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(challenges)
  })
})
