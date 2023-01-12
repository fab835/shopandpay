import { LoginUser } from "../../../core/useCases/users/LoginUser/LoginUser"
import { Controller } from "../../../core/infra/Controller"
import { UserRepository } from "../../repositories/prisma/userRepository"
import { CreateUser } from "../../useCases/users/CreateUser/CreateUser"
import { CreateUsersController } from "./CreateUsersControllerFactory"
import { LoginUsersController } from "./LoginUsersControllerFactory"

export const makeCreateUserController = (): Controller => {    
    const userRepository = new UserRepository() // here we'll set repository responsable to create user
    const createUser = new CreateUser(userRepository) // here we'll set the user case responsable to create user

    const createUsersController = new CreateUsersController(createUser)
    
    return createUsersController
}

export const makeLoginUserController = (): Controller => {    
    const userRepository = new UserRepository() // here we'll set repository responsable to update user
    const loginUser = new LoginUser(userRepository) // here we'll set the user case responsable to login user

    const loginUsersController = new LoginUsersController(loginUser)
    
    return loginUsersController
}