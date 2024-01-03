import { type Challenge } from '@/database/models/challenge'
import { type ChallengeDTO } from '@/dtos/challenge-dto'

export class ChallengeMapper {
  static toDTO (challenge: Challenge): ChallengeDTO {
    return {
      id: challenge.id,
      description: challenge.description,
      imageUrl: challenge.imageUrl,
      title: challenge.title,
      tags: challenge.tags,
      todos: challenge.todos
    }
  }
}
