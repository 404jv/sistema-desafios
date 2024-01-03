import { Router } from 'express'
import { CreateUserController } from './controllers/create-user-controller'
import { AuthenticateController } from './controllers/authentication-controller'
import { CreateChallengeController } from './controllers/create-challenge-controller'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateController()
const createChallengeController = new CreateChallengeController()

routes.post('/users/create', createUserController.handle)
routes.post('/users/login', authenticateController.handle)

routes.post('/challenges/create', createChallengeController.handle)

export { routes }
