import { Transfer } from "@prisma/client";
import { StoreRepository } from "core/repositories/prisma/storeRepository";
import { TransferRepository } from "core/repositories/prisma/transferRepository";
import { UserRepository } from "core/repositories/prisma/userRepository";
import { IUseCase } from "core/useCases/IUseCase";

export class CreateTransfer implements IUseCase {

    constructor ( 
        private readonly userRepository: UserRepository,
        private readonly storeRepository: StoreRepository,
        private readonly transferRepository: TransferRepository
    ){}

    public execute = async ({sender, receiver, total_cents}: HTTPRequestObject): Promise<Object | Error> => {
        try{
            if (!total_cents || !receiver || !sender) return {error: "missing params"}
            // RULES
            // 1. User and store need to exist
            const user = await this.userRepository.find(sender)
            if(user instanceof Error) return user
            const store = await this.storeRepository.find(receiver)
            if(store instanceof Error) return store
            
            // 2. Only transfer if user have total_cents to transfer in your wallet
            if(Number(user.wallet_total_cents) < total_cents) return new Error("insufficient funds")

            // Create transfer
            const transfer = await this.transferRepository.create({total_cents: total_cents, user_id: user.id, store_id: store.id})
            if(transfer instanceof Error) return new Error("Transfer cannot be created")
            
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