declare interface HTTPRequestObject {
    id?: string,
    sender?: string,
    receiver?: string,
    total_cents?: number
}
declare interface TransferCreateInputs {
    total_cents: number,
    user_id: string,
    store_id: string
} 
  