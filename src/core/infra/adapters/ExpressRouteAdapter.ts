import { Request, Response } from 'express'
import { IAuthenticator } from '../../../middlewares/Authenticator'

import { Controller } from '../Controller'

export const adaptRoute = (controller: Controller ) => {
  return async (request: Request, response: Response) => {
    const authParams = request.headers;
    const {uid} = authParams;

    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      uid: uid
    }
    
    const httpResponse = await controller.handle(requestData)

    if(!!httpResponse.headers) Object.keys(httpResponse.headers).forEach((key) => response.setHeader(key, String(httpResponse.headers[key])));

    return response.status(httpResponse.statusCode).json(httpResponse.body)
    
  }
}
