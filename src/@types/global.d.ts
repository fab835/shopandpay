declare interface UserCreateInputs {
    email: string,
    name: string,
    cpf_cnpj: string,
    password?: string,
    password_confirmation?: string,
    encrypted_password?: string
}

type UserFindKeys = "id" | "name" | "cpf_cnpj" | "email";
declare interface HTTPRequestObject {
    id?: string,
    sender?: string,
    receiver?: string,
    total_cents?: number,
    user?: UserCreateInputs
}
declare interface TransferCreateInputs {
    total_cents: number,
    user_id: string,
    store_id: string
} 
  