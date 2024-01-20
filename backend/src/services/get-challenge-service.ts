import { prisma } from '@/database/prisma'
import { type UserChallengeDTO, type ChallengeDTO } from '@/dtos/challenge-dto'
import { AppError } from '@/errors/AppError'
import { ChallengeMapper } from '@/mappers/challenge-mapper'
import { SubmitChallengeMapper } from '@/mappers/user-challenge-mapper'

type GetChallengeResponse = {
  challenge: ChallengeDTO
  userStatus: UserChallengeDTO | null
}

export class GetChallengeService {
  async execute (challengeId: string, userId: string): Promise<GetChallengeResponse> {
    const challenge = await prisma.challenge.findFirst({
      where: { id: challengeId },
      include: {
        tags: true,
        todos: true
      }
    })
    if (challenge === null) {
      throw new AppError('Challenge not found', 404)
    }
    const userChallenge = await prisma.userChallenge.findFirst({
      where: {
        userId,
        challengeId
      }
    })
    let userStatusDTO = null
    if (userChallenge !== null) {
      userStatusDTO = SubmitChallengeMapper.toDTO(userChallenge)
    }
    const challengeDTO = ChallengeMapper.toDTO(challenge)
    return {
      challenge: challengeDTO,
      userStatus: userStatusDTO
    }
  }
}
