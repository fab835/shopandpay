import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { IUserRepository } from '../core/repositories/IUserRepository';
import { UserRepository } from '../core/repositories/prisma/userRepository';
import { StatusCode, THttpResponse } from '../core/infra/HttpResponse';

require('dotenv/config');

interface IPayload {
  sub: string;
}

export interface IAuthenticator {
  authenticate: (request: Request, response: Response, next: NextFunction) => Promise<THttpResponse | any>
}

export class Authenticator implements IAuthenticator{
  private userRepository: IUserRepository

  constructor() {
    this.userRepository =  new UserRepository()
  }

  public authenticate = async (request: Request, response: Response, next: NextFunction) : Promise<THttpResponse | any> => {
    const authParams = request.headers;
    try {
      const {uid, client, token} = authParams;
      
      if(!token || !uid || !client) return response.status(StatusCode.unauthorized).json({error: 'auth missing'});
      
      if(!process.env.md5Hash) return response.status(StatusCode.unauthorized).json({error: 'Internal Error. Hash token not found'});

      const { sub: email } = verify(String(authParams.token), process.env.md5Hash) as IPayload;

      const user = await this.userRepository.find_by('email', email)

      if(user instanceof Error) return response.status(StatusCode.unauthorized).json({error: 'Not authorized. 1'});
      
      if (user.uid !== uid) return response.status(StatusCode.unauthorized).json({error: 'Not authorized. 2'});

      const userTokens = JSON.parse(user.tokens as any);
      
      const validClient = userTokens[String(client)];
  
      if (!validClient) return response.status(StatusCode.unauthorized).json({error: 'Not authorized. 3'});
  
      const validToken = await compare(String(authParams.token), validClient.token);
  
      if (!validToken) return response.status(StatusCode.unauthorized).json({error: 'Not authorized. 4'});
      
      next();
    }catch(e){
      return response.status(StatusCode.fail).json({error: 'Internal Error'});
    }
  }
}
