import { Router } from "express"
import { usersRouter } from "../users.routes"
import { transfersRouter } from "../transfers.routes"


const api = Router().use('/transfers', transfersRouter)
                    .use('/users', usersRouter)


export default Router().use("", api)
