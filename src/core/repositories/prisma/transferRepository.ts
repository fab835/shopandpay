import { prisma } from '../../../config/database';
import { Transfer } from "@prisma/client";
import { ITransferRepository } from '../ITransferRepository';

export class TransferRepository implements ITransferRepository {

  public async create(transfer: TransferCreateInputs): Promise<Transfer | Error> {
    try {
        let createdTransfer =  await prisma.transfer.create({
            data: transfer
        })

        return createdTransfer
    } catch (error : any) {
      return new Error(error)
    }
  }

  public async find(id: string): Promise<Transfer | Error> {
    try{
        let transfer = await prisma.transfer.findUnique({
            where: { id }
        })

        return !!transfer ? transfer : new Error("Transfer not found")
    }catch (error : any) {
        return new Error(error)
    }
  }

  public async update(transfer: Transfer): Promise<Transfer | Error> {
    try {
      let updatedTransfer = await prisma.transfer.update({
        where: {
          id: transfer.id
        },
        data: transfer,
      })

      return updatedTransfer
    } catch (error : any) {
      return new Error(error)
    }
  }
}