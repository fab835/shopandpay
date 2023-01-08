import { Controller } from "../../../core/infra/Controller"
import { CreateTransfersController } from "./CreateTransfersControllerFactory"

export const makeCreateTransferController = (): Controller => {
    const createdTransfers = new CreateTransfersController()
    return createdTransfers
}