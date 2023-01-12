import { CreateTransfer } from "../../useCases/transfers/CreateTransfer/CreateTransfer"
import { Controller } from "../../../core/infra/Controller"
import { CreateTransfersController } from "./CreateTransfersControllerFactory"
import { UserRepository } from "../../repositories/prisma/userRepository"
import { StoreRepository } from "../../repositories/prisma/storeRepository"
import { TransferRepository } from "../../repositories/prisma/transferRepository"
import { SmsSender } from "../../../provider/implementations/smsSender/sms.provider"
import { EmailSender } from "../../../provider/implementations/emailSender/email.provider"
import { TransferValidator } from "../../../provider/implementations/transferValidator/transferValidator.provider"

export const makeCreateTransferController = (): Controller => {
    const userRepository = new UserRepository() // here we'll set repository where find user (value sender)
    const storeRepository = new StoreRepository() // here we'll set repository where find store (value receiver)
    const transferRepository = new TransferRepository() // here we'll set repository where save transfer
    
    const smsSender = new SmsSender()
    const emailSender = new EmailSender()
    const transferValidator = new TransferValidator()
    
    const createTransfer = new CreateTransfer(userRepository, storeRepository, transferRepository,smsSender,emailSender,transferValidator) // here we'll set the user case responsable to create transaction
    
    const createTransfersController = new CreateTransfersController(createTransfer) // here we'll execute all

    
    return createTransfersController
}