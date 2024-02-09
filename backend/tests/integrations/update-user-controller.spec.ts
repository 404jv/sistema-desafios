import { app } from '@/app'
import supertest from 'supertest'
import { CreateAdminUserAndAuthenticate, CreateUserAndAuthenticate } from '../factory/user-factory'
import { type UserDTO } from '@/dtos/user-dto'
import { prisma } from '@/database/prisma'
import { hashSync } from 'bcrypt'

describe('/api/v1/users/update', () => {
  let oldUser: UserDTO
  let newUser: UserDTO
  let userToken: string
  let adminToken: string

  beforeAll(async () => {
    const userAndToken = await CreateUserAndAuthenticate()
    oldUser = userAndToken.user
    newUser = {
      id: oldUser.id,
      username: 'new_username',
      isAdmin: false,
      name: 'new_name'
    }
    userToken = userAndToken.token
    adminToken = await CreateAdminUserAndAuthenticate()
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  it('should return 200 when update user is successful', async () => {
    const response = await supertest(app)
      .put('/api/v1/users/update')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newUser)

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(oldUser.id)
    expect(response.body).toEqual(newUser)
  })

  it('should return 400 when username already exists', async () => {
    const existentUser = await prisma.user.create({
      data: {
        name: 'any_user',
        password: hashSync('12345', 10),
        username: 'existent_username'
      }
    })
    const invalidUserUpdate = {
      id: newUser.id,
      username: existentUser.username,
      isAdmin: newUser.isAdmin,
      name: newUser.name
    }

    const response = await supertest(app)
      .put('/api/v1/users/update')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(invalidUserUpdate)

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Username already exists')
  })

  it('should return 404 when update an user that does not exist', async () => {
    const nonExistentUser = {
      id: 'any_invalid_id',
      username: 'new_username',
      isAdmin: false,
      name: 'new_name'
    }

    const response = await supertest(app)
      .put('/api/v1/users/update')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(nonExistentUser)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('User not found')
  })

  it('should return 401 when an anonymous try to update user', async () => {
    const response = await supertest(app)
      .put('/api/v1/users/update')
      .send(newUser)

    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Token missing')
  })

  it('should return 401 when a non-admin try to update user', async () => {
    const response = await supertest(app)
      .put('/api/v1/users/update')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newUser)

    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Unauthorized')
  })
})
