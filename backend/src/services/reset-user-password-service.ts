import { prisma } from '@/database/prisma'
import { AppError } from '@/errors/AppError'
import { hash } from 'bcrypt'

export class ResetUserPasswordService {
  async execute (id: string): Promise<void> {
    const user = await prisma.user.findFirst({ where: { id } })
    if (user === null || id === undefined) {
      throw new AppError('User not found', 404)
    }
    const resetedPassword = await hash('Aluno.123', 10)
    await prisma.user.update({
      where: { id },
      data: {
        password: resetedPassword
      }
    })
  }
}
