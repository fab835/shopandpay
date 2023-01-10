import { makeCreateTransferController } from '../../../src/core/controllers/transfers/transfers.controller'

interface ICreateTransferTest {
  sender: string
  receiver: string
  total_cents: number
}

export async function createTransferTest(data: ICreateTransferTest) {
    const createTransferReturn = await makeCreateTransferController().handle(data)
    
    return createTransferReturn.body
}
