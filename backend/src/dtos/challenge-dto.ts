export type TagDTO = {
  title: string
  id: string
}

export type TodoDTO = {
  title: string
  id: string
}

export type ChallengeDTO = {
  title: string
  id: string
  description: string
  imageUrl: string
  tags: TagDTO[]
  todos: TodoDTO[]
}

export type CreateChallengeDTO = {
  title: string
  description: string
  imageUrl: string
  todos: string[]
  tags: string[]
}

export enum ChallengeStatus {
  PENDING = 'PENDING',
  REVISED = 'REVISED',
  SUBMITTED = 'SUBMITTED'
}

export type SubmitChallengeDTO = {
  repoUrl: string | null
  challengeId: string
  userId: string
}
export type UserChallengeDTO = {
  id: string
  challengeId: string
  userId: string
  status: string
  repoUrl: string | null
  grade: number | null
}
