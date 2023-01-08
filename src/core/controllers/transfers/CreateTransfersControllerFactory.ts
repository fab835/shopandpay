import { Controller } from "../../../core/infra/Controller";
import { httpResponse, StatusCode, THttpResponse } from "../../../core/infra/HttpResponse";

export class CreateTransfersController implements Controller {

  constructor(
    
  ) {}

  async handle({ user: company, page }: any): Promise<THttpResponse> {
    console.log("teste")
    return httpResponse(StatusCode.ok)
  }
}
