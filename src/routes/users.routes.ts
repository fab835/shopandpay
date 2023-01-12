import { Router } from "express"

import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { makeCreateUserController } from "../core/controllers/users/users.controller"

const usersRouter = Router()

usersRouter.post('/new', adaptRoute(makeCreateUserController()))

export { usersRouter }
