require('dotenv/config');

import { hash } from 'bcrypt';
import { CpfCnpjValidator } from "../../../helpers/validation/CpfCnpjValidator";
import { EmailValidator } from "../../../helpers/validation/EmailValidator";
import { UserRepository } from "../../../repositories/prisma/userRepository";
import { IUseCase } from "../../../useCases/IUseCase";
import { sign, verify } from "jsonwebtoken";

export class CreateUser implements IUseCase {

    constructor ( 
        private readonly userRepository: UserRepository,
    ){}

    public execute = async ({user}: HTTPRequestObject): Promise<IAuthUser | Error> => {
        try{
            // Verify user params presence
            if(!user) return new Error("Params user not declared")
            // Verify all params in user is present
            if(!user.email || !user.name || !user.password || !user.cpf_cnpj) return new Error("Params missing")
            // Verify password lenght
            if(user.password.length < 6) return new Error("Min password length is 6 chars")
            // Verify password confirmation
            if(user.password != user.password_confirmation) return new Error("Password and password confirmation is not the same")

            // Email validator
            const validated_email = new EmailValidator().validate(user.email)
            if(validated_email instanceof Error) return validated_email
            // CpfCnpj validator
            const validated_cpfcnpj = new CpfCnpjValidator().validate(user.cpf_cnpj)
            if(validated_cpfcnpj instanceof Error) return validated_cpfcnpj
            
            //Validation to not set duplicate user cpf_cnpj or email
            const registered_email = await this.userRepository.find_by("email", validated_email)
            if (!(registered_email instanceof Error && registered_email.message == 'User not found')) return new Error("User already registered") 
            const registered_cpf_cnpj = await this.userRepository.find_by("cpf_cnpj", validated_cpfcnpj)
            if (!(registered_cpf_cnpj instanceof Error && registered_cpf_cnpj.message == 'User not found')) return new Error("User already registered") 
            
            // verify presence of md5hash in env files
            if(!process.env.md5Hash) return new Error("Internal Error. Hash token not found")
            
            // encrypt password
            const encryptedPassword = await hash(user.password, 11);

            // Generate token to access amd encrypt
            const token = sign({}, process.env.md5Hash, {
                subject: validated_email,
                expiresIn: '1d',
            });
            const encryptedToken = await hash(token, 11);
            const expiry = verify(token, process.env.md5Hash);
            
            // -- CREATE MEW FUNCTION FOR THIS
            // generate client hash
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
            let client = '';
            for (let i = 0; i < 22; i++) {
                client += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            // -- END CREATE MEW FUNCTION FOR THIS 
            
            // Use client hash to save in db
            let userTokens = {} as any;
            userTokens[String(client)] = { token: encryptedToken, expiry: expiry };

            // prepare user data 
            const user_data : UserCreateInputs = {
                email: validated_email,
                uid: validated_email,
                name: user.name,                
                cpf_cnpj: validated_cpfcnpj,
                tokens: JSON.stringify(userTokens),
                encrypted_password: encryptedPassword
            }

            // Create user in database 
            const createdUser = await this.userRepository.create(user_data)
            if(createdUser instanceof Error) return createdUser
            

            return {
                user: {createdUser},
                auth_credential: {
                    token: token,
                    uid: createdUser.uid,
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