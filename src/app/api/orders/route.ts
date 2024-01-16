import { Orders } from '@/schema'

import database from '@/utils/mongodb'

export const GET = async () => {
  await database.connect()

  try {
    const orders = await Orders.find()

    return Response.json(orders, { status: 200 })
  } catch (error) {
    return new Response(`An error occured: ${(error as Error).message ?? JSON.stringify(error)}`, {
      status: 500,
    })
  }
}

export const POST = async (request: Request) => {
  await database.connect()

  try {
    const body = await request.json()
    const order = await Orders.create(body)

    return Response.json(order, { status: 201 })
  } catch (error) {
    return new Response(`An error occured: ${(error as Error).message ?? JSON.stringify(error)}`, {
      status: 500,
    })
  }
}
