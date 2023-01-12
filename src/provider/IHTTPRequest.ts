
export interface IHTTPRequest {
  fetch(method: String, url: String, body?: Object): Promise<Object>
  getHeaders(): Object
  getBaseURL(): String
}
