import 'dotenv/config'

export const authConfig = {
  secretToken: process.env.SECRET_TOKEN ?? 'qx13ErXJVnKsyB7MxXzbF',
  expiresInToken: '1d'
}
