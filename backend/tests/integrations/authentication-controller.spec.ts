import { app } from '@/app'
import { prisma } from '@/database/prisma'
import { type UserDTO } from '@/dtos/user-dto'
import { UserMapper } from '@/mappers/user-mapper'

import supertest from 'supertest'
import { hashSync } from 'bcrypt'

describe('/api/v1/users/login', () => {
  let user: UserDTO

  beforeAll(async () => {
    const userModel = await prisma.user.create({
      data: {
        name: 'Travis Arnold',
        password: hashSync('123456', 10),
        username: 'travis'
      }
    })
    user = UserMapper.toDTO(userModel)
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })

  it('should be able to authenticate user', async () => {
    const response = await supertest(app)
      .post('/api/v1/users/login')
      .send({
        username: user.username,
        password: '123456'
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body.user).toEqual(user)
  })

  it('should return 401 if username is invalid', async () => {
    const response = await supertest(app)
      .post('/api/v1/users/login')
      .send({
        username: 'any_invalid_username',
        password: '123456'
      })

    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Username or password invalid')
  })

  it('should return 401 if password is invalid', async () => {
    const response = await supertest(app)
      .post('/api/v1/users/login')
      .send({
        username: user.username,
        password: 'any_invalid_password'
      })

    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Username or password invalid')
  })
})
