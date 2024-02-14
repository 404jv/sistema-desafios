import { prisma } from '@/database/prisma'

async function removeAdmin (): Promise<void> {
  await prisma.user.deleteMany({
    where: {
      id: '2e4dbd7e-a076-4c03-9fc7-c23645925ba8'
    }
  })
}

removeAdmin()
  .catch(error => { console.log(error) })
