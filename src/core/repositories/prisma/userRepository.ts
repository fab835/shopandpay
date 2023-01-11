import { prisma } from '../../../config/database';
import { IUserRepository } from '../IUserRepository';
import { User } from "@prisma/client";

export class UserRepository implements IUserRepository {

  public async create(user: UserCreateInputs): Promise<User | Error> {
    try {
        let createdUser =  await prisma.user.create({
            data: user
        })

        return createdUser
    } catch (error : any) {
      return new Error(error)
    }
  }

  public async index(): Promise<User[] | Error> {
    try {
        let users =  await prisma.user.findMany()

        return users
    } catch (error : any) {
      return new Error(error)
    }
  }

  public async updateWallet(id: string, wallet_total_cents: number): Promise<User | Error> {
    try {
        let updatedUser = await prisma.user.update({
          where: {
            id: id
          },
          data: {wallet_total_cents},
        })

        return updatedUser
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

  public async find_by(key: UserFindKeys , value: string): Promise<User[] | Error> {

    const search_params = {
      id: {id: value },
      email: {email: value },
      name: {name: value },
      cpf_cnpj: {cpf_cnpj: value },
    }
    
    try{
        let users = await prisma.user.findMany({
            where: search_params[key]
        })

        return !!users ? users : new Error("User not found")
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