import { prisma } from '../../../config/database';
import { Store } from "@prisma/client";
import { IStoreRepository } from '../IStoreRepository';


export class StoreRepository implements IStoreRepository {

  public async create(store: Store): Promise<Store | Error> {
    try {
        let createdStore =  await prisma.store.create({
            data: store
        })

        return createdStore
    } catch (error : any) {
      return new Error(error)
    }
  }

  public async find(id: string): Promise<Store | Error> {
    try{
        let store = await prisma.store.findUnique({
            where: { id }
        })

        return !!store ? store : new Error("Store not found")
    }catch (error : any) {
        return new Error(error)
    }
  }

  public async update(store: Store): Promise<Store | Error> {
    try {
      let updatedStore = await prisma.store.update({
        where: {
          id: store.id
        },
        data: store,
      })

      return updatedStore
    } catch (error : any) {
      return new Error(error)
    }
  }
}