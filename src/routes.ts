import { Router } from 'express'
import { CreateUserController } from './controllers/create-user-controller'

const routes = Router()

const createUserController = new CreateUserController()

routes.post('/api/v1/create/user', createUserController.handle)

export { routes }
