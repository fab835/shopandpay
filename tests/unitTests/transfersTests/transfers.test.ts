import { DbTestSetup } from '../../dbTestSetup'
import { createTransferTest } from './CreateTransferTest'

const dbTestSetup = new DbTestSetup()

beforeAll(async () => {
  await dbTestSetup.seedDBTest()
})

test('should create new transfer ', async () => {
  const data = {
    sender: "e01f259f-ba03-49ec-8bd4-a40f9c043d22",
    receiver: "0a34aea8-f50a-4039-8950-6b4613a957a6",
    total_cents: 10000 
  }
  
  await expect(createTransferTest(data)).resolves.toMatchObject({
    transfer: {
      user_id: "e01f259f-ba03-49ec-8bd4-a40f9c043d22",
      store_id: "0a34aea8-f50a-4039-8950-6b4613a957a6",
      total_cents: 10000 
    }
  })
})

test('should not fund to create new transaction', async () => {
  const data = {
    sender: "e01f259f-ba03-49ec-8bd4-a40f9c043d22",
    receiver: "0a34aea8-f50a-4039-8950-6b4613a957a6",
    total_cents: 9999999 
  }
  
  await expect(createTransferTest(data)).resolves.toEqual(Error('insufficient funds'))
})

test('should store not found to create new transaction ', async () => {
  const data = {
    sender: "e01f259f-ba03-49ec-8bd4-a40f9c043d22",
    receiver: "incorrent",
    total_cents: 1000 
  }
  
  await expect(createTransferTest(data)).resolves.toEqual(Error('Store not found'))
})