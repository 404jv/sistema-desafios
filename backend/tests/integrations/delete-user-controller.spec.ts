import { app } from '@/app'
import { prisma } from '@/database/prisma'
import supertest from 'supertest'
import { CreateAdminUserAndAuthenticate, createUser, CreateUserAndAuthenticate } from '../factory/user-factory'

describe('/api/v1/users/delete/:id', () => {
  let userId: string
  let userToken: string
  let adminToken: string

  beforeAll(async () => {
    adminToken = await CreateAdminUserAndAuthenticate()
    const { token, user } = await CreateUserAndAuthenticate()
    userToken = token
    userId = user.id
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })

  it('should return 204 when user is deleted', async () => {
    const response = await supertest(app)
      .delete(`/api/v1/users/delete/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
    const userExists = await prisma.user.findFirst({
      where: { id: userId }
    })

    expect(response.statusCode).toBe(204)
    expect(userExists).toBeNull()
  })

  it('should return 404 when user is not found', async () => {
    const nonExistentUserId = `INVALID_USER_ID`

    const response = await supertest(app)
      .delete(`/api/v1/users/delete/${nonExistentUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('User not found')
  })

  it('should return 401 when an anonymous user try to delete', async () => {
    const response = await supertest(app)
      .delete(`/api/v1/users/delete/${userId}`)

    expect(response.statusCode).toBe(401)
  })

  it('should return 404 when a non admin user try to delete', async () => {
    const response = await supertest(app)
      .delete(`/api/v1/users/delete/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)

    expect(response.statusCode).toBe(401)
  })
})
