import { app } from '@/app'
import { type CreateChallengeDTO } from '@/controllers/create-challenge-controller'
import { CreateAdminUserAndAuthenticate, CreateUserAndAuthenticate } from '@/tests/factory/user-factory'

import supertest from 'supertest'

describe('/api/v1/challenges/create', () => {
  let userAdminToken: string
  let userToken: string
  const challenge: CreateChallengeDTO = {
    description: 'test',
    imageUrl: 'url',
    tags: ['test'],
    title: 'Desafio Test',
    todos: ['do something']
  }

  beforeAll(async () => {
    userAdminToken = await CreateAdminUserAndAuthenticate()
    userToken = await CreateUserAndAuthenticate()
  })

  it('should return 201 when create challenge with correct params', async () => {
    const response = await supertest(app)
      .post('/api/v1/challenges/create')
      .set('Authorization', `Bearer ${userAdminToken}`)
      .send(challenge)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should return 401 when a non admin try to create a challenge', async () => {
    const response = await supertest(app)
      .post('/api/v1/challenges/create')
      .set('Authorization', `Bearer ${userToken}`)
      .send(challenge)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
  })

  it('should return 401 when an anonymous try to create a challenge', async () => {
    const response = await supertest(app)
      .post('/api/v1/challenges/create')
      .send(challenge)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token missing')
  })
})
