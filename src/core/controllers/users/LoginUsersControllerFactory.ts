import { IUseCase } from "../../useCases/IUseCase";
import { Controller } from "../../infra/Controller";
import { httpResponse, StatusCode, THttpResponse } from "../../infra/HttpResponse";

export class LoginUsersController implements Controller {
  
  constructor(
    private readonly loginUser: IUseCase,
  ) {}
  
  async handle(user : HTTPRequestObject): Promise<THttpResponse> {

    let creatUserReturn = await this.loginUser.execute({user}) as IAuthUser
    
    if(creatUserReturn instanceof Error) return httpResponse(StatusCode.clientError , creatUserReturn.message )

    return httpResponse(StatusCode.ok, creatUserReturn.user, creatUserReturn.auth_credential)
  }
}
