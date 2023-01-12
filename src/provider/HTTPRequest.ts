import { IHTTPRequest } from "./IHTTPRequest"
const axios = require('axios').default;

export class HTTPRequest implements IHTTPRequest {

  public readonly METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
  }

  private baseUrl: string
  private headers: Object = {}

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    }
  }

  public fetch = async (method: string, url: string, body?: object): Promise<any> => {

    return new Promise<any>((resolve, reject) => {
      axios({
        url: `${this.baseUrl} + ${url}`,
        method,
        data: body,
        headers: this.headers
      }).then((response: { data: any, status: number }) => {
        let { data, status } = response
        let responseHandler: any = {
          withError: false,
          status,
          data
        }

        resolve(responseHandler);
      }).catch((error: { response: { data: any, status: any }, message: string }) => {
        let responseHandler: any
        if (error.response) {
          responseHandler = {
            withError: true,
            status: error.response.status,
            data: error.response.data,
            error: error.message
          }
        } else {
          responseHandler = {
            withError: true,
            data: error
          }
        }

        reject(responseHandler)
      })
    })
  }

  public getHeaders = (): Object => {
    return this.headers
  }

  public getBaseURL = (): string => {
    return this.baseUrl
  }
}
