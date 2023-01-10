import { Store, User } from "@prisma/client"
import { prisma } from "../src/config/database"
import { IStoreRepository } from "../src/core/repositories/IStoreRepository"
import { IUserRepository } from "../src/core/repositories/IUserRepository"
import { StoreRepository } from "../src/core/repositories/prisma/storeRepository"
import { UserRepository } from "../src/core/repositories/prisma/userRepository"

export interface IDbTestSetup {
    seedDBTest(): Promise<any | Error>
}

export class DbTestSetup implements IDbTestSetup {
    private userRepository : IUserRepository
    private storeRepository : IStoreRepository
    
    constructor(){
        this.userRepository = new UserRepository()
        this.storeRepository = new StoreRepository()
    }

    private clearDBTest = async () => {
        const users = await prisma.user.findMany({})
        const stores = await prisma.store.findMany({})
        const transfers = await prisma.transfer.findMany({})
        
        await Promise.all(transfers.map(async (t) => await prisma.transfer.delete({
            where: { id: t.id }
        })))

        await Promise.all(stores.map(async (s) => await prisma.store.delete({
            where: { id: s.id }
        })))

        await Promise.all(users.map(async (u) => await prisma.user.delete({
            where: { id: u.id }
        })))
    }
    
    public async seedDBTest(): Promise<any | Error> {
        await this.clearDBTest()
        const user_buyer : User = {
            id: "e01f259f-ba03-49ec-8bd4-a40f9c043d22",
            name: 'user_buyer',
            cpf_cnpj: "63631729006",
            wallet_total_cents: 100000,
            encrypted_password: '123',
            created_at: new Date('2023-01-01'),
            updated_at: new Date('2023-01-01'),
            email: 'user_buyer@mail.com'
        }
        
        const user_store : User = {
            id: "043d229f-49ec-ba03-a40f-8bd49c04f259f",
            name: 'user_store',
            cpf_cnpj: "86627484000119",
            wallet_total_cents: 50000,
            encrypted_password: '123',
            created_at: new Date('2023-01-01'),
            updated_at: new Date('2023-01-01'),
            email: 'user_store@mail.com',
        }
        
        const store : Store = {
            id: "0a34aea8-f50a-4039-8950-6b4613a957a6",
            name: 'store_1',
            wallet_total_cents: 0,
            user_id: "e01f259f-ba03-49ec-8bd4-a40f9c043d22",
            created_at: new Date('2023-01-01'),
            updated_at: new Date('2023-01-01'),
        } 

        
        await this.userRepository.create(user_buyer)
        await this.userRepository.create(user_store)
        await this.storeRepository.create(store)
    }
    
}