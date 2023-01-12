import { Store, User } from "@prisma/client"
import { HTTPRequest } from "../../HTTPRequest"
interface ITransferValidatorResponse {
  message : string
}
export class TransferValidator{
  private httpRequest: HTTPRequest
  private baseUrl: string

  constructor() {
    this.baseUrl = "https://run.mocky.io"
    this.httpRequest = new HTTPRequest(this.baseUrl)
  }

  public async validate(user:User, store: Store, transfer_total_cents: number): Promise<ITransferValidatorResponse> {
    
    let data = {
        sender_data: user,
        receiver_data: store,
        transfer_amount: transfer_total_cents
    }

    let url = `${this.baseUrl}/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6`

    return await this.httpRequest
                        .fetch(this.httpRequest.METHOD.POST, url, data)
                        .then(response => response.body)
                        .catch(error => error)
  }
}