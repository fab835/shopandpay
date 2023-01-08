import { Router } from "express"
import { transfersRouter } from "../transfers.routes"


const api = Router().use('/transfers', transfersRouter)

export default Router().use("", api)
