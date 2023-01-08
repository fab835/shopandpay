export type THttpResponse = {
    statusCode: number
    body: any
}
export enum StatusCode {
    ok = 200,
    created = 201,
    clientError = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    conflict = 409,
    tooMany = 429,
    fail = 500
}

export function httpResponse<T>(statusCode: number, dto?: T): THttpResponse {
    return {
        statusCode: statusCode,
        body: dto
    }
}
  
