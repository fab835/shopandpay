export interface IUseCase {
    execute(params: Object): Promise<Object | Error>
}
  