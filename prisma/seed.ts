import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const store_user = await prisma.user.upsert({
        where: { email: 'user_store@mail.com' },
        update: {},
        create: {
            email: 'user_store@mail.com',
            name: 'user_store',
            cpf_cnpj: '86627484000119',
            wallet_total_cents: 500000,
            encrypted_password: '123',
            stores: {
                create: {
                    name: 'store_1',
                    wallet_total_cents: 0
                },
            },
        },
    })

    const buyer_user = await prisma.user.upsert({
        where: { email: 'user_buyer@mail.com' },
        update: {},
        create: {
            email: 'user_buyer@mail.com',
            name: 'user_buyer',
            cpf_cnpj: '55228473017',
            wallet_total_cents: 100000,
            encrypted_password: '123',
        },
    })

    console.log({ store_user, buyer_user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })