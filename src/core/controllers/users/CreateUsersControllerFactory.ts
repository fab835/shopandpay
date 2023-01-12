import { IUseCase } from "../../useCases/IUseCase";
import { Controller } from "../../infra/Controller";
import { httpResponse, StatusCode, THttpResponse } from "../../infra/HttpResponse";
import { ICreatedUser } from "../../useCases/users/CreateUser/CreateUser";

export class CreateUsersController implements Controller {
  
  constructor(
    private readonly createUser: IUseCase,
  ) {}
  
  async handle(user : HTTPRequestObject): Promise<THttpResponse> {

    let creatUserReturn = await this.createUser.execute({user}) as ICreatedUser
    
    if(creatUserReturn instanceof Error) return httpResponse(StatusCode.clientError , creatUserReturn.message )

    return httpResponse(StatusCode.ok, creatUserReturn.user, creatUserReturn.auth_credential)
  }
}
