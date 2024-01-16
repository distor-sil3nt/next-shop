import Link from 'next/link'

import { Products } from '@/schema'
import { Product } from '@/types'

import { ProductDetail } from '@/components'

import { mongodb } from '@/utils'

const getProduct = async (slug: string) => {
  await mongodb.connect()

  return (await Products.findOne({ slug }).lean()) as Product
}

export default async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = await getProduct(slug)

  /**
   * destructured initialization of potentially undefined objects requires default
   * values and a fallback empty object:
   * const { name = '', description = '', price = 0, image = '' } = product || {}
   *
   * values can be used in the template after checking for undefined
   */

  return (
    <section>
      {!product ? (
        <h2>Product not available</h2>
      ) : (
        <>
          <p>
            <Link href="/" className="text-dark">
              ← Back to Overview
            </Link>
          </p>
          <ProductDetail product={product} />
        </>
      )}
    </section>
  )
}
