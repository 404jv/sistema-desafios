import { app } from '@/app'
import { ChallengeStatus, type ChallengeDTO } from '@/dtos/challenge-dto'
import { createChallengeAndSubmit } from '@/tests/factory/challenge-factory'

import supertest from 'supertest'
import { CreateUserAndAuthenticate } from '../factory/user-factory'
import { type AuthenticateResponseDTO } from '@/dtos/user-dto'

describe('/api/v1/challenges/:id', () => {
  let challenge: ChallengeDTO
  let userToken: AuthenticateResponseDTO

  beforeAll(async () => {
    userToken = await CreateUserAndAuthenticate()
    challenge = await createChallengeAndSubmit(userToken.user.id)
  })

  it('should return 200 when get challenge with correct params', async () => {
    const response = await supertest(app)
      .get(`/api/v1/challenges/${challenge.id}`)
      .set('Authorization', `Bearer ${userToken.token}`)

    expect(response.status).toBe(200)
    expect(response.body.challenge).toEqual(challenge)
    expect(response.body.userStatus).toHaveProperty('id')
    expect(response.body.userStatus.status).toBe(ChallengeStatus.REVISED)
    expect(response.body.userStatus.userId).toBe(userToken.user.id)
    expect(response.body.userStatus.grade).toBe(10)
    expect(response.body.userStatus.repoUrl).toBe('https://github.com/404jv/desafio-01')
    expect(response.body.userStatus.challengeId).toBe(challenge.id)
  })

  it('should return 404 when try to get a non-existent challenge', async () => {
    const invalidId = 'any_invalid_id'

    const response = await supertest(app)
      .get(`/api/v1/challenges/${invalidId}`)
      .set('Authorization', `Bearer ${userToken.token}`)

    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Challenge not found')
  })
})
