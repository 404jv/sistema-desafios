import { prisma } from '@/database/prisma'

async function removeAdmin (): Promise<void> {
  await prisma.user.deleteMany({
    where: {
      isAdmin: true
    }
  })
}

removeAdmin()
  .catch(error => { console.log(error) })
