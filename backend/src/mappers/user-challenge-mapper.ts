import { type UserChallengeDTO } from '@/dtos/challenge-dto'
import { type UserChallenge } from '@prisma/client'

export class UserChallengeMapper {
  static toDTO (userChallenge: UserChallenge): UserChallengeDTO {
    return {
      repoUrl: userChallenge.repoUrl,
      challengeId: userChallenge.challengeId,
      userId: userChallenge.userId,
      id: userChallenge.id,
      status: userChallenge.status,
      grade: userChallenge.grade
    }
  }
}
