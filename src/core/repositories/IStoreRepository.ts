import { Store } from "@prisma/client"

export interface IStoreRepository {
    create(store: Store): Promise<Store | Error>
    find(id: string): Promise<Store | Error>
    update(store: Store): Promise<Store | Error>
}