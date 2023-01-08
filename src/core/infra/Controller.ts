import { Request } from 'express'
import { THttpResponse } from './HttpResponse'
interface HTTPRequestObject {
    event?: any
}

export interface Controller<T = Request> {
  handle: (request: T) => Promise<THttpResponse>
}
