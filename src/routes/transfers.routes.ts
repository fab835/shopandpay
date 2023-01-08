import { makeCreateTransferController } from "../core/controllers/transfers/transfers.controller"
import { Router } from "express"

import { adaptRoute } from '../core/infra/adapters/ExpressRouteAdapter'

const transfersRouter = Router()

transfersRouter.get('/new', adaptRoute(makeCreateTransferController()))

export { transfersRouter }
