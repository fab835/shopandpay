import { Transfer } from "@prisma/client";
import { StoreRepository } from "../../../repositories/prisma/storeRepository";
import { TransferRepository } from "../../../repositories/prisma/transferRepository";
import { UserRepository } from "../../../repositories/prisma/userRepository";
import { IUseCase } from "../../../useCases/IUseCase";
import { EmailSender } from "../../../../provider/implementations/emailSender/email.provider";
import { SmsSender } from "../../../../provider/implementations/smsSender/sms.provider";
import { TransferValidator } from "../../../../provider/implementations/transferValidator/transferValidator.provider";

export class CreateTransfer implements IUseCase {

    constructor ( 
        private readonly userRepository: UserRepository,
        private readonly storeRepository: StoreRepository,
        private readonly transferRepository: TransferRepository,
        private readonly smsSender: SmsSender,
        private readonly emailSender: EmailSender,
        private readonly transferValidator: TransferValidator
    ){}

    public execute = async ({uid, store_id, total_cents}: HTTPRequestObject): Promise<Object | Error> => {
        try{
            if (!total_cents || !store_id || !uid) return {error: "missing params"}
            // RULES
            // 1. User and store need to exist
            const user = await this.userRepository.find_by('uid', uid)
            if(user instanceof Error) return user
            const store = await this.storeRepository.find(store_id)
            if(store instanceof Error) return store
            
            // 2. Only transfer if user have total_cents to transfer in your wallet
            if(Number(user.wallet_total_cents) < total_cents) return new Error("insufficient funds")

            // Validate Transfer in external server
            const transferValidatorResponse = await this.transferValidator.validate(user,store,total_cents)
            if(!transferValidatorResponse || !transferValidatorResponse.message || transferValidatorResponse.message !== "Autorizado") return new Error("Transfer not authorized")

            // Create transfer
            const transfer = await this.transferRepository.create({total_cents: total_cents, user_id: user.id, store_id: store.id})
            if(transfer instanceof Error) return new Error("Transfer cannot be created")

            // Send email and SMS to user
            const emailSender = await this.emailSender.sendAnEmail( user.email, "Transferência Realizada", `Transferência de R$${total_cents/10} realizada com sucesso para ${store.name}`)
            const smsSender = await this.smsSender.sendAnSms( user.email, `Transferência de R$${total_cents/10} realizada com sucesso para ${store.name}`)
            // Obs: We can save this sender information

            // update wallets
            const updatedUser = await this.userRepository.updateWallet(user.id, Number(user.wallet_total_cents) - total_cents)
            const updatedStore = await this.storeRepository.updateWallet(store.id, Number(store.wallet_total_cents) + total_cents)
            
            return {transfer}
        } catch(error){
            console.log(error)
            // @ts-ignore
            return new Error(error)
        }
    }
}