import { Controller } from "../../../core/infra/Controller"
import { UserRepository } from "../../repositories/prisma/userRepository"
import { CreateUser } from "../../useCases/users/CreateUser/CreateUser"
import { CreateUsersController } from "./CreateUsersControllerFactory"

export const makeCreateUserController = (): Controller => {    
    const userRepository = new UserRepository() // here we'll set repository responsable to create user
    const createUser = new CreateUser(userRepository) // here we'll set the user case responsable to create transaction

    const createUsersController = new CreateUsersController(createUser)
    
    return createUsersController
}