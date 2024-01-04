import { prisma } from '@/database/prisma'
import { ChallengeStatus, type UserChallengeDTO, type SubmitChallengeDTO } from '@/dtos/challenge-dto'
import { AppError } from '@/errors/AppError'
import { SubmitChallengeMapper } from '@/mappers/user-challenge-mapper'

export class SubmitChallengeService {
  async execute ({ challengeId, repoUrl, userId }: SubmitChallengeDTO): Promise<UserChallengeDTO> {
    const challenge = await prisma.challenge.findFirst({ where: { id: challengeId } })
    if (challenge === null) {
      throw new AppError('Challenge not found', 404)
    }
    const userChallenge = await prisma.userChallenge.create({
      data: {
        status: ChallengeStatus.SUBMITTED,
        repoUrl,
        challengeId,
        userId
      }
    })
    const userChallengeDTO = SubmitChallengeMapper.toDTO(userChallenge)
    return userChallengeDTO
  }
}
