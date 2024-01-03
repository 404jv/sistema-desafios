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
