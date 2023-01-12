import { IUseCase } from "../../../core/useCases/IUseCase";
import { Controller } from "../../../core/infra/Controller";
import { httpResponse, StatusCode, THttpResponse } from "../../../core/infra/HttpResponse";

export class CreateTransfersController implements Controller {
  
    constructor(
    private readonly createTransfer: IUseCase,
  ) {}

  async handle({uid, store_id, total_cents}: HTTPRequestObject): Promise<THttpResponse> {
    
    let createTransferReturn: Object | Error = await this.createTransfer.execute({uid, store_id, total_cents})
    
    if(createTransferReturn instanceof Error) return httpResponse( StatusCode.clientError , createTransferReturn.message)

    return httpResponse( StatusCode.ok , createTransferReturn)
  }
}
