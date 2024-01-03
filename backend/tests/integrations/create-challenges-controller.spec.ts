import { app } from '@/app'
import supertest from 'supertest'

describe('/api/v1/challenges/create', () => {
  it('should return 201 when create challenge with correct params', async () => {
    const response = await supertest(app).post('/api/v1/challenges/create')

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})
