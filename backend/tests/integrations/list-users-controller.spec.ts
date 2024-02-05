import { app } from '@/app'
import supertest from 'supertest'
import { CreateAdminUserAndAuthenticate, CreateUserAndAuthenticate, createManyUsers } from '@/tests/factory/user-factory'
import { type UserDTO } from '@/dtos/user-dto'
import { prisma } from '@/database/prisma'

describe('/api/v1/users/list', () => {
  let users: UserDTO[]
  let adminToken: string
  let userToken: string

  beforeAll(async () => {
    adminToken = await CreateAdminUserAndAuthenticate()
    const authToken = await CreateUserAndAuthenticate()
    userToken = authToken.token
    users = await createManyUsers()
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  it('should return 200 when list users is successful', async () => {
    const response = await supertest(app)
      .get('/api/v1/users/list')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(users)
    expect(response.body[0]).not.toHaveProperty('password')
  })

  it('should return 401 when an anonymous user try to list users', async () => {
    const response = await supertest(app)
      .get('/api/v1/users/list')

    expect(response.statusCode).toEqual(401)
    expect(response.body.message).toBe('Token missing')
  })

  it('should return 401 when a non-admin try to list users', async () => {
    const response = await supertest(app)
      .get('/api/v1/users/list')
      .set('Authorization', `Bearer ${userToken}`)

    expect(response.statusCode).toEqual(401)
    expect(response.body.message).toBe('Unauthorized')
  })
})
