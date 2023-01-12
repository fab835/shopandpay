import { HTTPRequest } from "../../HTTPRequest"
interface ISmsSenderResponse {
  message : string
}
export class SmsSender{
  private httpRequest: HTTPRequest
  private baseUrl: string

  constructor() {
    this.baseUrl = "http://o4d9z.mocklab.io"
    this.httpRequest = new HTTPRequest(this.baseUrl)
  }

  public async sendAnSms(phone_number: string, message: string): Promise<ISmsSenderResponse> {
    
    let data = {
        send_to: phone_number,
        message,
    }

    let url = '/notify'
    return await this.httpRequest
                    .fetch(this.httpRequest.METHOD.POST, url, data)
                    .then(response => response.data)
                    .catch(error => error)
  }
}