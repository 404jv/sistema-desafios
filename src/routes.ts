import { Router } from 'express'
import { CreateUserController } from './controllers/create-user-controller'
import { AuthenticateController } from './controllers/authentication-controller'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateController()

routes.post('/users/create', createUserController.handle)
routes.post('/users/login', authenticateController.handle)

export { routes }
