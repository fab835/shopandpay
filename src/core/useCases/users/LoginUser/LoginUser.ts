require('dotenv/config');

import { compare, hash } from 'bcrypt';
import { UserRepository } from "../../../repositories/prisma/userRepository";
import { IUseCase } from "../../../useCases/IUseCase";
import { sign, verify } from "jsonwebtoken";

export class LoginUser implements IUseCase {

    constructor ( 
        private readonly userRepository: UserRepository,
    ){}

    public execute = async ({user}: HTTPRequestObject): Promise<IAuthUser | Error> => {
        try{
            // Verify user params presence
            if(!user) return new Error("Params user not declared")
            console.log(user)
            // Verify all params in user is present
            if(!user.email || !user.password) return new Error("Params missing")
            
            //Find user
            const userFinded = await this.userRepository.find_by("email", user.email)
            if(userFinded instanceof Error) return new Error('incorrect email or password')
            
            // Validate password
            const passwordMatch = await compare(user.password, String(userFinded.encrypted_password));
            if(!passwordMatch) return new Error('incorrect email or password')
            
            // ##### CREATE MEW FUNCTION FOR THIS #####

            // verify presence of md5hash in env files
            if(!process.env.md5Hash) return new Error("Internal Error. Hash token not found")
            // Generate token to access and encrypt
            const token = sign({}, process.env.md5Hash, {
                subject: userFinded.email,
                expiresIn: '1d',
            });
            const encryptedToken = await hash(token, 11);
            const expiry = verify(token, process.env.md5Hash);

            
            // generate client hash
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
            let client = '';
            for (let i = 0; i < 22; i++) {
                client += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            // ##### END CREATE MEW FUNCTION FOR THIS #####
            
            // Use client hash to save in db
            let userTokens = {} as any;
            userTokens[String(client)] = { token: encryptedToken, expiry: expiry };

            // prepare user data 
            const user_data : UserUpdateTokensInputs = {
                id: userFinded.id,
                tokens: JSON.stringify(userTokens)
            }

            // Update user in database 
            const updatedUser = await this.userRepository.update(user_data)
            if(updatedUser instanceof Error) return updatedUser
            

            return {
                user: {updatedUser},
                auth_credential: {
                    token: token,
                    uid: updatedUser.uid,
                    client: client,
                    expiry: expiry,
                }
            }
        } catch(error){
            console.log(error)
            // @ts-ignore
            return new Error(error)
        }
    }
}