import { User } from "@prisma/client"

export interface IUserRepository {
    create(user: User): Promise<User | Error>
    find(id: string): Promise<User | Error>
    update(user: User): Promise<User | Error>
}