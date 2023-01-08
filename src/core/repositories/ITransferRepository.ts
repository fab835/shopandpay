import { Transfer } from "@prisma/client"

export interface ITransferRepository {
    create(transfer: Transfer): Promise<Transfer | Error>
    find(id: string): Promise<Transfer | Error>
    update(transfer: Transfer): Promise<Transfer | Error>
}