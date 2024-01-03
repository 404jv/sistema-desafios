import { Prisma } from '@prisma/client'

const challengeWithRelation = Prisma.validator<Prisma.ChallengeDefaultArgs>()({
  include: {
    tags: true,
    todos: true
  }
})

export type Challenge = Prisma.ChallengeGetPayload<typeof challengeWithRelation>
