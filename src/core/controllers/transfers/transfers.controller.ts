import { CreateTransfer } from "../../../core/useCases/transfers/CreateTransfer/createTransfer"
import { Controller } from "../../../core/infra/Controller"
import { CreateTransfersController } from "./CreateTransfersControllerFactory"
import { UserRepository } from "../../../core/repositories/prisma/userRepository"
import { StoreRepository } from "../../../core/repositories/prisma/storeRepository"
import { TransferRepository } from "../../../core/repositories/prisma/transferRepository"

export const makeCreateTransferController = (): Controller => {
    const userRepository = new UserRepository() // here we'll set repository where find user (value sender)
    const storeRepository = new StoreRepository() // here we'll set repository where find store (value receiver)
    const transferRepository = new TransferRepository() // here we'll set repository where save transfer
    const createTransfer = new CreateTransfer(userRepository, storeRepository, transferRepository) // here we'll set the user case responsable to create transaction
    
    const createTransfersController = new CreateTransfersController(createTransfer) // here we'll execute all

    
    return createTransfersController
}