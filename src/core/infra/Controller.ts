import { Request } from 'express'
import { THttpResponse } from './HttpResponse'

export interface Controller<T = HTTPRequestObject> {
  handle: (request: T) => Promise<THttpResponse>
}
