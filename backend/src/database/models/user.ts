import { Prisma } from '@prisma/client'

const userWithRelation = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    userChallenge: true
  }
})

export type User = Prisma.ChallengeGetPayload<typeof userWithRelation>
