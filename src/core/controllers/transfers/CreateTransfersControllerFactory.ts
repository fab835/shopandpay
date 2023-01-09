import { IUseCase } from "../../../core/useCases/IUseCase";
import { Controller } from "../../../core/infra/Controller";
import { httpResponse, StatusCode, THttpResponse } from "../../../core/infra/HttpResponse";

export class CreateTransfersController implements Controller {
  
    constructor(
    private readonly createTransfer: IUseCase,
  ) {}

  async handle({sender, receiver, total_cents}: HTTPRequestObject): Promise<THttpResponse> {

    let createTransferReturn: Object | Error = await this.createTransfer.execute({sender, receiver, total_cents})

    return httpResponse(createTransferReturn instanceof Error ? StatusCode.clientError : StatusCode.ok , createTransferReturn)
  }
}
