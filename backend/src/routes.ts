import { Router } from 'express'
import { CreateUserController } from './controllers/create-user-controller'
import { AuthenticateController } from './controllers/authentication-controller'
import { CreateChallengeController } from './controllers/create-challenge-controller'
import { ensureAuthenticated } from './middlewares/ensure-authenticated'
import { ensureIsAdmin } from './middlewares/ensure-admin'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateController()
const createChallengeController = new CreateChallengeController()

routes.post('/users/create', createUserController.handle)
routes.post('/users/login', authenticateController.handle)

routes.post('/challenges/create', ensureAuthenticated, ensureIsAdmin, createChallengeController.handle)

export { routes }
