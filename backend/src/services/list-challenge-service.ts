import { prisma } from '@/database/prisma'
import { type ChallengeDTO } from '@/dtos/challenge-dto'
import { ChallengeMapper } from '@/mappers/challenge-mapper'

export class ListChallengesService {
  async execute (): Promise<ChallengeDTO[]> {
    const challenges = await prisma.challenge.findMany({
      include: {
        todos: true,
        tags: true
      }
    })
    const challengesDTO = challenges.map((challenge) => {
      return ChallengeMapper.toDTO(challenge)
    })
    return challengesDTO
  }
}
