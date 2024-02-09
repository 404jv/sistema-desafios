import { Router } from 'express'
import { CreateUserController } from './controllers/create-user-controller'
import { AuthenticateController } from './controllers/authentication-controller'
import { CreateChallengeController } from './controllers/create-challenge-controller'
import { ensureAuthenticated } from './middlewares/ensure-authenticated'
import { ensureIsAdmin } from './middlewares/ensure-admin'
import { ListChallengesController } from './controllers/list-challenges-controller'
import { GetChallengeController } from './controllers/get-challenge-controller'
import { SubmitChallengeController } from './controllers/submit-challenge-controller'
import { ListUsersController } from './controllers/list-users-controller'
import { UpdateUserController } from './controllers/update-user-controller'
import { ResetUserPasswordController } from './controllers/reset-user-password-controller'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateController()
const createChallengeController = new CreateChallengeController()
const listChallengesController = new ListChallengesController()
const listUsersController = new ListUsersController()
const getChallengesController = new GetChallengeController()
const submitChallengeController = new SubmitChallengeController()
const updateUserController = new UpdateUserController()
const resetUserPasswordController = new ResetUserPasswordController()

routes.post('/users/create', createUserController.handle)
routes.post('/users/login', authenticateController.handle)
routes.get('/users/list', ensureAuthenticated, ensureIsAdmin, listUsersController.handle)
routes.put('/users/update', ensureAuthenticated, ensureIsAdmin, updateUserController.handle)
routes.put('/users/reset-password/:id',
  ensureAuthenticated,
  ensureIsAdmin,
  resetUserPasswordController.handle
)

routes.post('/challenges/create', ensureAuthenticated, ensureIsAdmin, createChallengeController.handle)
routes.get('/challenges/list', listChallengesController.handle)
routes.get('/challenges/:id', ensureAuthenticated, getChallengesController.handle)
routes.post('/challenges/submit', ensureAuthenticated, submitChallengeController.handle)

export { routes }
