import { prisma } from '../../../config/database';
import { IUserRepository } from '../IUserRepository';
import { User } from "@prisma/client";

export class UserRepository implements IUserRepository {

  public async create(user: User): Promise<User | Error> {
    try {
        let createdUser =  await prisma.user.create({
            data: user
        })

        return createdUser
    } catch (error : any) {
      return new Error(error)
    }
  }

  public async find(id: string): Promise<User | Error> {
    try{
        let user = await prisma.user.findUnique({
            where: { id }
        })

        return !!user ? user : new Error("User not found")
    }catch (error : any) {
        return new Error(error)
    }
  }

  public async update(user: User): Promise<User | Error> {
    try {
      let updatedUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: user,
      })

      return updatedUser
    } catch (error : any) {
      return new Error(error)
    }
  }
}