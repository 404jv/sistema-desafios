import { app } from '@/app'
import supertest from 'supertest'

describe('/api/v1/create/user', () => {
  const user = {
    name: 'Iva Brown',
    username: 'ivabrown',
    password: 'superSecret',
    confirmPassword: 'superSecret'
  }

  it('should return 201 when user is created', async () => {
    const response = await supertest(app)
      .post('/api/v1/create/user')
      .send(user)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).not.toHaveProperty('password')
    expect(response.body.name).toBe(user.name)
    expect(response.body.username).toBe(user.username)
  })

  it('should return 400 when password and confirmPassword does not match', async () => {
    const invalidUser = {
      name: 'Manuel Rowe',
      username: 'manuelrowe',
      password: 'superSecret',
      confirmPassword: 'invalid_confirmPassword'
    }

    const response = await supertest(app)
      .post('/api/v1/create/user')
      .send(invalidUser)

    console.log(response.body)

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('confirmPassword must be equal to password')
  })
})
