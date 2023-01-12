import { makeCreateTransferController } from "../core/controllers/transfers/transfers.controller"
import { Router } from "express"

import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'
import { Authenticator } from "../middlewares/Authenticator"

const auth = new Authenticator()

const transfersRouter = Router()

transfersRouter.post('/new', auth.authenticate , adaptRoute(makeCreateTransferController()))

export { transfersRouter }
