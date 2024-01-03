import dotenv from 'dotenv'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import NodeEnvironment from 'jest-environment-node'
import type { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment'
import { PrismaClient } from '@prisma/client'

dotenv.config({ path: '.env.development' })

const prisma = new PrismaClient()

function generateDatabaseURL (schema: string): string {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error('Please provide a DATABASE_URL environment variable in file .env.testing')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default class PrismaTestEnvironment extends NodeEnvironment {
  private readonly schema: string

  constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)
    this.schema = `test_${randomUUID()}`
  }

  async setup (): Promise<void> {
    const databaseURL = generateDatabaseURL(this.schema)
    process.env.DATABASE_URL = databaseURL
    this.global.process.env.DATABASE_URL = databaseURL
    execSync('npx prisma migrate deploy')
  }

  async teardown (): Promise<void> {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`
    )
    await prisma.$disconnect()
  }
}
