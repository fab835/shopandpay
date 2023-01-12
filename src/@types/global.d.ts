declare interface UserCreateInputs {
    email: string,
    uid: string,
    name: string,
    cpf_cnpj: string,
    password?: string,
    tokens?: any,
    password_confirmation?: string,
    encrypted_password?: string
}
declare interface UserUpdateInputs {
    id: string,
    name: string,
}

type UserFindKeys = "id" | "uid" | "name" | "cpf_cnpj" | "email";
declare interface HTTPRequestObject {
    id?: string,
    store_id?: string,
    total_cents?: number,
    user?: UserCreateInputs,
    uid?: string
}
declare interface TransferCreateInputs {
    total_cents: number,
    user_id: string,
    store_id: string
} 
  