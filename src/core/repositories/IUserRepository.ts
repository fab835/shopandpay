import { User } from "@prisma/client"

export interface IUserRepository {
    create(user: User): Promise<User | Error>
    find(id: string): Promise<User | Error>
    index(): Promise<User[] | Error>
    updateWallet(id: string, wallet_total_cents: number): Promise<User | Error>
    update(user: User): Promise<User | Error>
}