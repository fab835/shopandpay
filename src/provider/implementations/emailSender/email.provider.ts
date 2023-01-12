import { HTTPRequest } from "../../HTTPRequest"
interface IEmailSenderResponse {
  message : string
}
export class EmailSender{
  private httpRequest: HTTPRequest
  private baseUrl: string

  constructor() {
    this.baseUrl = "http://o4d9z.mocklab.io"
    this.httpRequest = new HTTPRequest(this.baseUrl)
  }

  public async sendAnEmail(email_to: string, subject: string, message: string): Promise<IEmailSenderResponse> {
    let data = {
      email: {
        message,
        subject,
        from: {
          name: 'ShopAndPay',
          email: 'contato@shopandpay.com',
        },
        to: email_to,
      },
    }

    let url = this.baseUrl + '/notify'
    return await this.httpRequest
                  .fetch(this.httpRequest.METHOD.POST, url, data)
                  .then(response => response)
                  .catch(error => error)
  }
}