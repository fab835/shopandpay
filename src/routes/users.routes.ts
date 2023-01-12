import { Router } from "express"

import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { makeCreateUserController, makeLoginUserController } from "../core/controllers/users/users.controller"

const usersRouter = Router()

usersRouter.post('/sign_up', adaptRoute(makeCreateUserController()))
usersRouter.post('/sign_in', adaptRoute(makeLoginUserController()))

export { usersRouter }
