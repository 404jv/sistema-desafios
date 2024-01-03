import { app } from '@/app'
import { type CreateChallengeDTO } from '@/controllers/create-challenge-controller'
import supertest from 'supertest'

describe('/api/v1/challenges/create', () => {
  const challenge: CreateChallengeDTO = {
    description: 'test',
    imageUrl: 'url',
    tags: ['test'],
    title: 'Desafio Test',
    todos: ['do something']
  }

  it('should return 201 when create challenge with correct params', async () => {
    const response = await supertest(app)
      .post('/api/v1/challenges/create')
      .send(challenge)

    console.log(response.body)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})
