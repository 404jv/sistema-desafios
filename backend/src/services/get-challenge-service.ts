import { prisma } from '@/database/prisma'
import { type ChallengeDTO } from '@/dtos/challenge-dto'
import { AppError } from '@/errors/AppError'
import { ChallengeMapper } from '@/mappers/challenge-mapper'

export class GetChallengeService {
  async execute (id: string): Promise<ChallengeDTO> {
    const challenge = await prisma.challenge.findFirst({
      where: { id },
      include: {
        tags: true,
        todos: true
      }
    })
    if (challenge === null) {
      throw new AppError('Challenge not found', 404)
    }
    const challengeDTO = ChallengeMapper.toDTO(challenge)
    return challengeDTO
  }
}
