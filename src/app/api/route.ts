import { Products } from '@/schema'

import database from '@/utils/mongodb'

import { data } from '@/data'

export const GET = async () => {
  await database.connect()

  await Products.deleteMany()
  await Products.insertMany(data.products)

  const products = await Products.find({})

  // await database.disconnect()

  return Response.json(products)
}
