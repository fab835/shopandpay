import { IUseCase } from "../../useCases/IUseCase";
import { Controller } from "../../infra/Controller";
import { httpResponse, StatusCode, THttpResponse } from "../../infra/HttpResponse";

export class CreateUsersController implements Controller {
  
  constructor(
    private readonly createUser: IUseCase,
  ) {}
  
  async handle(user : HTTPRequestObject): Promise<THttpResponse> {

    let creatUserReturn = await this.createUser.execute({user}) as IAuthUser
    
    if(creatUserReturn instanceof Error) return httpResponse(StatusCode.clientError , creatUserReturn.message )

    return httpResponse(StatusCode.ok, creatUserReturn.user, creatUserReturn.auth_credential)
  }
}
