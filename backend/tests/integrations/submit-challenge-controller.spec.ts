import { app } from '@/app'
import supertest from 'supertest'
import { CreateUserAndAuthenticate } from '../factory/user-factory'
import { createChallenge } from '../factory/challenge-factory'

type CreateChallengeRequest = {
  challengeId: string
  repoUrl: string
}

describe('/api/v1/challenges/submit', () => {
  let userToken: string
  let challengeId: string
  let challengeSubmit: CreateChallengeRequest

  beforeAll(async () => {
    userToken = await CreateUserAndAuthenticate()
    const { id } = await createChallenge()
    challengeId = id
    challengeSubmit = {
      challengeId,
      repoUrl: 'any_url'
    }
  })

  it('should return 201 when user submits a challenge', async () => {
    const response = await supertest(app)
      .post('/api/v1/challenges/submit')
      .set('Authorization', `Bearer ${userToken}`)
      .send(challengeSubmit)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.status).toBe('SUBMITTED')
    expect(response.body.grade).toBe(null)
    expect(response.body.challengeId).toBe(challengeId)
  })

  it('should return 404 when user submits a challenge that does not exist', async () => {
    const response = await supertest(app)
      .post('/api/v1/challenges/submit')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        repoUrl: challengeSubmit.repoUrl,
        challengeId: 'any_invalid_id'
      })

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Challenge not found')
  })

  it('should return 401 when an anonymous try to submit a challenge', async () => {
    const response = await supertest(app)
      .post('/api/v1/challenges/create')
      .send(challengeSubmit)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token missing')
  })
})
