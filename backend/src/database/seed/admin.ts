import { prisma } from '@/database/prisma'
import 'dotenv'
import { hashSync } from 'bcrypt'

const password = process.env.ADMIN_PASSWORD ?? '123'

async function createAdmin (): Promise<void> {
  await prisma.user.create({
    data: {
      name: 'adminSys',
      password: hashSync(password, 10),
      username: 'adminSys',
      isAdmin: true
    }
  })
}

createAdmin()
  .catch(error => { console.log(error) })
