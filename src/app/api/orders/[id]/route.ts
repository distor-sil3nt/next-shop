import { Orders } from '@/schema'

import database from '@/utils/mongodb'

export const DELETE = async (request: Request, { params: { id } }: { params: { id: string } }) => {
  await database.connect()

  try {
    const order = await Orders.findByIdAndDelete(id)

    return Response.json(order, { status: 200 })
  } catch (error) {
    return new Response(`An error occurred: ${(error as Error).message ?? JSON.stringify(error)}`, {
      status: 500,
    })
  }
}

export const GET = async (request: Request, { params: { id } }: { params: { id: string } }) => {
  await database.connect()

  try {
    const order = await Orders.findById(id)

    return Response.json(order, { status: 200 })
  } catch (error) {
    return new Response(`An error occurred: ${(error as Error).message ?? JSON.stringify(error)}`, {
      status: 200,
    })
  }
}

export const PUT = async (request: Request, { params: { id } }: { params: { id: string } }) => {
  await database.connect()

  try {
    const body = await request.json()
    const order = await Orders.findByIdAndUpdate(id, body, { new: true })

    return Response.json(order, { status: 200 })
  } catch (error) {
    return new Response(`An error occurred: ${(error as Error).message ?? JSON.stringify(error)}`, {
      status: 500,
    })
  }
}
