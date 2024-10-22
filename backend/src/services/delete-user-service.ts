import { prisma } from "@/database/prisma";
import { AppError } from "@/errors/AppError";

export class DeleteUserService {
  async execute (id: string): Promise<void> {
    const userExist = await prisma.user.findFirst({
      where: { id }
    })
    if (userExist === null) {
      throw new AppError('User not found', 404)
    }
    await prisma.user.delete({
      where: { id }
    })
  }
}
