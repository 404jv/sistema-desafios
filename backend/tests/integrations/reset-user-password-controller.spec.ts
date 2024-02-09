import { app } from '@/app'
import supertest from 'supertest'
import { CreateAdminUserAndAuthenticate, CreateUserAndAuthenticate } from '@/tests/factory/user-factory'
import { prisma } from '@/database/prisma'

describe('/api/v1/users/reset-password', () => {
  let userId: string
  let userToken: string
  let adminToken: string

  beforeAll(async () => {
    const { user, token } = await CreateUserAndAuthenticate()
    userId = user.id
    userToken = token
    adminToken = await CreateAdminUserAndAuthenticate()
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  it('should return 204 when reset user password is successfully', async () => {
    const response = await supertest(app)
      .put(`/api/v1/users/reset-password/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(response.status).toBe(204)
  })

  it('should return 404 when user does not exist', async () => {
    const invalidId = 'any_invalid_id'

    const response = await supertest(app)
      .put(`/api/v1/users/reset-password/${invalidId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('User not found')
  })

  it('should return 401 when an anonymous try to update user', async () => {
    const response = await supertest(app)
      .put(`/api/v1/users/reset-password/${userId}`)

    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Token missing')
  })

  it('should return 401 when a non-admin try to update user', async () => {
    const response = await supertest(app)
      .put(`/api/v1/users/reset-password/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)

    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
  })
})
